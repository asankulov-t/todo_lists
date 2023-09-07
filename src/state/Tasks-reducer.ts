import {ADD_TODO, REMOVE_TODO, SET_TODOLISTS, setTodosAc} from "./TodoList-reducer";
import {TasksStateType} from "../AppWithReducer";
import {Dispatch} from "redux";
import {TaskStatuses, TODOLISTAPI, updateTaksType} from "../Api/Api";
import {AppRootState} from "./store";

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
    task:taskType
}
export type CHANGESTATUS = {
    type: "CHANGE-STATUS",
    model:localupdateTaksType
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
    status: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
    id: string
    todoListId: string
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
        // case "CHANGE-TASK-TITLE":
        //     let changed = state[action.todoId].map((t) => {
        //         if (action.id === t.id) {
        //             t.title = action.title
        //             return t
        //         }
        //         return t
        //     })
        //     state[action.todoId] = changed;
        //     return {...state}
        case "REMOVE-TASK":
            let taskObj = state[action.todoId].filter((t) => t.id !== action.id)
            state[action.todoId] = taskObj
            return {...state}
        case "ADD-TASK":
            const statyCopy={...state}//copy all tasks
            const newTask=action.task //create new variable equels new task created from beckend
            const tasks=statyCopy[newTask.todoListId]//choce todo where we getting old tasks
            const newTasks=[newTask,...tasks]//created variable contains new and old tasks
            statyCopy[newTask.todoListId]=newTasks//we choice current todolist where we give all tasks
            return  statyCopy
        case "CHANGE-STATUS":

            let copyStae={...state};
            let t=copyStae[action.todoId].map(t=>t.id==action.id?{...t,...action.model}:t)
            state[action.todoId]=t
            return {...state}
            // return {
            //     ...state,
            //     [action.todoId]: state[action.todoId].map((tl) => tl.id === action.id ? {
            //         ...tl,
            //         status: tl.status==2?0:2
            //     } : tl)
            // }
        case "ADD-TODO": {
            const copy = {...state}
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

// export const changeTaskTitleAc = (todoId: string, id: string, title: string): CHANGETASKTITLE => {
//     return {
//         type: "CHANGE-TASK-TITLE",
//         todoId,
//         id,
//         title
//     }
// }

export const removeTaskAc = (todoId: string, id: string): REMOVETASK => {
    return {
        type: "REMOVE-TASK",
        id,
        todoId
    }
}

export const addTaskAc = (task:taskType): ADDTASK => {
    return {
        type: "ADD-TASK",
        task
    }
}

export const changeTaskAc = (id: string, model:localupdateTaksType,todoId: string): CHANGESTATUS => {
    return {
        type: "CHANGE-STATUS",
        model,
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

export const deleteTaskTh=(todoId:string, taskId:string)=>{
    return (dispatch: Dispatch) => {
        TODOLISTAPI.deleteTask(todoId,taskId)
            .then(r => {
                dispatch(removeTaskAc(todoId,taskId))
            })
    }
}

export const addTaskTh=(todoId:string, title:string)=>{
    return (dispatch: Dispatch) => {
        TODOLISTAPI.createTask(todoId,title)
            .then(r => {
                dispatch(addTaskAc(r.data.data.item))
            })
    }
}

export type localupdateTaksType={
    title?: string,
    description?: string,
    status?:TaskStatuses,
    priority?: number,
    startDate?: string,
    deadline?: string,
}


export const changeStatusTh=(todoId:string,doimainData:localupdateTaksType,taskId:string)=>{
    return (dispatch: Dispatch,getState:()=>AppRootState) => {
        const state=getState();
        const currentTask=state.tasks[todoId].find(t=>t.id==taskId)
        if (!currentTask){
            throw new Error('Current task not foun')
            return
        }
        const model:updateTaksType={
            title: currentTask.title,
            description: '',
            status:currentTask.status,
            priority: 0,
            startDate: '',
            deadline: '',
            ...doimainData
        }
        TODOLISTAPI.changeTask(todoId,taskId,model)
            .then(r => {
                dispatch(changeTaskAc(taskId,model,todoId))
            })
    }
}


