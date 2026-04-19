import { auth, firestore } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const authenticate = createContext()

const initialState = { isAuth: false, user: {} };

const AuthContext = ({ children }) => {
    const [state, setState] = useState(initialState);
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false)
    const [users, SetUsers] = useState([]);
    const navigate = useNavigate();

    const readProfile = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setState({ isAuth: true, user })
            }
        });

        setTimeout(() => {
            setIsAppLoading(false)
        }, 1000)
    }


    // get Users
    const getUsers = () => {

        try {
            setIsProcessing(true)
            const unsubscribe = onSnapshot(query(collection(firestore, "users")), (querySnapshot) => {
                const array = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    array.push(data);
                });
                SetUsers(array);
                setIsProcessing(false)
            }, (error) => {
                console.log("Error fetching users:", error);
                setIsProcessing(false)
            });
            return unsubscribe;

        } catch (e) {
            setIsProcessing(false)
            console.log("something went wrong", e);
        }
    };
    // const getUsers = async () => {
    //     try {
    //         const array = [];
    //         const querySnapshot = await getDocs(query(collection(firestore, "users")));
    //         querySnapshot.forEach((doc) => {
    //             const data = doc.data()
    //             array.push(data)
    //         })
    //         SetUsers(array);
    //     } catch (e) {
    //         console.log("something went wrong", e)
    //     }

    // };

    useEffect(() => {
        readProfile();

        const unsubscribeUsers = getUsers();
        return () => {
            if (unsubscribeUsers) unsubscribeUsers();
        };
    }, [])


    const handleLogout = () => {
        signOut(auth).then(() => {
            setState(initialState)
            window.toastify("Logout Successfull", "success")
            navigate("/")
        }).catch((error) => {
            window.toastify("Logout Successfull", "error")
        });
    }

    return (
        <authenticate.Provider value={{ ...state, isAppLoading, users, isProcessing, handleLogout, dispatch: setState }}>
            {children}
        </authenticate.Provider>
    )
}

export default AuthContext

export const useAuthContext = () => useContext(authenticate) 