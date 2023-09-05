import {v1} from "uuid";
import {ADD_TODO, REMOVE_TODO, SET_TODOLISTS, setTodosAc} from "./TodoList-reducer";
import {TasksStateType} from "../AppWithReducer";
import {Dispatch} from "redux";
import {TaskStatuses, TODOLISTAPI} from "../Api/Api";

export type CHANGETASKTITLE = {
    type: "CHANGE-TASK-TITLE",
    todoId: string,
    id: string,
    title: string
}
export type REMOVETASK = {
    type: "REMOVE-TASK",
    id: string,
    todoId: string
}

export type ADDTASK = {
    type: "ADD-TASK",
    title: string,
    id: string
}
export type CHANGESTATUS = {
    type: "CHANGE-STATUS",
    id: string,
    todoId: string,
}
export type SET_TASKS = {
    type: 'SET_TASKS',
    tasks: Array<taskType>
    todoListID: string
}
export type FILTERTASKS = {
    type: "FILTER-TASKS",
    filter: 'Completed' | 'Active' | 'All',
    todoId: string,
    taskID: string
}
export type actions =
    SET_TASKS
    | CHANGETASKTITLE
    | REMOVETASK
    | ADDTASK
    | CHANGESTATUS
    | ADD_TODO
    | REMOVE_TODO
    | FILTERTASKS
    | SET_TODOLISTS
export type taskType = {
    description?: string
    title: string
    completed?: boolean
    status: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
    id: string
    todoListId?: string
    order?: number
    addedDate?: string
}
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: actions): TasksStateType => {
    switch (action.type) {
        case "SET_TASKS": {
            const copy = {...state}
            copy[action.todoListID] = action.tasks
            console.log(copy)
            return copy
        }
        case "SET_TODOLISTS": {
            const copy = {...state}
            action.todoLists.forEach(tl => {
                copy[tl.id] = []
            })
            return copy
        }
        case "CHANGE-TASK-TITLE":
            let changed = state[action.todoId].map((t) => {
                if (action.id === t.id) {
                    t.title = action.title
                    return t
                }
                return t
            })
            state[action.todoId] = changed;
            return {...state}
        case "REMOVE-TASK":
            let taskObj = state[action.todoId].filter((t) => t.id !== action.id)
            state[action.todoId] = taskObj
            return {...state}
        case "ADD-TASK":
            let newT = {id: v1(), title: action.title, status: 2};
            return {...state, [action.id]: [newT, ...state[action.id]]}
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todoId]: state[action.todoId].map((tl) => tl.id === action.id ? {
                    ...tl,
                    status: tl.status==2?0:2
                } : tl)
            }
        case "ADD-TODO": {
            const copy = {...state}
            copy[action.todoID] = []
            return copy
        }
        case "REMOVE-TODO":
            const copy = {...state}
            delete copy[action.id]
            return copy
        default:
            return state

    }
}

export const changeTaskTitleAc = (todoId: string, id: string, title: string): CHANGETASKTITLE => {
    return {
        type: "CHANGE-TASK-TITLE",
        todoId,
        id,
        title
    }
}

export const removeTaskAc = (todoId: string, id: string): REMOVETASK => {
    return {
        type: "REMOVE-TASK",
        id,
        todoId
    }
}

export const addTaskAc = (title: string, id: string): ADDTASK => {
    return {
        type: "ADD-TASK",
        title,
        id
    }
}

export const changeTaskAc = (id: string, todoId: string): CHANGESTATUS => {
    return {
        type: "CHANGE-STATUS",
        id,
        todoId,
    }
}


export const setTasksAc = (tasks: Array<taskType>, todoListID: string): SET_TASKS => {
    return {type: 'SET_TASKS', tasks, todoListID}
}
export const fetchDataTaskTh = (todoId: string) => {
    return (dispatch: Dispatch) => {
        TODOLISTAPI.getTasks(todoId)
            .then(r => {
                dispatch(setTasksAc(r.data.items, todoId))
            })
    }
}

export const deleteTaslTh=()=>{
    return
}