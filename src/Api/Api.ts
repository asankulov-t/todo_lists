import axios from "axios";

const settings={
    withCredentials:true,
    headers:{
        'API-KEY':'87f0705f-39fd-4dd5-a451-462a1ea0a668'
    }
}

export  let authFunc=()=>{
        let data= axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title:'Hello Talant'},settings).then(r=>r)
        return data
    }
