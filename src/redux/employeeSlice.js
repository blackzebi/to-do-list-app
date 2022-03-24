import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const employeeSlice = createSlice(
    {
        name: 'employees',
        initialState: [
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV01',
                nameEmployee: 'Nguyen Van A',
                statusEmployee: 1,
                display: 'Nguyen Van A'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV02',
                nameEmployee: 'Nguyen Van B',
                statusEmployee: 1,
                display: 'Nguyen Van B'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV03',
                nameEmployee: 'Nguyen Van C',
                statusEmployee: 1,
                display: 'Nguyen Van C'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV04',
                nameEmployee: 'Nguyen Van D',
                statusEmployee: 1,
                display: 'Nguyen Van D'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV05',
                nameEmployee: 'Nguyen Van E',
                statusEmployee: 1,
                display: 'Nguyen Van E'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV06',
                nameEmployee: 'Nguyen Van F',
                statusEmployee: 1,
                display: 'Nguyen Van F'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV07',
                nameEmployee: 'Nguyen Van G',
                statusEmployee: 1,
                display: 'Nguyen Van G'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV08',
                nameEmployee: 'Nguyen Van H',
                statusEmployee: 1,
                display: 'Nguyen Van H'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV09',
                nameEmployee: 'Nguyen Van I',
                statusEmployee: 1,
                display: 'Nguyen Van I'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV10',
                nameEmployee: 'Nguyen Van J',
                statusEmployee: 1,
                display: 'Nguyen Van J'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV11',
                nameEmployee: 'Nguyen Van K',
                statusEmployee: 1,
                display: 'Nguyen Van K'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV12',
                nameEmployee: 'Nguyen Van L',
                statusEmployee: 1,
                display: 'Nguyen Van L'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV13',
                nameEmployee: 'Nguyen Van M',
                statusEmployee: 1,
                display: 'Nguyen Van M'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV14',
                nameEmployee: 'Nguyen Van N',
                statusEmployee: 1,
                display: 'Nguyen Van N'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV15',
                nameEmployee: 'Nguyen Van O',
                statusEmployee: 1,
                display: 'Nguyen Van O'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV16',
                nameEmployee: 'Nguyen Van P',
                statusEmployee: 1,
                display: 'Nguyen Van P'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV17',
                nameEmployee: 'Nguyen Van Q',
                statusEmployee: 1,
                display: 'Nguyen Van Q'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV18',
                nameEmployee: 'Nguyen Van W',
                statusEmployee: 1,
                display: 'Nguyen Van W'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV19',
                nameEmployee: 'Nguyen Van X',
                statusEmployee: 1,
                display: 'Nguyen Van X'
            },
            {
                id: nanoid(),
                key: nanoid(),
                codeEmployee: 'NV20',
                nameEmployee: 'Nguyen Van Y',
                statusEmployee: 1,
                display: 'Nguyen Van Y'
            },

        ],


        // reducer 

        reducers: {
            addEmployee: (state, action) => {
                const employee = {
                    id: nanoid(),
                    key: nanoid(),
                    codeEmployee: action.payload.codeEmployee,
                    nameEmployee: action.payload.nameEmployee,
                    statusEmployee: action.payload.statusEmployee,
                    display: action.payload.nameEmployee,
                }
                state.push(employee);
            },
            toggleStatusEmployee: (state, action) => {
                state.map((employee) => {
                    if (employee.id === action.payload.id) {
                        employee.statusEmployee = action.payload.statusEmployee;
                        return employee;
                    }
                    return employee;
                })
            },
            toggleEmployeesList: (state, actions) => {
                const existingTodo = state.map((todo) => actions.payload.key.includes(todo.key) ? todo.statusEmployee = 2 : '');
                state = existingTodo;
            }
        },
    }
);

export const { addEmployee, toggleStatusEmployee, toggleEmployeesList } = employeeSlice.actions;

export default employeeSlice.reducer;


