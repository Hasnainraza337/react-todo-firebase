import {
  Table,
  Card,
  Typography,
  Button,
  Tag,
  Tooltip,
  Select,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAuthContext } from "@/context/AuthContext";
import dayjs from "dayjs";

const { Title } = Typography;

const Users = () => {
  const { users, isProcessing, updateUserRole, deleteUser } = useAuthContext();

  const handleRoleChange = async (uid, newRole) => {
    try {
      await updateUserRole(uid, newRole);
      window.toastify(`Role updated to ${newRole}`, "success");
    } catch (error) {
      window.toastify("Failed to update role", "error");
    }
  };

  const handleDelete = async (uid) => {
    try {
      await deleteUser(uid);
      window.toastify("User deleted successfully", "success");
    } catch (error) {
      window.toastify("Failed to delete user", "error");
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => (
        <span className="font-semibold text-amber-500">{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status?.toUpperCase() || "IDLE"}
        </Tag>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <Select
          defaultValue={role}
          style={{ width: 120 }}
          onChange={(value) => handleRoleChange(record.uid, value)}
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" },
            { value: "super_admin", label: "Super Admin" },
          ]}
        />
      ),
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) =>
        value ? dayjs(value.toDate()).format("MMMM D, YYYY h:mm A") : "N/A",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-2">
          {/* <Tooltip title="Edit User Details">
            <Button
              type="text"
              icon={<EditOutlined className="text-blue-500" />}
              onClick={() => console.log("Edit User", record)}
            />
          </Tooltip> */}
          <Tooltip title="Delete User">
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={() => handleDelete(record.uid)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="shadow-md rounded-xl" variant="borderless">
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>Users</Title>
          <Tag color="blue">Total Users : {users.length}</Tag>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          loading={isProcessing}
          scroll={{ x: "max-content" }}
          rowKey="uid"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Users;
