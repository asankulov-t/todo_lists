import {LoginResType, loginType, TODOLISTAPI} from "../Api/Api";
import {Dispatch} from "redux";
import {actions, setStatusAc} from "./api_status";
import {createSlice} from "@reduxjs/toolkit";

let initState = {
    isLoggin: false
}
type actionType = {
    type: 'LOGINED',
    isLoggin: boolean
}



const slice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        setLogginAc(state, action){
            state.isLoggin=action.payload
        }
    }
})

const setLogginAc = slice.actions.setLogginAc

export const LoginReducer = slice.reducer;

export const LoginFetchTh = (data: loginType) => (dispatch: Dispatch) => {
    dispatch(setStatusAc(null, 'loading'))
    TODOLISTAPI.authAPI(data).then((r) => {
        if (r.data.resultCode === 0) {
            dispatch(setLogginAc(true))
            dispatch(setStatusAc(null, 'succeess'))
        } else {
            dispatch(setLogginAc(false))
            dispatch(setStatusAc(r.data.messages[0], 'failed'))
        }

    })
        .catch((error) => {
            dispatch(setLogginAc(false))
            dispatch(setStatusAc(error.messages, 'failed'))
        })
}

export const logoutTh = () => (dispatch: Dispatch) => {
    dispatch(setStatusAc(null, 'loading'))
    TODOLISTAPI.logoutApi().then((r) => {
        if (r.data.resultCode === 0) {
            dispatch(setLogginAc(false))
            dispatch(setStatusAc(null, 'succeess'))
        } else {
            dispatch(setLogginAc(false))
            dispatch(setStatusAc(r.data.messages[0], 'failed'))
        }
    })
        .catch((error) => {
            dispatch(setLogginAc(false))
            dispatch(setStatusAc(error.messages, 'failed'))
        })
}