import {FilterType, TodoListType} from "../../App";
import {v1} from "uuid";

export type REMOVE_TODO={
    type:'REMOVE-TODO',
    id:string
}
export type ADD_TODO={
    type:'ADD-TODO',
    title:string
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

export const todoListReducer=(state:Array<TodoListType>,action:actionTypes):Array<TodoListType>=>{
    switch (action.type) {
        case "REMOVE-TODO":{
            return state.filter((t)=>t.id!=action.id)
        }
        case "ADD-TODO":{
            let newTd={
                id:v1(),
                title:action.title,
                filter:'All'
            }
            return [{id:v1(),title:action.title, filter:'All'},...state]
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
        default:{
            throw new Error('Something wrong')
        }
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