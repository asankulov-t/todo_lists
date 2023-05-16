import {TodoListType} from "../../App";
import {v1} from "uuid";


type actionType={
    type:string,
    [key:string]:any
}

export const todoListReducer=(state:Array<TodoListType>,action:actionType)=>{
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
            return [newTd,...state]
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