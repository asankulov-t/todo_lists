import {ADD_TODO, REMOVE_TODO, SET_TODOLISTS} from "./TodoList-reducer";
import {TasksStateType} from "../AppWithReducer";
import {Dispatch} from "redux";
import {TaskStatuses, TODOLISTAPI, updateTaksType} from "../Api/Api";
import {AppRootState} from "./store";

export type actions =
    ReturnType<typeof removeTaskAc>
    | ReturnType<typeof addTaskAc>
    | ReturnType<typeof changeTaskAc>
    | ReturnType<typeof setTasksAc>
    | ADD_TODO
    | REMOVE_TODO
    |SET_TODOLISTS
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

export const tasksReducer = (state: TasksStateType = initialState, action: actions): TasksStateType => {
    switch (action.type) {
        case "SET_TASKS": {
            return {...state, [action.todoListID]:action.tasks}
        }
        case "SET_TODOLISTS": {
            const copy = {...state}
            action.todoLists.forEach(tl => {
                copy[tl.id] = []
            })
            return copy
        }
        case "REMOVE-TASK":
            return {...state,
                [action.todoId]:state[action.todoId].filter((t)=>t.id!==action.id)
            }
        case "ADD-TASK":
            return {...state,
                [action.task.todoListId]:[action.task,...state[action.task.todoListId]]
            }
        case "CHANGE-STATUS":
            return {...state,[action.todoId]:state[action.todoId].map((t)=>t.id===action.id?{...t,...action.model}:t)}
        case "ADD-TODO":
            return {...state, [action.todoList.id]:[]}
        case "REMOVE-TODO":
            const copy = {...state}
            delete copy[action.id]
            return copy
        default:
            return state
    }
}


//actions
export const removeTaskAc = (todoId: string, id: string) => ({
    type: "REMOVE-TASK",
    id,
    todoId
} as const)


export const addTaskAc = (task: taskType) => ({
    type: "ADD-TASK",
    task
} as const)

export const changeTaskAc = (id: string, model: localupdateTaksType, todoId: string) => ({type: "CHANGE-STATUS",
    model,
    id,
    todoId,
} as const)


export const setTasksAc = (tasks: Array<taskType>, todoListID: string) => ({
    type: 'SET_TASKS',
    tasks,
    todoListID
} as const)


//thunks
export const fetchDataTaskTh = (todoId: string) => (dispatch: Dispatch) => {
    TODOLISTAPI.getTasks(todoId)
        .then(r => {
            dispatch(setTasksAc(r.data.items, todoId))
        })
}

export const deleteTaskTh = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    TODOLISTAPI.deleteTask(todoId, taskId)
        .then(r => {
            dispatch(removeTaskAc(todoId, taskId))
        })
}


export const addTaskTh = (todoId: string, title: string) =>  (dispatch: Dispatch) => {
    TODOLISTAPI.createTask(todoId, title)
        .then(r => {
            dispatch(addTaskAc(r.data.data.item))
        })
}




export const changeStatusTh = (todoId: string, doimainData: localupdateTaksType, taskId: string) =>  (dispatch: Dispatch, getState: () => AppRootState) => {
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
    TODOLISTAPI.changeTask(todoId, taskId, model)
        .then(r => {
            dispatch(changeTaskAc(taskId, model, todoId))
        })
}


