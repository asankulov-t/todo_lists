
type StateType={
    age:number,
    childrenCount:number,
    name:string
}
type ActionType={
    type:string,
    [key:string]:any
}



export const userReducer=(state:StateType, action:ActionType):StateType=>{
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState={...state}
            newState.age=state.age+1
            return newState
        case 'INCREMENT-CHILDRENCOUNT':
            return {
                ...state,
                childrenCount:state.childrenCount+1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name:action.name
            }
        default:
            throw new Error("I don't know what to do")
    }
}