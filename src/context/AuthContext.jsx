import { auth } from "@/config/firebase";
import { message } from "antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const authenticate = createContext()

const initialState = { isAuth: false, user: {} };

const AuthContext = ({ children }) => {
    const [state, setState] = useState(initialState);
    const [isAppLoading, setIsAppLoading] = useState(true);
    const navigate = useNavigate();


    const readProfile = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setState({ isAuth: true, user })
            }
        });

        setIsAppLoading(false)
    }


    useEffect(() => {
        readProfile();
    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            setState(initialState)
            Window.toastify("Logout Successfull", "success")
            navigate("/")
        }).catch((error) => {
            Window.toastify("Logout Successfull", "error")
        });
    }

    return (
        <authenticate.Provider value={{ ...state, isAppLoading, handleLogout, dispatch: setState }}>
            {children}
        </authenticate.Provider>
    )
}

export default AuthContext

export const useAuthContext = () => useContext(authenticate) 