import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {tasksReducer} from "./Tasks-reducer";
import {todoListReducer} from "./TodoList-reducer";
import {apiStatusReducer} from "./api_status";
import {LoginReducer} from "./LoginReducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer=combineReducers({
    todoLists:todoListReducer,
    tasks:tasksReducer,
    apiStatusReducer:apiStatusReducer,
    login:LoginReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

//export const store=createStore(rootReducer,applyMiddleware(thunkMiddleware));
export const store=configureStore({
    reducer:rootReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

