import {addTodoAc, removeTdAc, setTodosAc} from "./TodoList-reducer";
import {TasksStateType} from "../AppWithReducer";
import {Dispatch} from "redux";
import {TaskStatuses, TODOLISTAPI, updateTaksType} from "../Api/Api";
import {AppRootState} from "./store";
import {setStatusAc} from "./api_status";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export let fetchDataTaskTh=createAsyncThunk('tasks/fetchTasks',async (todoId: string,thunkAPI)=>{
    thunkAPI.dispatch(setStatusAc({error: null, status: 'loading'}))
    const res= await TODOLISTAPI.getTasks(todoId)
    thunkAPI.dispatch(setStatusAc({error: null, status: 'succeess'}))
    return {tasks: res.data.items, todoListID: todoId}
})
export const deleteTaskTh=createAsyncThunk('tasks/deleteTask',(param:{todoId: string, taskId: string}, thunkAPI)=>{
    let {todoId,taskId}=param;
    thunkAPI.dispatch(setStatusAc({error: null, status: 'loading'}))
    return TODOLISTAPI.deleteTask(todoId, taskId)
        .then(r => {
                thunkAPI.dispatch(setStatusAc({error: null, status: 'succeess'}))
               return {todoId, id: taskId}
        })
})

export const addTaskTh=createAsyncThunk('tasks/addTask',(param:{todoId: string, title: string},thunkAPI)=>{
    let{todoId, title}=param;
    thunkAPI.dispatch(setStatusAc({error: null, status: 'loading'}))
    return TODOLISTAPI.createTask(todoId, title).then(r=>{
        thunkAPI.dispatch(setStatusAc({error: null, status: 'succeess'}))
        return r.data.data.item
    })
})

// export const changeStatusTh=createAsyncThunk('tasks/change',(param:{todoId: string, domainData: localupdateTaksType, taskId: string}, thunkAPI)=>{
//     let {todoId, domainData, taskId}=param;
//
//    return TODOLISTAPI.changeTask(todoId, taskId, model)
//         .then(r => {
//             dispatch(changeTaskAc({todoId: todoId, taskId: taskId, model}))
//             dispatch(setStatusAc({error: null, status: 'succeess'}))
//         })
//         .catch((error) => {
//             dispatch(setStatusAc({error, status: 'failed'}))
//         })
// })

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        changeTaskAc(state, action: PayloadAction<{ todoId: string, taskId: string, model: localupdateTaksType }>) {
            const tasks = state[action.payload.todoId];
            let ind = tasks.findIndex(t => t.id === action.payload.taskId);
            tasks[ind] = {...tasks[ind], ...action.payload.model}
        },
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
        builder.addCase(fetchDataTaskTh.fulfilled,(state, action)=>{
            state[action.payload.todoListID]=action.payload.tasks
        });
        builder.addCase(deleteTaskTh.fulfilled,(state, action)=>{
            const tasks = state[action.payload.todoId];
            let ind = tasks.findIndex(t => t.id=== action.payload.id);
            if (ind > -1) {
                tasks.splice(ind, 1)
            }
        });
        builder.addCase(addTaskTh.fulfilled,(state, action)=>{
            state[action.payload.todoListId].unshift(action.payload)
        })
    }
})


export const tasksReducer = slice.reducer

export const { changeTaskAc} = slice.actions
//actions



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


