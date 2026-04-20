import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NoPage from "@/components/Misc/NoPage";
import Users from "./Users";
import { Layout } from "antd";
const { Content } = Layout;
import SideBar from "@/components/Sidebar";
import AllTodos from "./AllTodos";
import { useAuthContext } from "@/context/AuthContext";

const Dashboard = () => {
  const { role } = useAuthContext();

  const isSuperAdmin = role?.includes("super_admin");
  //   const isAdmin = role?.includes("admin");
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
                backgroundColor: "#fff",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                {isSuperAdmin && (
                  <>
                    <Route path="/users" element={<Users />} />
                    <Route path="/allTodos" element={<AllTodos />} />
                  </>
                )}
                <Route path="*" element={<NoPage />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
