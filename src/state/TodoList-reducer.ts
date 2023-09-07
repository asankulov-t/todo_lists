
import {TODOLISTAPI, TodoListType} from "../Api/Api";
import {Dispatch} from "redux";
import {addTaskAc} from "./Tasks-reducer";

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
    todoList:TodoListType
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
            return [action.todoList,...state]
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
export const addTodoAc=(todoList:TodoListType):ADD_TODO=>{
    return {
        type:'ADD-TODO',
        todoList
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


export const fetchDataTodoTh=()=>{
    return (dispatch: Dispatch)=>{
        TODOLISTAPI.getTodoLists()
            .then(r=>{
            dispatch(setTodosAc(r.data))
        })
    }
}

export const deleteTodoTh=(todoId:string)=>{
    return (dispatch: Dispatch)=>{
        TODOLISTAPI.deleteTodo(todoId)
            .then(r=>{
                dispatch(removeTdAc(todoId))
            })
    }
}

export const addTodoListTh=(title:string)=>{
    return (dispatch: Dispatch)=>{
        TODOLISTAPI.createTodoList(title)
            .then(r=>{
                dispatch(addTodoAc(r.data.data.item))
            })
    }
}

export const changeTodoTitleTh=(todoId:string, title:string)=>{
    return (dispatch: Dispatch) => {
        TODOLISTAPI.changeTodoList(todoId,title)
            .then(r => {
                dispatch(changeTitleAc(todoId,title))
            })
    }
}