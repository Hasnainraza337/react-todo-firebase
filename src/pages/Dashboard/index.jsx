import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import NoPage from "@/components/Misc/NoPage"

const Dashboard = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    )
}

export default Dashboard