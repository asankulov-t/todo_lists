import {setTodosAc, addTodoAc, removeTdAc} from "./TodoList-reducer";
import {TasksStateType} from "../AppWithReducer";
import {Dispatch} from "redux";
import {TaskStatuses, TODOLISTAPI, updateTaksType} from "../Api/Api";
import {AppRootState} from "./store";
import {setStatusAc} from "./api_status";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type taskType = {
    description?: string
    title: string
    status: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
    id: string
    todoListId: string
    order?: number
    addedDate?: string
}
export type localupdateTaksType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: number,
    startDate?: string,
    deadline?: string,
}

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAc(state, action: PayloadAction<{ todoId: string, id: string }>) {
            const tasks = state[action.payload.todoId];
            let ind = tasks.findIndex(t => t.id=== action.payload.id);
            if (ind > -1) {
                tasks.splice(ind, 1)
            }
        },
        addTaskAc(state, action: PayloadAction<{ task: taskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        changeTaskAc(state, action: PayloadAction<{ todoId: string, taskId: string, model: localupdateTaksType }>) {
            const tasks = state[action.payload.todoId];
            let ind = tasks.findIndex(t => t.id === action.payload.taskId);
            tasks[ind] = {...tasks[ind], ...action.payload.model}
        },
        setTasksAc(state, action: PayloadAction<{ tasks: Array<taskType>, todoListID: string }>) {
            state[action.payload.todoListID] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoAc, (state, action) => {
            state[action.payload.id] = []
        });
        builder.addCase(removeTdAc, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodosAc, (state, action) => {
            action.payload.map((t) => t)
        });
    }
})


export const tasksReducer = slice.reducer

export const {removeTaskAc, addTaskAc, changeTaskAc, setTasksAc} = slice.actions
//actions


//thunks
export const fetchDataTaskTh = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAc({error: null, status: 'loading'}))
    TODOLISTAPI.getTasks(todoId)
        .then(r => {
            dispatch(setTasksAc({tasks: r.data.items, todoListID: todoId}))
            dispatch(setStatusAc({error: null, status: 'succeess'}))
        })
        .catch((error) => {
            dispatch(setStatusAc({error: error, status: 'failed'}))
        })
}
export const deleteTaskTh = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAc({error: null, status: 'loading'}))
    TODOLISTAPI.deleteTask(todoId, taskId)
        .then(r => {
            dispatch(removeTaskAc({todoId, id: taskId}))
            dispatch(setStatusAc({error: null, status: 'succeess'}))
        })
        .catch((error) => {
            dispatch(setStatusAc({error: error, status: 'failed'}))
        })
}
export const addTaskTh = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAc({error: null, status: 'loading'}))
    TODOLISTAPI.createTask(todoId, title)
        .then(r => {
            dispatch(addTaskAc({task: r.data.data.item}))
            dispatch(setStatusAc({error: null, status: 'succeess'}))
        })
        .catch((error) => {
            dispatch(setStatusAc({error: error, status: 'failed'}))
        })
}
export const changeStatusTh = (todoId: string, doimainData: localupdateTaksType, taskId: string) => (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState();
    const currentTask = state.tasks[todoId].find(t => t.id === taskId)
    if (!currentTask) {
        throw new Error('Current task not foun')
    }
    const model: updateTaksType = {
        title: currentTask.title,
        description: '',
        status: currentTask.status,
        priority: 0,
        startDate: '',
        deadline: '',
        ...doimainData
    }
    dispatch(setStatusAc({error: null, status: 'loading'}))

    TODOLISTAPI.changeTask(todoId, taskId, model)
        .then(r => {
            dispatch(changeTaskAc({todoId: todoId, taskId: taskId, model}))
            dispatch(setStatusAc({error: null, status: 'succeess'}))
        })
        .catch((error) => {
            dispatch(setStatusAc({error, status: 'failed'}))
        })
}


