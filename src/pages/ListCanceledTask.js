import React from 'react';
import { Table } from 'antd';
import { useSelector } from "react-redux";

const columns = [
    {
        title: 'STT',
        dataIndex: 'id',
        render: (_, item, index) =>
        (
            <div>{index + 1}</div>
        )
    },
    {
        title: 'Tên task',
        dataIndex: 'nameTask',
    },
    {
        title: 'Assignee',
        dataIndex: 'assignee',
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'startDate',
    },
    {
        title: 'Ngày hủy bỏ',
        dataIndex: 'canceledDate',
    },
    {
        title: 'Ghi chú',
        dataIndex: 'textNotes',
    }
];

function ListCanceledTask() {
    const todoItems = useSelector((state) => state.todos);

    return (
        <div>
            <div>
                <h1>Danh sách các task hủy bỏ</h1>
            </div>
            <div style={{ padding: '26px' }}>
                <Table dataSource={todoItems.filter((todo) => todo.status === 4)} columns={columns} />
            </div>
        </div>
    );
}

export default ListCanceledTask;