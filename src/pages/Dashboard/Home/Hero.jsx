import React, { useState } from "react";
import {
  Col,
  Row,
  Typography,
  Card,
  Avatar,
  Tag,
  Descriptions,
  Divider,
  Space,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  CalendarOutlined,
  CrownOutlined,
  EditOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "@/context/AuthContext";
import dayjs from "dayjs";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/config/firebase";

const { Title, Text } = Typography;

const Hero = () => {
  const { user, role } = useAuthContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Branding Colors
  const theme = {
    navy: "#1D263B",
    amber: "#FFBF00",
    textLight: "rgba(255, 255, 255, 0.85)",
  };
  const handleUpdateProfile = async (values) => {
    const { fullName } = values;
    const hide = message.loading("Updating profile...", 0);

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("User not found!");
      }
      const userDocRef = doc(firestore, "users", currentUser.uid);

      await updateDoc(userDocRef, {
        fullName: fullName,
        updatedAt: new Date().toISOString(),
      });

      window.toastify("Profile updated successfully!", "success");
      setIsEditModalOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      window.toastify(error.message || "Update failed", "error");
    } finally {
      hide();
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Card
        className="hero-card"
        variant={false}
        style={{
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 15px 35px rgba(29, 38, 59, 0.15)",
          background: "#ffffff",
        }}
        styles={{ body: { padding: 0 } }}
      >
        {/* Navy Header Banner */}
        <div
          style={{
            height: "160px",
            background: `linear-gradient(135deg, ${theme.navy} 0%, #2c3e50 100%)`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
          }}
        >
          <div style={{ zIndex: 1 }}>
            <Title
              level={2}
              style={{ color: "#fff", margin: 0, fontWeight: 700 }}
            >
              Welcome back,{" "}
              <span style={{ color: theme.amber }}>
                {user?.fullName?.split(" ")[0]}!
              </span>
            </Title>
            <Text style={{ color: theme.textLight }}>
              Your personal workspace is ready.
            </Text>
          </div>

          {/* Edit Button in Header */}
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsEditModalOpen(true)}
            style={{
              zIndex: 1,
              backgroundColor: "transparent",
              borderColor: theme.amber,
              color: theme.amber,
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            Edit Profile
          </Button>

          <div
            style={{
              position: "absolute",
              right: "-50px",
              top: "-50px",
              width: "200px",
              height: "200px",
              background: theme.amber,
              opacity: 0.1,
              borderRadius: "50%",
            }}
          />
        </div>

        <div style={{ padding: "0 40px 40px 40px", marginTop: "-50px" }}>
          <Row gutter={[40, 32]}>
            {/* Left: Identity Section */}
            <Col xs={24} md={7}>
              <div style={{ textAlign: "center" }}>
                <Avatar
                  size={140}
                  icon={<UserOutlined />}
                  src={user?.photoURL}
                  style={{
                    backgroundColor: "#fff",
                    border: `4px solid #fff`,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  }}
                />
                <div style={{ marginTop: "16px" }}>
                  <Title
                    level={3}
                    style={{ marginBottom: 4, color: theme.navy }}
                  >
                    {user?.fullName || "User Name"}
                  </Title>
                  <Tag
                    color={theme.navy}
                    style={{
                      borderRadius: "20px",
                      border: `1px solid ${theme.amber}`,
                      color: theme.amber,
                      fontWeight: 600,
                      padding: "2px 15px",
                    }}
                  >
                    <CrownOutlined />{" "}
                    {role?.[0]?.toUpperCase().replace("_", " ")}
                  </Tag>
                </div>
              </div>
              <Divider style={{ margin: "24px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary">
                  <CalendarOutlined /> Joined
                </Text>
                <Text strong>
                  {user?.createdAt
                    ? dayjs(user.createdAt.seconds * 1000).format("MMM YYYY")
                    : "..."}
                </Text>
              </div>
            </Col>

            {/* Right: Detailed Information */}
            <Col xs={24} md={17}>
              <div style={{ paddingTop: "60px" }}>
                <Descriptions
                  column={{ xs: 1, sm: 2 }}
                  layout="vertical"
                  className="modern-descriptions"
                >
                  <Descriptions.Item
                    label={
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        EMAIL ADDRESS
                      </Text>
                    }
                  >
                    <Space>
                      <MailOutlined style={{ color: theme.amber }} />
                      <Text strong>{user?.email}</Text>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        ACCOUNT STATUS
                      </Text>
                    }
                  >
                    <Tag
                      color="green"
                      style={{ borderRadius: "6px", fontWeight: 700 }}
                    >
                      ● {user?.status?.toUpperCase() || "ACTIVE"}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        UID
                      </Text>
                    }
                  >
                    <Space>
                      <IdcardOutlined style={{ color: theme.amber }} />
                      <Text
                        copyable={{ tooltips: ["Copy", "Copied!"] }}
                        style={{ color: "#8c8c8c", fontSize: "12px" }}
                      >
                        {user?.uid}
                      </Text>
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Col>
          </Row>
        </div>
      </Card>

      {/* --- Edit Profile Modal --- */}
      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            Update Profile Details
          </Title>
        }
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ fullName: user?.fullName, photoURL: user?.photoURL }}
          onFinish={handleUpdateProfile}
          style={{ marginTop: "20px" }}
        >
          <Form.Item
            label="Display Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#ccc" }} />}
              placeholder="Enter your name"
            />
          </Form.Item>

          {/* <Form.Item label="Avatar URL" name="photoURL">
            <Input
              prefix={<LinkOutlined style={{ color: "#ccc" }} />}
              placeholder="https://example.com/photo.jpg"
            />
          </Form.Item> */}

          {/* <Divider /> */}

          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: theme.navy, borderColor: theme.navy }}
              >
                Save Changes
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Hero;
