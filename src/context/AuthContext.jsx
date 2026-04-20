import { auth, firestore } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const authenticate = createContext();

const initialState = { isAuth: false, user: {}, role: [] };

const AuthContext = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ReadProfile
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docSnap = await getDoc(doc(firestore, "users", user.uid));
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const userRoles = Array.isArray(userData.role)
              ? userData.role
              : [userData.role || "user"];
            setState({
              isAuth: true,
              user: { ...user, ...userData },
              role: userRoles,
            });
          } else {
            setState({ isAuth: true, user, role: ["user"] });
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setState(initialState);
      }
      setIsAppLoading(false);
    });

    // geting Users
    setIsProcessing(true);
    const q = query(collection(firestore, "users"));
    const unsubscribeUsers = onSnapshot(
      q,
      (querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          array.push({ ...data });
        });
        setUsers(array);
        setIsProcessing(false);
      },
      (error) => {
        console.error("Error fetching users:", error);
        setIsProcessing(false);
      },
    );

    return () => {
      unsubscribeAuth();
      unsubscribeUsers();
    };
  }, []);

  // const readProfile = () => {
  //     onAuthStateChanged(auth, async (user) => {
  //         if (user) {
  //             try {
  //                 const docSnap = await getDoc(doc(firestore, "users", user.uid));
  //                 if (docSnap.exists()) {
  //                     const data = docSnap.data()
  //                     setState({ isAuth: true, user: { ...user, ...data } })

  //                 } else {
  //                     setState({ isAuth: true, user })
  //                 }
  //             } catch (error) {
  //                 console.error("Error fetching profile:", error)
  //             }
  //         } else {
  //             setState(initialState)
  //         }
  //         setIsAppLoading(false)
  //     });

  // }

  // // get Users
  // const getUsers = () => {

  //     try {
  //         setIsProcessing(true)
  //         const unsubscribe = onSnapshot(query(collection(firestore, "users")), (querySnapshot) => {
  //             const array = [];
  //             querySnapshot.forEach((doc) => {
  //                 const data = doc.data();
  //                 array.push(data);
  //             });
  //             SetUsers(array);
  //             setIsProcessing(false)
  //         }, (error) => {
  //             console.log("Error fetching users:", error);
  //             setIsProcessing(false)
  //         });
  //         return unsubscribe;

  //     } catch (e) {
  //         setIsProcessing(false)
  //         console.log("something went wrong", e);
  //     }
  // };
  // const getUsers = async () => {
  // try {
  //     const array = [];
  //     const querySnapshot = await getDocs(query(collection(firestore, "users")));
  //     querySnapshot.forEach((doc) => {
  //         const data = doc.data()
  //         array.push(data)
  //     })
  //     SetUsers(array);
  // } catch (e) {
  //     console.log("something went wrong", e)
  // }

  // };

  // useEffect(() => {
  //     readProfile();

  //     const unsubscribeUsers = getUsers();
  //     return () => {
  //         if (unsubscribeUsers) unsubscribeUsers();
  //     };
  // }, [])

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setState(initialState);
        window.toastify("Logout Successfull", "success");
        navigate("/");
      })
      .catch((error) => {
        window.toastify("Logout Failed", "error");
      });
  };

  return (
    <authenticate.Provider
      value={{
        ...state,
        isAppLoading,
        users,
        isProcessing,
        handleLogout,
        dispatch: setState,
      }}
    >
      {children}
    </authenticate.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(authenticate);
