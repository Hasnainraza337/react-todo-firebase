import { Route, Routes } from "react-router-dom"
import Home from "./Home"

const Dashboard = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default Dashboard