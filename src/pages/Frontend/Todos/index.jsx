import { useState, useEffect } from 'react';
import { Table, Card, Typography, Button, message, Tag, Modal, Form, Input } from 'antd';
import { DeleteOutlined, EnvironmentOutlined, EditOutlined } from '@ant-design/icons';
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import { useParams } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;
const { Item } = Form;


const initialState = { title: "", location: "", description: "" }


const Todos = () => {
    const [state, setState] = useState(initialState)
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTodo, setEditTodo] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const params = useParams()

    // get todos
    const getTodos = async () => {
        setIsLoading(true)
        try {
            const array = [];
            const querySnapshot = await getDocs(query(collection(firestore, "todos")));
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                array.push(data)
            })
            setData(array);
        } catch (e) {
            console.log("something went wrong", e)
        }
        setIsLoading(false)

    };

    useEffect(() => {
        getTodos()
    }, []);


    // delete todo

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firestore, "todos", id));
            const filteredTodos = data.filter(item => item.id !== id);
            setData(filteredTodos);
            message.success('Todo deleted successfully');
        } catch (e) {
            console.log("Try Again", e)
        }

    };

    const showEditModal = (record) => {
        setEditTodo(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    //  update todo

    const handleUpdate = async () => {
        // 1. Ensure we have the ID of the todo being edited
        if (!editTodo?.id) {
            message.error("No todo selected for update");
            return;
        }

        try {
            const values = await form.validateFields();
            setIsLoading(true);

            const updatedTodo = {
                ...values,
                updatedAt: serverTimestamp()
            };

            const todoRef = doc(firestore, "todos", editTodo.id);
            await updateDoc(todoRef, updatedTodo);

            const updatedData = data.map((item) =>
                item.id === editTodo.id ? { ...item, ...values, updatedAt: serverTimestamp() } : item
            );
            setData(updatedData);

            setIsModalOpen(false);
            setEditTodo(null);
            message.success('Task updated successfully!');
        } catch (error) {
            console.error("Update failed:", error);
            if (error.errorFields) {
                message.error("Please fill in all required fields");
            } else {
                message.error("Failed to update database.");
            }
        } finally {
            setIsLoading(false);
        }
    };




    const columns = [
        {
            title: 'Task Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <span className="font-semibold text-blue-600">{text}</span>,
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            render: (text) => (
                <span>
                    <EnvironmentOutlined className="mr-1 text-red-400" />
                    {text}
                </span>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => text || <i className="text-gray-400">No description</i>,
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        className="text-orange-500 hover:text-orange-600"
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(record)}
                    />
                    <Button
                        danger
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Card className="shadow-md rounded-xl" variant="borderless">
                <div className="flex justify-between items-center mb-6">
                    <Title level={2}>My Todo List</Title>
                    <Tag color="blue">Total Task : {data.length}</Tag>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    loading={isLoading}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </Card>

            { /* Edit Task Modal */}
            <Modal
                title="Edit Task"
                open={isModalOpen}
                onOk={handleUpdate}
                onCancel={() => setIsModalOpen(false)}
                okText="Update Todo"
                okButtonProps={{ className: "bg-blue-600" }}
            >
                <Form form={form} layout="vertical" className="mt-4">
                    <Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Item>
                    <Item name="location" label="Location" rules={[{ required: true }]}>
                        <Input />
                    </Item>
                    <Item name="description" label="Description">
                        <TextArea rows={3} />
                    </Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Todos;