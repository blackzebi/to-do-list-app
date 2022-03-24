import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { COLUMN_NAMES } from "../constans";

const { NEW, IN_PROGRESS } = COLUMN_NAMES;

export const todoSlice = createSlice(
    {
        name: 'todos',
        initialState: [],
        reducers: {
            addTodo: (state, action) => {
                const todo = {
                    id: nanoid(),
                    nameTask: action.payload.nameTask,
                    startDate: action.payload.startDate,
                    assignee: action.payload.assignee,
                    textNotes: action.payload.textNotes,
                    status: action.payload.status,
                    column: action.payload.column,
                    checked: false,
                };
                state.push(todo);
            },
            deleteTodo: (state, action) => {
                const existingTodo = state.filter((todo) => todo.id !== action.payload.id)
                state = existingTodo;
                return state
            },
            deleteTodoList: (state) => {
                const existingTodo = state.filter((todo) => {
                    if ((todo.column !== NEW && todo.checked !== true) || (todo.checked === true && todo.column !== NEW)) {
                        return todo;
                    }
                    return '';
                });
                state = existingTodo;
                return state;
            },
            toggleCancelTodoList: (state) => {
                const currentDateUnixTimestamp = moment().unix();
                const canceledDate = moment.unix(currentDateUnixTimestamp).format("HH: mm: ss YYYY-MM-DD");
                state.map((todo) => {
                    if (todo.checked === true && todo.column === IN_PROGRESS) {
                        todo.status = 4;
                        todo.column = '';
                        todo.canceledDate = canceledDate;
                    }
                    return todo;
                })
            },
            toggleCancelTodo: (state, action) => {
                state.map((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.status = 4;
                        todo.column = '';
                        todo.canceledDate = action.payload.canceledDate;
                        return todo;
                    }
                    return todo
                })
            },
            updateColumn: (state, action) => {
                state.map((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.column = action.payload.column;
                        todo.checked = false;
                        todo.dateFinished = action.payload.dateFinished;
                        return todo;
                    }
                    return todo
                })
            },
            toggledchecked: (state, action) => {
                const existing = state.filter((todo) => todo.id === action.payload.id);
                existing.map((todo) => todo.checked = action.payload.checked)

            }
        },
    }
);

export const { addTodo, deleteTodo, deleteTodoList, toggleCancelTodoList, toggleCancelTodo, updateColumn, toggledchecked } = todoSlice.actions;

export default todoSlice.reducer;