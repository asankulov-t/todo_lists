import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {tasksReducer} from "./Tasks-reducer";
import {todoListReducer} from "./TodoList-reducer";


const rootReducer=combineReducers({
    todoLists:todoListReducer,
    tasks:tasksReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer,applyMiddleware(thunkMiddleware));


