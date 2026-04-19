import { auth } from "@/config/firebase"
import { useAuthContext } from "@/context/AuthContext"
import { Button, Card, Col, Form, Input, message, Row, Typography } from "antd"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


const initialState = { email: "", password: "" }

const Login = () => {
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useAuthContext()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    const handleSubmit = () => {

        const { email, password } = state;

        if (!window.isValidEmail(email)) { return window.toastify("Enter Your Valid Email.", "error") }
        if (password.length < 6) { return window.toastify("Please Enter Password at least 6 chracter.", "error") }

        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ isAuth: true, user })
                message.success("Login Successfull!")
                navigate("/")
                setState(initialState)
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/invalid-credential") {
                    return message.error("Invalid Crediantial")
                }

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
                                <Typography.Title level={1} className="text-center">Login</Typography.Title>
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
                                    <Form.Item label="Password">
                                        <Input.Password size="large" name="password" placeholder="Enter Your Password" onChange={handleChange} />
                                        <span className="underline flex justify-end mt-1">
                                            <Link to="/auth/forget-password">Forget Password</Link>
                                        </span>
                                    </Form.Item>

                                </Col>

                                <Col span={24}>
                                    <Button size="large" type="primary" htmlType="submit" loading={isProcessing} block onClick={handleSubmit}>Login</Button>
                                </Col>
                                <Col span={24}>
                                    <Typography.Paragraph className="text-center mt-3 ">Don't have an account? <span className="underline"><Link to="/auth/register">Register</Link></span> </Typography.Paragraph>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div>
            </main>
        </>
    )
}

export default Login 