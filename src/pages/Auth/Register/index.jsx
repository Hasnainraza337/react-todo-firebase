import { auth, firestore } from "@/config/firebase";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


const initialState = { fullName: "", email: "", password: "", confirmPassword: "" };

const Register = () => {

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()


    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    const handleSubmit = async () => {

        const { fullName, email, password, confirmPassword } = state;

        if (fullName.length < 3) { return window.toastify("Please Enter Your Full Name", "error") }
        if (!window.isValidEmail(email)) { return window.toastify("Please Enter Your valid Email.", "error") }
        if (password.length < 6) { return window.toastify("Password must be atleast 6 character", "error") }
        if (confirmPassword !== password) { return window.toastify("Password not Match", "error") }

        setIsProcessing(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userData = {
                uid: user.uid,
                fullName: fullName,
                email: email,
                createdAt: serverTimestamp()
            };

            await setDoc(doc(firestore, "users", user.uid), userData);

            window.toastify("Created an account successfully", "success");
            navigate("/auth/login");

        } catch (error) {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                window.toastify("Email already in Use", "error");
            } else {
                window.toastify("Something went wrong while creating user", "error");
            }
        } finally {
            setIsProcessing(false);
        }

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
                                        <Input type="text" size="large" name="fullName" placeholder="Enter Your Full Name" onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Email">
                                        <Input type="email" size="large" name="email" placeholder="Enter Your Email" onChange={handleChange} />
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
                                    <Button size="large" type="primary" htmlType="submit" block loading={isProcessing} onClick={handleSubmit}>Register</Button>
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