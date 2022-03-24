import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from '../redux/todoSlice';
import { MentionsInput, Mention } from "react-mentions";
import moment from 'moment';
import { COLUMN_NAMES } from "../constans";
import defaultStyle from "./defaultStyle"

const dateFormatList = ['HH:mm:ss DD/MM/YYYY'];
const { Option } = Select;

function range(end) {
    const result = [];
    for (let i = 0; i < end; i++) {
        result.push(i);
    }
    return result;
}

function AddTodoForm() {
    const [form] = Form.useForm();
    const [checkDuplicate, setCheckDuplicate] = useState(false);
    const [taskData, setTaskData] = useState({
        nameTask: '',
        startDate: '',
        assignee: '',
        textNotes: '',
        status: 0,

    });
    const dispatch = useDispatch();
    const todoItems = useSelector((state) => state.todos);
    const employees = useSelector((state) => state.employees);
    const employeesActive = employees.filter((employee) => employee.statusEmployee === 1)
    const [clickCountName, setClickCountName] = useState(0);
    const [clickCountNameNotes, setClickCountNameNotes] = useState(0);
    const [warningInputLength, setWarningInputLength] = useState(0)
    const statusData = [
        {
            id: 1,
            value: 'New',
        },
        {
            id: 2,
            value: 'In Progress',
        },
        {
            id: 3,
            value: 'Resolved',
        },
        {
            id: 4,
            value: 'Canceled',
        },
    ]
    const onFinish = (values) => {

        const { NEW } = COLUMN_NAMES;
        // reset Field
        form.resetFields();

        if (checkDuplicate) {
            setCheckDuplicate(false);
            message.warning('Không được trùng lặp tên công việc trong một ngày')
        }
        else {
            dispatch(
                addTodo({
                    nameTask: taskData.nameTask,
                    startDate: taskData.startDate,
                    assignee: taskData.assignee,
                    textNotes: taskData.textNotes,
                    status: taskData.status,
                    column: NEW,
                })
            )
            setTaskData({ ...taskData, textNotes: '' })
        }
    }
    const handleOnClick = () => {
        // Thiết lập kiểm tra có trùng lặp trong state không
        todoItems.forEach((todoItem) => {
            if (todoItem.nameTask === taskData.nameTask && todoItem.startDate.slice(9, 20) === taskData.startDate.slice(9, 20)) {
                setCheckDuplicate(true)
            }
        })
    }
    console.log(taskData.startDate.slice(0, 2))
    const disabledDate = (current) => {
        // Không thể chọn ngày trước ngày hôm nay
        return current && current < moment().endOf('time');
    }
    const disabledTime = (value) => {
        // Không thể chọn thời gian nhỏ hơn thời gian hiện tại
        let date = moment().endOf('date').format('DD')
        let hour = moment().endOf('hours').format('HH')
        let minute = moment().endOf('minutes').format('mm')
        let millisecond = moment().endOf('milliseconds').format('ss')
        if (value) {
            if (value.minute() !== Number(minute)) {
                millisecond = 0;
            }
            if (value.hour() !== Number(hour)) {
                minute = 0;
                millisecond = 0;
            }
            if (value.date() !== Number(date)) {
                hour = 0;
                minute = 0;
                millisecond = 0;
            }
        }
        return {
            disabledHours: () => range(hour),
            disabledMinutes: () => range(minute),
            disabledSeconds: () => range(millisecond),
        };
    }

    return (
        <Form className="form" onFinish={onFinish} form={form} name="control-hooks" >
            <Form.Item
                label="Tên"
                name="nameTask"
                rules={[
                    {
                        max: 100,
                        required: true,
                        message: "Chỉ được nhập tối đa 100 ký tự !!!"
                    }
                ]}
            >
                <Input
                    className="form_input"
                    placeholder='Add todo...'
                    maxLength={101}
                    onChange={(e) => {
                        setTaskData({ ...taskData, nameTask: e.target.value })
                    }}
                    onKeyDown={(e) => {
                        if (taskData.nameTask === '' && e.key.match("^[ ]?$")) {
                            e.preventDefault();
                            return;
                        }
                        if (e.key.match("^[ ]?$") && clickCountName === 1) {
                            e.preventDefault();
                            return;
                        }
                        e.key.match("^[ ]?$") ? setClickCountName(() => clickCountName + 1) : setClickCountName(0);
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Ngày bắt đầu"
                name="startDate"
                rules={[
                    {
                        required: true,
                        message: "Nhập ngày bắt đầu !!!"
                    }
                ]}
            >
                <DatePicker
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    style={{ width: '100%' }}
                    onChange={(_, dateString) => setTaskData({ ...taskData, startDate: dateString })}
                    format={dateFormatList}
                    disabledDate={disabledDate}
                    disabledTime={disabledTime}
                    dateRender={current => {
                        return (
                            <div className="ant-picker-cell-inner">
                                {current.date()}
                            </div>
                        );
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Assignee"
                name="Assignee"
                rules={[
                    {
                        required: true,
                        message: "Chọn nhân viên phụ thuộc đi !!!"
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={(e) => setTaskData({ ...taskData, assignee: e })}
                >
                    {employeesActive.map((employee) =>
                        <Option key={employee.id} value={employee.nameEmployee}>
                            {employee.nameEmployee}
                        </Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item
                label="Ghi chú"
                style={{ position: 'relative' }}
            >
                <MentionsInput
                    value={taskData.textNotes}
                    maxLength={200}
                    onChange={(_, newValue, newplain) => {
                        setTaskData({ ...taskData, textNotes: newplain });
                        setWarningInputLength(newplain.length)
                    }}
                    onKeyDown={(e) => {
                        if (taskData.textNotes === '' && e.key.match("^[ ]?$")) {
                            e.preventDefault();
                            return;
                        }
                        if (e.key.match("^[ ]?$") && clickCountNameNotes === 1) {
                            e.preventDefault();
                            return;
                        }
                        e.key.match("^[ ]?$") ? setClickCountNameNotes(() => clickCountNameNotes + 1) : setClickCountNameNotes(0);
                    }}
                    style={defaultStyle}
                >
                    <Mention
                        trigger="@"
                        data={employeesActive}
                        style={{ color: 'red' }}
                    />
                </MentionsInput>
                <span style={{ color: 'red', display: `${warningInputLength === 200 ? 'block' : 'none'}` }}> Không được nhập quá 200 ký tự</span>
            </Form.Item>
            <Form.Item
                label="Trạng thái"
                name="status"
            >
                <Select
                    showSearch
                    placeholder="Select status"
                    onChange={(e) => setTaskData({ ...taskData, status: e })}
                    defaultValue={statusData[0].value}
                    disabled
                >
                    {statusData.map((status) =>
                        <Option key={status.id} value={status.id}>
                            {status.value}
                        </Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
                <Button
                    className="form_btn-add"
                    onClick={handleOnClick}
                    type="primary" htmlType="submit"
                    style={{ backgroundColor: '#00BCD4' }} >
                    Add todo
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddTodoForm;