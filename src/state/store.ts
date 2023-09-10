import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {tasksReducer} from "./Tasks-reducer";
import {todoListReducer} from "./TodoList-reducer";
import {apiStatusReducer} from "./api_status";


const rootReducer=combineReducers({
    todoLists:todoListReducer,
    tasks:tasksReducer,
    apiStatusReducer:apiStatusReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer,applyMiddleware(thunkMiddleware));


