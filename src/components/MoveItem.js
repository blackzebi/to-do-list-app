import React, { useRef, useState } from "react";
import moment from 'moment';
import { Button, Checkbox, message } from 'antd';
import { useDrag } from "react-dnd";
import { COLUMN_NAMES } from "../constans";
import { useDispatch, useSelector } from "react-redux";
import { updateColumn } from '../redux/todoSlice';
import { deleteTodo, toggleCancelTodo, toggledchecked } from '../redux/todoSlice';
import {
    FieldTimeOutlined,
    CommentOutlined
} from '@ant-design/icons';

function MoveItem({
    name,
    status,
    startDate,
    dateFinished,
    assignee,
    textNotes,
    index,
    currentColumnName,
    keyid,
}) {
    // console.log('hello')
    const dispatch = useDispatch();
    // console.log('hello123')
    const ref = useRef(null);
    // console.log(name)
    const todoItems = useSelector((state) => state.todos);
    const { NEW, IN_PROGRESS, RESOLVED } = COLUMN_NAMES;
    const [showNotes, setShowNotes] = useState(false)

    const [{ isDragging }, drag] = useDrag({
        item: { index, name, currentColumnName, type: "Our first type" },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult) {
                const { name } = dropResult;
                switch (name) {
                    case IN_PROGRESS:
                        dispatch(
                            updateColumn({
                                id: keyid,
                                column: IN_PROGRESS,
                            })
                        )
                        break;
                    case RESOLVED:
                        const CurrentDateUnixTimestamp = moment().unix();
                        const dateFinished = moment.unix(CurrentDateUnixTimestamp).format("HH:mm:ss DD-MM-YYYY");
                        const startDate = todoItems.filter((todo) => todo.id === keyid)
                        if (currentColumnName === name) {
                            break;
                        }
                        if (startDate[0].startDate > dateFinished) {
                            message.warning('Chưa bắt đầu nữa mà !!!')
                            break;
                        }
                        dispatch(
                            updateColumn({
                                id: keyid,
                                column: RESOLVED,
                                dateFinished: dateFinished,
                            })
                        )
                        break;
                    default:
                        break;
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const handleCheckboxClick = (e) => {
        dispatch(
            toggledchecked({
                id: keyid,
                checked: e.target.checked,
            })
        )
    }

    const handleDeleteClick = (e) => {
        dispatch(
            deleteTodo({
                id: keyid,
            })
        )
    }
    const handleCancelClick = () => {
        const CurrentDateUnixTimestamp = moment().unix();
        const canceledDate = moment.unix(CurrentDateUnixTimestamp).format("HH: mm: ss YYYY-MM-DD");
        dispatch(
            toggleCancelTodo({
                id: keyid,
                canceledDate: canceledDate,
            })
        )
    }

    const opacity = isDragging ? 1 : 1;

    drag(ref);
    return (
        <li
            ref={ref} className="movable-item" style={{ opacity: opacity }}
        >
            {currentColumnName === NEW || currentColumnName === IN_PROGRESS
                ?
                (<div className="todo-item-content" style={{ padding: '8px' }}>
                    <Checkbox onChange={handleCheckboxClick}>
                        <div className="todo-item-description">
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '0' }}>
                                <p >STT: {index + 1}</p>
                                <p >Tên task: {name}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '0' }}>
                                <p>Assignee: {assignee}</p>
                                <p><span><FieldTimeOutlined style={{ color: '#6DE039' }} /></span> {startDate}</p>
                            </div>

                            <p>
                                {showNotes && `Ghi chú: ${textNotes}`}
                                <Button onClick={() => setShowNotes(!showNotes)} >
                                    <CommentOutlined />
                                </Button>

                            </p>

                        </div>
                    </Checkbox>
                </div>)
                :
                (<div className="todo-item-content">
                    <div className="todo-item-description">
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '0' }}>
                            <p>STT: {index + 1}</p>
                            <p>Tên task: {name}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '0' }}>
                            <p><span><FieldTimeOutlined style={{ color: '#6DE039' }} /></span> {startDate}</p>
                            <p><span><FieldTimeOutlined style={{ color: '#F96564' }} /></span> {dateFinished}</p>
                        </div>
                        <p>
                            {showNotes && `Ghi chú: ${textNotes}`}
                            <Button onClick={() => setShowNotes(!showNotes)} >
                                <CommentOutlined />
                            </Button>

                        </p>
                    </div>
                </div>)
            }

            {currentColumnName === NEW
                ? <Button
                    className="todo-item_delete"
                    style={{ backgroundColor: '#ff0000', color: '#fff' }}
                    onClick={handleDeleteClick}>
                    Xóa
                </Button>
                : currentColumnName === IN_PROGRESS
                    ? <Button
                        className="todo-item_delete"
                        style={{ backgroundColor: '#FFA500', color: '#fff' }}
                        onClick={handleCancelClick}>
                        Hủy
                    </Button> : ''}

        </li>
    );
}

export default MoveItem;