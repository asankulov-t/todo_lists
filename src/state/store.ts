import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./Tasks-reducer";
import {todoListReducer} from "./TodoList-reducer";


const rootReducer=combineReducers({
    todoLists:todoListReducer,
    tasks:tasksReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer);


// @ts-ignore
window.store=store;
