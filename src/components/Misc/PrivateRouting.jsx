import { useAuthContext } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRouting = ({ Component }) => {
    const { isAuth } = useAuthContext()

    if (!isAuth) return <Navigate to="/auth/login" />

    return (

        <Component />
    )
}

export default PrivateRouting