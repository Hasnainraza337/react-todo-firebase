import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import ForgetPassword from "./ForgetPassword"
import NoPage from "@/components/Misc/NoPage"

const Auth = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </>
    )
}

export default Auth