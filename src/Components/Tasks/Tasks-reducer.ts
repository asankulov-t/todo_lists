import {v1} from "uuid";
import {TasksStateType} from "../../App";
import {ADD_TODO, REMOVE_TODO} from "../Todolist/TodoList-reducer";

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
export type actions = CHANGETASKTITLE | REMOVETASK | ADDTASK | CHANGESTATUS | ADD_TODO|REMOVE_TODO
export const tasksReducer = (state: TasksStateType, action: actions): TasksStateType => {
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
            let newT = {id: v1(), title: action.title, isDone: false};
            // let tasks = state[action.id];
            // let allTasks = [{...newT}, ...tasks]
            // state[action.id] = allTasks
            return {...state,[action.id]:[newT,...state[action.id]]}
        case "CHANGE-STATUS":
            let change = state[action.todoId].map((t) => {
                if (action.id === t.id) {
                    t.isDone =!t.isDone;
                    return t
                }
                return t
            })
            state[action.todoId] = change;
            return state
        case "ADD-TODO": {
            const copy = {...state}
            copy[action.todoID] = []
            return copy
        }
        case "REMOVE-TODO":
            const copy={...state}
            delete copy[action.id]
            return copy
        default:
            throw new Error("HZ")

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