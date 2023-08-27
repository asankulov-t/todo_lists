import axios from "axios";
import exp from "constants";

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}
export type CreateTodolistResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {
        item: TodoListType
    }
}

export type DeleteUpdateTodolistResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}

export type taskType = {
    description: string
    title: string
    completed: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type getTasksType = {
    items: Array<taskType>,
    totalCount: number,
    error: null | string
}



const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '87f0705f-39fd-4dd5-a451-462a1ea0a668'
    }
}

const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})


export const TODOLISTAPI = {
    getTodoLists() {
        return  instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<CreateTodolistResponseType>('todo-lists', {title: title})
    },
    changeTodoList(id: string, title: string) {
        return  instance.put<DeleteUpdateTodolistResponseType>(`todo-lists/${id}`, {title: title})
    },
    deleteTodo(id: string) {
        return instance.delete<DeleteUpdateTodolistResponseType>(`todo-lists/${id}`)
    },
    //tasks
    getTasks(todoId: string) {
        return  instance.get<getTasksType>(`todo-lists/${todoId}/tasks`)
    },
    deleteTask(todoId:string,taskId:string){
        return instance.delete<DeleteUpdateTodolistResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    changeTask(todoId:string,taskId:string,title:string){
        return instance.put<DeleteUpdateTodolistResponseType>(`todo-lists/${todoId}/tasks/${taskId}`,{title:title})
    },
    createTask(todoId:string,title:string){
        return instance.post<CreateTodolistResponseType>(`todo-lists/${todoId}/`,{title:title})
    },
}



