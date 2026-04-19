import { Table, Card, Typography, Button, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useAuthContext } from '@/context/AuthContext';
import dayjs from 'dayjs';

const { Title } = Typography;


const Users = () => {
    const { users, isProcessing } = useAuthContext()

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <span className="font-semibold text-amber-500">{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => text,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => text,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text) => text,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value) => value ? dayjs(value.toDate()).format('MMMM D, YYYY h:mm A') : 'N/A',
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     width: 150,
        //     render: (_, record) => (
        //         <div className="flex gap-2">
        //             <Button
        //                 type="text"
        //                 className="text-orange-500 hover:text-orange-600"
        //                 icon={<EditOutlined />}

        //             />
        //             <Tooltip title="Delete User">
        //                 <Button
        //                     danger
        //                     type="text"
        //                     icon={<DeleteOutlined />}
        //                     onClick={() => deleteUser(record.uid)}
        //                 />
        //             </Tooltip>
        //         </div>
        //     ),
        // },
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
                    pagination={{ pageSize: 5 }}
                />
            </Card>

        </div>
    );
};

export default Users;