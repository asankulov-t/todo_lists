import {LoginResType, loginType, TODOLISTAPI} from "../Api/Api";
import {Dispatch} from "redux";
import {actions, setStatusAc} from "./api_status";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initState = {
    isLoggin: false
}

const slice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        setLogginAc(state, action:PayloadAction<{value:boolean}>){
            state.isLoggin=action.payload.value
        }
    }
})

const setLogginAc = slice.actions.setLogginAc

export const LoginReducer = slice.reducer;

export const LoginFetchTh = (data: loginType) => (dispatch: Dispatch) => {
    dispatch(setStatusAc(null, 'loading'))
    TODOLISTAPI.authAPI(data).then((r) => {
        if (r.data.resultCode === 0) {
            dispatch(setLogginAc({value:true}))
            dispatch(setStatusAc(null, 'succeess'))
        } else {
            dispatch(setLogginAc({value: false}))
            dispatch(setStatusAc(r.data.messages[0], 'failed'))
        }

    })
        .catch((error) => {
            dispatch(setLogginAc({value:false}))
            dispatch(setStatusAc(error.messages, 'failed'))
        })
}

export const logoutTh = () => (dispatch: Dispatch) => {
    dispatch(setStatusAc(null, 'loading'))
    TODOLISTAPI.logoutApi().then((r) => {
        if (r.data.resultCode === 0) {
            dispatch(setLogginAc({value:true}))
            dispatch(setStatusAc(null, 'succeess'))
        } else {
            dispatch(setLogginAc({value:false}))
            dispatch(setStatusAc(r.data.messages[0], 'failed'))
        }
    })
        .catch((error) => {
            dispatch(setLogginAc({value:false}))
            dispatch(setStatusAc(error.messages, 'failed'))
        })
}