import { auth } from "@/config/firebase";
import { Button, Card, Col, Form, Input, message, Row, Typography } from "antd"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


const initialState = { fullName: "", email: "", password: "", confirmPassword: "" };

const Register = () => {

    const [state, setState] = useState(initialState)
    const navigate = useNavigate()


    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    const handleSubmit = () => {

        const { email, password, confirmPassword } = state;

        if (!email) {
            return message.error("please enter your email.")
        }
        if (password.length < 6) {
            return message.error("please enter password at least 6 chracter.")
        }
        if (confirmPassword !== password) {
            return message.error("password not match")
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                message.success("A New User Registered Successfully!")
                navigate("/auth/login")
            })
            .catch((error) => {

                const errorCode = error.code;
                if (errorCode === "auth/email-already-in-use") {
                    return message.error("Email already in use.")
                }

                message.error("something went wrong createing a user")
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
                                <Typography.Title level={1} className="text-center">Register</Typography.Title>
                            </Col>
                        </Row>

                        <Form layout="vertical">
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="FullName">
                                        <Input size="large" name="fullName" placeholder="Enter Your Full Name" onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Email">
                                        <Input size="large" name="email" placeholder="Enter Your Email" onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Password">
                                        <Input.Password size="large" name="password" placeholder="Enter Your Password" onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Cofirm Password">
                                        <Input.Password size="large" name="confirmPassword" placeholder="Enter Your ConfirmPassword" onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button size="large" type="primary" block onClick={handleSubmit}>Register</Button>
                                </Col>
                                <Col span={24}>
                                    <Typography.Paragraph className="text-center mt-3 ">Already have an account? <span className="underline"><Link to="/auth/login">Login</Link></span> </Typography.Paragraph>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div>
            </main>
        </>
    )
}

export default Register 