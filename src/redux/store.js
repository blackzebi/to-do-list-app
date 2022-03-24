import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import employeeReducer from './employeeSlice';

export default configureStore({
    reducer: {
        todos: todoReducer,
        employees: employeeReducer,
    },
});