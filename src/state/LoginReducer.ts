import {LoginResType, loginType, TODOLISTAPI} from "../Api/Api";
import {Dispatch} from "redux";
import {actions, setStatusAc} from "./api_status";

type initType={
    isLoggin:boolean
}

let initState:initType={
    isLoggin:false
}
type actionType={
    type:'LOGINED',
    isLoggin:boolean
}
export const setLogginAc=(loggin:boolean):actionType=>{
    return {
        type:'LOGINED',
        isLoggin:loggin
    }
}

export const LoginReducer=(state:initType=initState,action:actionType):initType=>{
    switch (action.type){
        case "LOGINED":
            return {...state, isLoggin:action.isLoggin}
        default:
            return state
    }
}
export const LoginFetchTh=(data:loginType)=>(dispatch:Dispatch<actionType|actions>)=>{
    dispatch(setStatusAc(null, 'loading'))
    TODOLISTAPI.authAPI(data).then((r)=>{
        if (r.data.resultCode===0){
            dispatch(setLogginAc(true))
            dispatch(setStatusAc(null, 'succeess'))
        }else {
            dispatch(setLogginAc(false))
            dispatch(setStatusAc(r.data.messages[0], 'failed'))
        }

    })
    .catch((error)=>{
            dispatch(setLogginAc(false))
            dispatch(setStatusAc(error.messages, 'failed'))
    })
}