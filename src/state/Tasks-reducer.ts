import {v1} from "uuid";
import {ADD_TODO, REMOVE_TODO} from "./TodoList-reducer";
import {TasksStateType} from "../AppWithReducer";

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

export type FILTERTASKS = {
    type: "FILTER-TASKS",
    filter:'Completed'|'Active'|'All',
    todoId:string,
    taskID:string
}
export type actions = CHANGETASKTITLE | REMOVETASK | ADDTASK | CHANGESTATUS | ADD_TODO|REMOVE_TODO|FILTERTASKS
export type taskType = {
    description?: string
    title: string
    completed: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
    id: string
    todoListId ?: string
    order?: number
    addedDate?: string
}
const initialState:TasksStateType={
    //
    // [todoID1]: [
    //     {id: v1(), title: 'css', isDone: true},
    //     {id: v1(), title: 'HTML', isDone: false},
    //     {id: v1(), title: 'JavaScript', isDone: true},],
    // [todoID2]: [
    //     {id: v1(), title: 'PC', isDone: true},
    //     {id: v1(), title: 'Playstation', isDone: false},
    //     {id: v1(), title: 'Weed', isDone: true},
    // ]
}

export const tasksReducer = (state: TasksStateType=initialState, action: actions): TasksStateType => {
    // @ts-ignore
    switch (action.type) {
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
            let newT = {id: v1(), title: action.title, completed: false};
            // let tasks = state[action.id];
            // let allTasks = [{...newT}, ...tasks]
            // state[action.id] = allTasks
            return {...state,[action.id]:[newT,...state[action.id]]}
        case "CHANGE-STATUS":
            return {...state,[action.todoId]:state[action.todoId].map((tl)=>tl.id===action.id?{...tl,completed:!tl.completed}:tl)}
        case "ADD-TODO": {
            const copy = {...state}
            copy[action.todoID] = []
            return copy
        }
        case "REMOVE-TODO":
            const copy={...state}
            delete copy[action.id]
            return copy
        default: return  state

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

