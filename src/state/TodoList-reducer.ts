import {v1} from "uuid";

export type SET_TODOLISTS={
    type:'SET_TODOLISTS',
    todoLists:Array<TodoListEntityType>
}
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
// export type CHANGE_FILTER={
//     type:'CHANGE-FILTER',
//     id:string,
//     filter:FilterType
// }
export type actionTypes=REMOVE_TODO|ADD_TODO|CHANGE_TITLE|SET_TODOLISTS


export type TodoListEntityType={
    id: string,
    title: string,
    addedDate?:string|null,
    order?: number|null,
}
const initialState:Array<TodoListEntityType>=[

]
export const todoListReducer=(state:Array<TodoListEntityType>=initialState,action:actionTypes):Array<TodoListEntityType>=>{
    switch (action.type) {
        case "SET_TODOLISTS":
            return action.todoLists
        case "REMOVE-TODO":{
            return state.filter((t)=>t.id!=action.id)
        }
        case "ADD-TODO":{
            return [{id:action.todoID,title:action.title},...state]
        }
        case "CHANGE-TITLE":{
            return state.map((t)=>{
                if (t.id==action.id){
                    t.title=action.title
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

export const setTodosAc=(todolists:Array<TodoListEntityType>):SET_TODOLISTS=>{
    return{type:'SET_TODOLISTS', todoLists:todolists}
}
