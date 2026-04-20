import React from "react";
import {
  Col,
  Row,
  Typography,
  Card,
  Avatar,
  Tag,
  Descriptions,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "@/context/AuthContext";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const Hero = () => {
  const { user, role } = useAuthContext();

  // Roles ko colors assign karne ke liye
  const getRoleColor = (r) => {
    if (r === "super_admin") return "magenta";
    if (r === "admin") return "blue";
    return "green";
  };

  return (
    <div className="container mt-2">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            className="shadow-sm border-0"
            style={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <Row gutter={[24, 24]} align="middle">
              <Col span={24}>
                <div className="mt-5 text-center">
                  <Title level={2} style={{ fontWeight: "300" }}>
                    Welcome Back,{" "}
                    <span className="text-amber-500">
                      {user?.fullName?.split(" ")[0]}!
                    </span>
                  </Title>
                </div>
              </Col>
              {/* Left Side: Avatar/Image */}
              <Col xs={24} md={6} className="text-center">
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  src={user?.photoURL} // Agar user ki photo hai to
                  style={{ backgroundColor: "#1890ff", marginBottom: "10px" }}
                />
                <div>
                  <Title level={4} style={{ margin: 0 }}>
                    {user?.fullName || "User Name"}
                  </Title>
                  <Text type="secondary">
                    Member since{" "}
                    {user?.createdAt
                      ? dayjs(user.createdAt.seconds * 1000).format("YYYY")
                      : "..."}
                  </Text>
                </div>
              </Col>

              {/* Right Side: Details */}
              <Col xs={24} md={18}>
                <Divider orientation="left" plain>
                  <Text strong>
                    <UserOutlined /> Personal Profile
                  </Text>
                </Divider>

                <Descriptions column={{ xs: 1, sm: 2 }}>
                  <Descriptions.Item
                    label={
                      <span>
                        <MailOutlined /> Email
                      </span>
                    }
                  >
                    {user?.email}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <SafetyCertificateOutlined /> Account Status
                      </span>
                    }
                  >
                    <Tag color="cyan">{user?.status || "Active"}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="User ID">
                    <Text copyable className="text-xs text-gray-400">
                      {user?.uid}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Assigned Roles">
                    {role?.map((r) => (
                      <Tag
                        color={getRoleColor(r)}
                        key={r}
                        className="uppercase"
                      >
                        {r.replace("_", " ")}
                      </Tag>
                    ))}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;
