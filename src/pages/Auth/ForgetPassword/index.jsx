import { useState } from "react";
import { Button, Card, Col, Form, Input, message, Row, Typography } from "antd"
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";


const ForgetPassword = () => {
    const [state, setState] = useState({ email: "" });
    const [isProcessing, setIsProcessing] = useState(false);

    const navigate = useNavigate();

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    const handleSubmit = () => {

        const { email } = state;

        if (!window.isValidEmail(email)) { return window.toastify("Please Enter Your Valid Email.", "error") }

        setIsProcessing(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                window.toastify("Email Send Successfuly!", "success")
                navigate("/auth/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
                window.toastify("Try Again", "error")
            }).finally(() => {
                setIsProcessing(false)
            });
    }

    return (
        <>
            <main className="auth" >
                <div className="container min-h-screen max-w-125 mx-auto flex justify-center items-center">
                    <Card
                        variant="borderless"
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Row>
                            <Col span={24}>
                                <Typography.Title level={1} className="text-center"><Link to="/auth/login"><ArrowLeftOutlined className="text-2xl text-blue-400! cursor-pointer" /> </Link>Reset Your Password</Typography.Title>
                                <Typography.Paragraph className="text-center">We will send you an email to reset your password.</Typography.Paragraph>
                            </Col>
                        </Row>

                        <Form layout="vertical">
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Email">
                                        <Input type="email" size="large" name="email" placeholder="Enter Your Email" onChange={handleChange} />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Button size="large" type="primary" htmlType="submit" loading={isProcessing} block onClick={handleSubmit}>Send Email</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div>
            </main>
        </>
    )
}

export default ForgetPassword 