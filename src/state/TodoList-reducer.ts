import {TODOLISTAPI, TodoListType} from "../Api/Api";
import {Dispatch} from "redux";
import { setStatusAc} from "./api_status";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TodoListEntityType = {
    id: string,
    title: string,
    addedDate?: string | null,
    order?: number | null,
}


const initialState: Array<TodoListEntityType> = []

export const slice=createSlice({
    name:'todolist',
    initialState:initialState,
    reducers:{
        removeTdAc(state, action:PayloadAction<{id:string}>){
            const ind=state.findIndex(tl=>tl.id===action.payload.id);
            if (ind>-1){
                state.splice(ind, 1)
            }
            // state.filter((t) => t.id !== action.payload.id)
        },
        addTodoAc(state,action:PayloadAction<TodoListType>){
            state.unshift({...action.payload})
            // [action.payload, ...state]
        },
        changeTitleAc(state, action:PayloadAction<{id:string, title:string}>){
            const ind=state.findIndex(tl=>tl.id===action.payload.id);
            state[ind].title=action.payload.title
        },
        setTodosAc(state,action:PayloadAction<Array<TodoListEntityType>>){
            return action.payload.map((t) => t)
        },
    },
    extraReducers:{

    }
})

export const {removeTdAc,addTodoAc,changeTitleAc,setTodosAc}=slice.actions

export const todoListReducer =slice.reducer



//thunks todo
export const fetchDataTodoTh = () => (dispatch: Dispatch) => {
    dispatch(setStatusAc({error: null, status: 'loading'}))

    TODOLISTAPI.getTodoLists()
        .then(r => {
            dispatch(setTodosAc(r.data))
            dispatch(setStatusAc({error: null, status: 'succeess'}))
        })
        .catch((error) => {
            dispatch(setStatusAc({error: error, status: 'failed'}))
        })

};

export const deleteTodoTh = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAc({error: null, status: 'loading'}))

    TODOLISTAPI.deleteTodo(todoId)
        .then(r => {
            dispatch(removeTdAc({id:todoId}))
            dispatch(setStatusAc({error: null, status: 'succeess'}))
        })
        .catch((error) => {
            dispatch(setStatusAc({error: error, status: 'failed'}))
        })
};

export const addTodoListTh = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAc({error: null, status: 'loading'}))
    TODOLISTAPI.createTodoList(title)
        .then(r => {
            dispatch(addTodoAc(r.data.data.item))
            dispatch(setStatusAc({error: null, status: 'succeess'}))
        })
        .catch((error) => {
            dispatch(setStatusAc({error: error, status: 'failed'}))
        })
};

export const changeTodoTitleTh = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAc({error: null, status: 'loading'}))

    TODOLISTAPI.changeTodoList(todoId, title)
        .then(r => {
            dispatch(changeTitleAc({id:todoId, title}))
            dispatch(setStatusAc({error: null, status: 'succeess'}))
        })
        .catch((error) => {
            dispatch(setStatusAc({error: error, status: 'failed'}))
        })
};

