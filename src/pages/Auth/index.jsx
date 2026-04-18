import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import ForgetPassword from "./ForgetPassword"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const Auth = () => {
    return (
        <>
            {/* <Header /> */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
            </Routes>
            {/* <Footer /> */}
        </>
    )
}

export default Auth