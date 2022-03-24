import React, { useState } from 'react';
import { DndProvider } from "react-dnd";
import Column from '../components/Column';
import MoveItem from '../components/MoveItem'
import { COLUMN_NAMES } from "../constans";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import AddTodoForm from '../components/AddTodoForm';
import { Button, message, Modal } from 'antd';
import { deleteTodoList, toggleCancelTodoList } from '../redux/todoSlice';

function TestApp() {
    const dispatch = useDispatch();
    const todoItems = useSelector((state) => state.todos);
    const { IN_PROGRESS, NEW, RESOLVED } = COLUMN_NAMES;
    const [isModalVisible, setIsModalVisible] = useState(false)

    const returnItemsForColumn = (columnName) => {

        if (columnName === RESOLVED) {
            return todoItems
                .filter((item) => item.column === columnName)
                .reverse()
                .map((item, index) => {
                    return <MoveItem
                        onChange={(e) => console.log(e)}
                        key={item.id}
                        name={item.nameTask}
                        status={item.status}
                        startDate={item.startDate}
                        dateFinished={item.dateFinished}
                        assignee={item.assignee}
                        textNotes={item.textNotes}
                        currentColumnName={item.column}
                        index={index}
                        keyid={item.id}
                        checked={item.checked}
                    />
                });
        }
        return todoItems
            .filter((item) => item.column === columnName)
            .map((item, index) => {
                return <MoveItem
                    // style={{ backgroundColor: 'red' }}
                    onChange={(e) => console.log(e)}
                    key={item.id}
                    name={item.nameTask}
                    status={item.status}
                    startDate={item.startDate}
                    dateFinished={item.dateFinished}
                    assignee={item.assignee}
                    textNotes={item.textNotes}
                    currentColumnName={item.column}
                    index={index}
                    keyid={item.id}
                />
            });
    };



    const handleOnClickDelete = () => {
        let check = false;
        todoItems.map((todo) => {
            if (todo.column === NEW) {
                if (todo.checked === true) {
                    check = true
                    dispatch(
                        deleteTodoList()
                    )
                }
            }
            return todo;
        })
        !check && message.warning('Cần chọn task để xóa')
    }
    const handleOnClickCanceled = () => {
        let check = false;
        todoItems.map((todo) => {
            if (todo.column === IN_PROGRESS) {
                if (todo.checked === true) {
                    check = true;
                    dispatch(
                        toggleCancelTodoList()
                    )
                }
            }
            return todo;
        })
        !check && message.warning('Cần chọn task để Hủy')
    }

    const handleOnClickAdd = () => {
        setIsModalVisible(true)
    }

    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="container">
            <div>
                <h1>Quản lý tasks</h1>
            </div>
            <Modal
                className="container_add"
                visible={isModalVisible}
                // onOk={handleOk}
                onCancel={handleCancel}
            >
                <h2 style={{ textAlign: 'center' }}>Tạo mới task</h2>
                <AddTodoForm />
            </Modal >
            <div style={{ padding: '24px 0' }}>
                {/* <h2>Tasks</h2> */}
                <div className="container_btn">
                    <Button
                        onClick={handleOnClickAdd}
                        style={{ backgroundColor: '#00BCD4', color: '#fff', margin: '8px' }}
                    >
                        Add todo
                    </Button>
                    <Button
                        onClick={handleOnClickDelete}
                        style={{ backgroundColor: 'red', color: '#fff', margin: '8px' }}
                    >
                        Delete of new
                    </Button>
                    <Button
                        onClick={handleOnClickCanceled}
                        style={{ backgroundColor: 'orange', color: '#fff', margin: '8px' }}
                    >
                        Canceled of Inprogress
                    </Button>
                </div>
                <div className="container_column">
                    <DndProvider backend={HTML5Backend}>
                        <Column
                            title={NEW} className="column new-column">
                            {returnItemsForColumn(NEW)}
                        </Column>
                        <Column
                            title={IN_PROGRESS}
                            className="column in-progress-column"
                        >
                            {returnItemsForColumn(IN_PROGRESS)}
                        </Column>
                        <Column
                            title={RESOLVED} className="column resolved-column">
                            {returnItemsForColumn(RESOLVED)}
                        </Column>
                    </DndProvider>
                </div>
            </div>
        </div>
    );
}

export default TestApp;
