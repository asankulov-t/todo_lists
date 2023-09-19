import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type status='loading'|'failed'|'succeess'
type initialStateType={
    status:status
    errors:string|null
}
export type actions=ReturnType<typeof setStatusAc>



const initState:initialStateType={
    status:'succeess',
    errors:'Some Error'
}

const slice=createSlice({
    name:'status',
    initialState:initState,
    reducers:{
        setStatusAc(state, action:PayloadAction<{error:string|null, status:'loading'|'failed'|'succeess'}>){
            {
                state.status = action.payload.status
                state.errors = action.payload.error
            }
        }
    }
})

export const apiStatusReducer=slice.reducer


export const {setStatusAc}=slice.actions
