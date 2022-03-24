import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, toggleStatusEmployee, toggleEmployeesList } from '../redux/employeeSlice';

const regex = new RegExp("^[a-zA-Z0-9]+$");


function EmployeeManager() {
    const [employeeData, setEmployeeData] = useState({
        codeEmployee: '',
        nameEmployee: '',
        statusEmployee: 1,
    });
    const [valueCheckbox, setValueCheckbox] = useState([])
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees)
    const [clickCount, setClickCount] = useState(0)
    const selectStatusEmployee = [
        {
            id: 1,
            name: 'Hoạt động',
            value: 'Hoạt động',
        },
        {
            id: 2,
            name: 'Ngưng hợp đồng',
            value: 'Ngưng hợp đồng',
        }
    ]

    const columns = [
        {
            key: 'id',
            title: "STT",
            dataIndex: 'id',
            render: (_, item, index) =>
            (
                <div>{index + 1}</div>
            )
        },
        {
            key: 'codeEmployee',
            title: "Mã nhân viên",
            dataIndex: 'codeEmployee',
        },
        {
            key: 'nameEmployee',
            title: "Tên nhân viên",
            dataIndex: "nameEmployee",
        },
        {
            key: 'statusEmployee',
            title: "Trạng thái",
            dataIndex: "statusEmployee",
            render: (status, object) =>
                <Select
                    style={{ minWidth: '160px' }}
                    value={status === 1 ? `${selectStatusEmployee[0].name}` : `${selectStatusEmployee[1].name}`}
                    onChange={(e) => {
                        const value = e === 'Ngưng hợp đồng' ? 2 : 1
                        dispatch(
                            toggleStatusEmployee({
                                id: object.id,
                                statusEmployee: value,
                            })
                        )
                    }}
                    options={selectStatusEmployee}
                />
            ,
        }
    ]

    const handleOnClickToggleStatus = () => {
        if (valueCheckbox === []) {
            return;
        }
        else {
            dispatch(
                toggleEmployeesList({
                    key: valueCheckbox,
                })
            )
        }
    }

    const onFinish = () => {
        form.resetFields();
        let check = false;
        // Kiểm tra trùng lặp, nếu có sẽ in thông báo
        employees.forEach((employee) => {
            if (employee.codeEmployee === employeeData.codeEmployee) {
                message.warning('Không được trùng lặp mã nhân viên')
                check = true;
            }
        })

        !check &&
            dispatch(
                addEmployee({
                    codeEmployee: employeeData.codeEmployee,
                    nameEmployee: employeeData.nameEmployee,
                    statusEmployee: employeeData.statusEmployee,
                })
            )
    }

    return (
        <div className="employee">
            <div>
                <h1>Quản lý nhân viên</h1>
            </div>
            <Form onFinish={onFinish} form={form} name="control-hooks" className="employee-form">
                <h2>Thêm mới nhân viên</h2>
                <Form.Item
                    label="Mã NV"
                    name="codeEmployee"
                    rules={[
                        {
                            required: true,
                            message: "Nhập mã nhân viên đi !!!"
                        }
                    ]}
                    style={{ marginTop: '8px' }}
                >
                    <Input
                        onChange={
                            (e) => regex.test(e.target.value)
                                && setEmployeeData({ ...employeeData, codeEmployee: e.target.value })
                        }
                        onKeyDown={
                            e => /[^a-zA-Z0-9]/gm.test(e.key)
                                && e.preventDefault()
                        }
                        placeholder="Nhập mã nhân viên"
                    />
                </Form.Item>
                <Form.Item
                    label="Tên NV"
                    name="nameEmployee"
                    rules={[
                        {
                            required: true,
                            message: "Nhập tên nhân viên đi !!!"
                        }
                    ]}
                >
                    <Input
                        value={employeeData.nameEmployee.replace(/\s+/g, ' ').trim()}
                        onChange={(e) => setEmployeeData({ ...employeeData, nameEmployee: e.target.value })}
                        onKeyDown={(e) => {
                            if (employeeData.nameEmployee === '' && e.key.match("^[ ]?$")) {
                                e.preventDefault();
                                return;
                            }
                            if (e.key.match("^[ ]?$") && clickCount === 1) {
                                e.preventDefault();
                                return;
                            }
                            e.key.match("^[ ]?$") ? setClickCount(() => clickCount + 1) : setClickCount(0);
                        }}
                        placeholder="Nhập tên nhân viên"
                    />
                </Form.Item>
                <Form.Item label="Trạng thái" name="statusEmployee" initialValue={selectStatusEmployee[0].name}>
                    <Input disabled />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00BCD4' }}>Tạo mới nhân viên</Button>
                </Form.Item>
            </Form>
            <div className="list-employees" style={{ padding: '24px' }}>
                <h2>Danh sách nhân viên</h2>
                <Button
                    onClick={handleOnClickToggleStatus}
                    style={{
                        float: 'right',
                        margin: '8px 16px',
                        padding: '4px',
                        backgroundColor: '#EA674D',
                        color: 'white'
                    }}
                >
                    Ngưng hợp đồng
                </Button>
                <Table
                    dataSource={employees}
                    columns={columns}
                    rowSelection={
                        {
                            onChange: (selectedRowKeys) => {
                                setValueCheckbox(selectedRowKeys);
                            }
                        }
                    }
                />
            </div>
        </div>
    );
}

export default EmployeeManager;