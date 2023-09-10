import {TODOLISTAPI, TodoListType} from "../Api/Api";
import {Dispatch} from "redux";


export type ADD_TODO = ReturnType<typeof addTodoAc>
export type REMOVE_TODO = ReturnType<typeof removeTdAc>
export type SET_TODOLISTS = ReturnType<typeof setTodosAc>

export type actionTypes =
    SET_TODOLISTS
    | REMOVE_TODO
    | ADD_TODO
    | ReturnType<typeof changeTitleAc>


export type TodoListEntityType = {
    id: string,
    title: string,
    addedDate?: string | null,
    order?: number | null,
}
const initialState: Array<TodoListEntityType> = []
export const todoListReducer = (state: Array<TodoListEntityType> = initialState, action: actionTypes): Array<TodoListEntityType> => {
    switch (action.type) {
        case "SET_TODOLISTS":
            return action.todoLists.map((t)=>t)
        case "REMOVE-TODO": {
            return state.filter((t) => t.id !== action.id)
        }
        case "ADD-TODO": {
            return [action.todoList, ...state]
        }
        case "CHANGE-TITLE": {
            return state.map((t) => t.id === action.id ? {...t, title: action.title} : t
            )
        }
        default:
            return state
    }
}

export const removeTdAc = (id: string) => ({
    type: 'REMOVE-TODO',
    id: id
} as const)


export const addTodoAc = (todoList: TodoListType) => ({
    type: 'ADD-TODO',
    todoList
} as const)

export const changeTitleAc = (id: string, title: string) => ({
    type: "CHANGE-TITLE",
    id,
    title
} as const)

export const setTodosAc = (todolists: Array<TodoListEntityType>) => ({
    type: 'SET_TODOLISTS',
    todoLists: todolists
} as const)


export const fetchDataTodoTh = () => (dispatch: Dispatch) => {
    TODOLISTAPI.getTodoLists()
        .then(r => {
            dispatch(setTodosAc(r.data))
        })
}

export const deleteTodoTh = (todoId: string) => (dispatch: Dispatch) => {
    TODOLISTAPI.deleteTodo(todoId)
        .then(r => {
            dispatch(removeTdAc(todoId))
        })
}

export const addTodoListTh = (title: string) => (dispatch: Dispatch) => {
    TODOLISTAPI.createTodoList(title)
        .then(r => {
            dispatch(addTodoAc(r.data.data.item))
        })
}

export const changeTodoTitleTh = (todoId: string, title: string) => (dispatch: Dispatch) => {
    TODOLISTAPI.changeTodoList(todoId, title)
        .then(r => {
            dispatch(changeTitleAc(todoId, title))
        })
}