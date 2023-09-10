type status='loading'|'failed'|'succeess'
type initialStateType={
    status:status
    errors:string|null
}
type actions=ReturnType<typeof setStatusAc>
const initState:initialStateType={
    status:'failed',
    errors:'Some Error'
}
export const apiStatusReducer=(state:initialStateType=initState,action:actions):initialStateType=>{
    switch (action.type){
        case "SET_STATUS":
            return {...state, errors:action.error, status:action.status}
        default: return state
    }
}

export const setStatusAc=(error:string|null,status:status)=>({type:'SET_STATUS',error, status})
