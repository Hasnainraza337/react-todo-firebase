import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import NoPage from "@/components/Misc/NoPage"
import Users from "./Users"
import { Layout, theme } from "antd";
const { Content } = Layout;
import SideBar from '@/components/Sidebar';



const Dashboard = () => {
    return (
        <>
            <Layout>
                <SideBar />
                <Layout>
                    <Content>
                        <div
                            style={{
                                padding: 24,
                                minHeight: "100vh",
                                backgroundColor: "#fff"
                            }}
                        >

                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="*" element={<NoPage />} />
                            </Routes>

                        </div>
                    </Content>
                </Layout>
            </Layout>


        </>
    )
}

export default Dashboard