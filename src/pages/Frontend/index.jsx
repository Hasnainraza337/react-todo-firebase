import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import AddTodos from "./AddTodos"
import Todos from "./Todos"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import NoPage from "@/components/Misc/NoPage"
import { useAuthContext } from "@/context/AuthContext"
import PrivateRouting from "@/components/Misc/PrivateRouting"

const Frontend = () => {

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/addTodos" element={<PrivateRouting Component={AddTodos} />} />
                    <Route path="/todos" element={<PrivateRouting Component={Todos} />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default Frontend