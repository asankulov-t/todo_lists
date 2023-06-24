import {TasksStateType, TodoListType} from "../../App";
import {addTodoAc, removeTdAc, todoListReducer} from "../../state/TodoList-reducer";
import {tasksReducer} from "../../state/Tasks-reducer";

test("test tasks and todos",()=>{
    const taskState:TasksStateType={}
    const todoState:Array<TodoListType>=[];
    let action =addTodoAc('Hello');

    const tasks=tasksReducer(taskState,action);
    const todos=todoListReducer(todoState, action);

    const keys=Object.keys(tasks)
    let currentTaskId=keys[0]
    let currentTodoId=todos[0].id;

    expect(currentTaskId).toBe(action.todoID)
    expect(currentTodoId).toBe(action.todoID)
})

test("property with todoid should be deleted",()=>{

    const startState:TasksStateType={
        "todo1": [
            {id: '1', title: 'css', isDone: true},
            {id: '2', title: 'HTML', isDone: false},
            {id: '3', title: 'JavaScript', isDone: true},],
        "todo2": [
            {id: '1', title: 'PC', isDone: true},
            {id: '2', title: 'Playstation', isDone: false},
            {id: '3', title: 'Weed', isDone: true},
        ]
    }

    let action =removeTdAc('todo2');

    const tasks=tasksReducer(startState,action);


    const keys=Object.keys(tasks)
    expect(keys.length).toBe(1)
   expect(tasks['todo2']).toBeUndefined()
})