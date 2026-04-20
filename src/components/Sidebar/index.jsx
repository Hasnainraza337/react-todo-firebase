import React from "react";
import {
  ArrowLeftOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
const { Sider } = Layout;

const SideBar = () => {
  const { role } = useAuthContext();
  const isSuperAdmin = role?.includes("super_admin");
  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/dashboard">Dashboard-Home</Link>,
    },
    ...(isSuperAdmin
      ? [
          {
            key: "2",
            icon: <UserOutlined />,
            label: <Link to="/dashboard/users">Users</Link>,
          },
          {
            key: "3",
            icon: <UserOutlined />,
            label: <Link to="/dashboard/allTodos">AllTodos</Link>,
          },
        ]
      : []),

    {
      key: "4",
      icon: <ArrowLeftOutlined />,
      label: <Link to="/">Back-Home</Link>,
    },
  ];
  return (
    <>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Typography.Title level={4} className="text-center mt-1">
          <Link to="/" className="text-amber-500!">
            MyTodoApp
          </Link>
        </Typography.Title>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
    </>
  );
};

export default SideBar;
