import {loginType, TODOLISTAPI} from "../Api/Api";
import {Dispatch} from "redux";
import {setStatusAc} from "./api_status";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

let initState = {
    isLoggin: false
}
export const LoginFetchTh=createAsyncThunk('auth/login', async (param:loginType,thunkAPI)=>{
        try {
            thunkAPI.dispatch(setStatusAc({error: null, status: "loading"}))
            let res=await TODOLISTAPI.authAPI(param);
            if (res.data.resultCode===0){
                thunkAPI.dispatch(setStatusAc({error: null, status: "succeess"}))
                return {isLoggin:true}
            }else {
                return {isLoggin:false}

            }
        }catch (e){
            thunkAPI.dispatch(setStatusAc({error: 'Some error', status: "failed"}))
            return {isLoggin:false}
        }
})

export const logoutTh=createAsyncThunk('auth/out', async (arg, thunkAPI)=>{
    try {
        thunkAPI.dispatch(setStatusAc({error: null, status: "loading"}))
        let res=await  TODOLISTAPI.logoutApi()
        if (res.data.resultCode===0){
            thunkAPI.dispatch(setStatusAc({error: null, status: "succeess"}))
            return{isLoggin:false}
        }else {
            thunkAPI.dispatch(setStatusAc({error: res.data.messages[0], status: "failed"}))
            return{isLoggin:true}
        }
    }
    catch (e){
        thunkAPI.dispatch(setStatusAc({error: 'some Error', status: "failed"}))
        return{isLoggin:true}
    }
})
const slice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        setLogginAc(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggin = action.payload.value
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(LoginFetchTh.fulfilled,(state, action) => {
                state.isLoggin=action.payload.isLoggin
        });
        builder.addCase(logoutTh.fulfilled,(state, action) => {
            state.isLoggin=action.payload.isLoggin
        })
    }
})

const setLogginAc = slice.actions.setLogginAc
export const LoginReducer = slice.reducer;
