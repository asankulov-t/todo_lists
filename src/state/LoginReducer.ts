import {loginType, TODOLISTAPI} from "../Api/Api";
import {Dispatch} from "redux";
import {setStatusAc} from "./api_status";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

let initState = {
    isLoggin: false
}
export const LoginFetchTh_=createAsyncThunk('auth/login', async (param:loginType,thunkAPI)=>{
    try {
        let res=await TODOLISTAPI.authAPI(param);
        return
    }

})
const slice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        setLogginAc(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggin = action.payload.value
        }
    }
})

const setLogginAc = slice.actions.setLogginAc
export const LoginReducer = slice.reducer;
export const LoginFetchTh = (data: loginType) => (dispatch: Dispatch) => {
    dispatch(setStatusAc({error: null, status: "loading"}))
    TODOLISTAPI.authAPI(data).then((r) => {
        if (r.data.resultCode === 0) {
            dispatch(setLogginAc({value: true}))
            dispatch(setStatusAc({error: null, status: "succeess"}))
        } else {
            dispatch(setLogginAc({value: false}))
            dispatch(setStatusAc({error: r.data.messages[0], status: 'failed'}))
        }

    })
        .catch((error) => {
            dispatch(setLogginAc({value: false}))
            dispatch(setStatusAc({error: error.messages, status: 'failed'}))
        })
}

export const logoutTh = () => (dispatch: Dispatch) => {
    dispatch(setStatusAc({error: null, status: "loading"}))
    TODOLISTAPI.logoutApi().then((r) => {
        if (r.data.resultCode === 0) {
            dispatch(setLogginAc({value: false}))
            dispatch(setStatusAc({error: null, status: "succeess"}))
        } else {
            dispatch(setLogginAc({value: false}))
            dispatch(setStatusAc({error: r.data.messages[0], status: 'failed'}))
        }
    })
        .catch((error) => {
            dispatch(setLogginAc({value: false}))
            dispatch(setStatusAc({error: error.data.messages[0], status: 'failed'}))
        })
}