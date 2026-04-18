import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { PlusOutlined, EnvironmentOutlined, FormOutlined } from '@ant-design/icons';
import { useAuthContext } from '@/context/AuthContext';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from '@/config/firebase';

const { Title } = Typography;
const { TextArea } = Input;
const { Item } = Form;

const initialValues = { title: "", location: "", description: "" };

const AddTodos = () => {

    const [formData, setFormData] = useState(initialValues);
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useAuthContext();

    const handleChange = e => setFormData((s) => ({ ...s, [e.target.name]: e.target.value }))


    const handleSubmit = async () => {

        const { title, location, description } = formData;

        if (!title) return message.error("Enter Your Title!");
        if (!location) return message.error("Enter Your Location!");

        const todo = {
            title,
            location,
            description,
        };
        todo.uid = user.uid,
            todo.id = Math.random().toString(36).slice(2),
            todo.createdAt = serverTimestamp(),

            setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "todos", todo.id), todo);
            message.success('Task added successfully!');

        } catch (e) {
            message.error("something went wrong while creating todo")
        } finally {
            setIsProcessing(false)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-500px p-6 bg-gray-50">
            <Card className="w-full max-w-lg shadow-lg rounded-xl" variant="borderless">
                <div className="text-center mb-6">
                    <Title level={3} className="text-blue-600">Add New Task</Title>
                </div>

                <Form layout="vertical">
                    <Item label="Title" required>
                        <Input
                            name="title"
                            prefix={<FormOutlined className="text-gray-400" />}
                            placeholder="Enter Title"
                            size="large"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Item>

                    <Item label="Location" required>
                        <Input
                            name="location"
                            prefix={<EnvironmentOutlined className="text-gray-400" />}
                            placeholder="Enter Location"
                            size="large"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Item>

                    <Item label="Description">
                        <TextArea
                            name="description"
                            rows={4}
                            placeholder="Task description..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Item>

                    <Item className="mb-0">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            block
                            htmlType='submit'
                            loading={isProcessing}
                            className="bg-blue-600 h-12 text-base font-semibold"
                            onClick={handleSubmit}
                        >
                            Add Task
                        </Button>
                    </Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddTodos;