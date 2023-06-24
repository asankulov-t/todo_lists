import {FilterType, TodoListType} from "../AppWithReducer";
import {v1} from "uuid";

export type REMOVE_TODO={
    type:'REMOVE-TODO',
    id:string
}
export type ADD_TODO={
    type:'ADD-TODO',
    title:string,
    todoID:string
}
export type CHANGE_TITLE={
    type:'CHANGE-TITLE',
    id:string,
    title:string
}
export type CHANGE_FILTER={
    type:'CHANGE-FILTER',
    id:string,
    filter:FilterType
}
export type actionTypes=REMOVE_TODO|ADD_TODO|CHANGE_TITLE|CHANGE_FILTER

// export let todoID1 = v1();
// export let todoID2 = v1();

const initialState:Array<TodoListType>=[

]
export const todoListReducer=(state:Array<TodoListType>=initialState,action:actionTypes):Array<TodoListType>=>{
    switch (action.type) {
        case "REMOVE-TODO":{
            return state.filter((t)=>t.id!=action.id)
        }
        case "ADD-TODO":{
            return [{id:action.todoID,title:action.title, filter:'All'},...state]
        }
        case "CHANGE-TITLE":{
            return state.map((t)=>{
                if (t.id==action.id){
                    t.title=action.title
                    return t
                } return  t
            })
        }
        case "CHANGE-FILTER":{
            return state.map((t)=>{
                if (t.id==action.id){
                    t.filter=action.filter;
                    return t
                } return  t
            })
        }
        default: return state
    }
}

export const removeTdAc=(id:string):REMOVE_TODO=>{
    return {
        type:'REMOVE-TODO',
        id:id
    }
}
export const addTodoAc=(title:string):ADD_TODO=>{
    return {
        type:'ADD-TODO',
        title,
        todoID:v1()
    }
}
export const changeTitleAc=(id:string,title:string):CHANGE_TITLE=>{
    return {
        type:"CHANGE-TITLE",
        id,
        title
    }
}
export const changeFilterAc=(id:string,filter:FilterType):CHANGE_FILTER=>{
    return {
        type:"CHANGE-FILTER",
        id,
        filter
    }
}