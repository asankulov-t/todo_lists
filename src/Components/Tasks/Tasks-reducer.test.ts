import {v1} from "uuid";
import {TasksStateType} from "../../App";
import {addTaskAc, changeTaskAc, changeTaskTitleAc, removeTaskAc, tasksReducer} from "./Tasks-reducer";

test('change title',()=>{

    const startState:TasksStateType={
        "todo1": [
            {id: '1', title: 'css', isDone: true},
            {id: '2', title: 'HTML', isDone: false},
            {id: '3', title: 'JavaScript', isDone: true},],
        "todo2": [
            {id: v1(), title: 'PC', isDone: true},
            {id: v1(), title: 'Playstation', isDone: false},
            {id: v1(), title: 'Weed', isDone: true},
        ]
    }
    let result=tasksReducer(startState, changeTaskTitleAc('todo1','1','Redux'))
    expect(result["todo1"][0].title).toBe('Redux')

})

test('remove task',()=>{

    const startState:TasksStateType={
        "todo1": [
            {id: '1', title: 'css', isDone: true},
            {id: '2', title: 'HTML', isDone: false},
            {id: '3', title: 'JavaScript', isDone: true},],
        "todo2": [
            {id: v1(), title: 'PC', isDone: true},
            {id: v1(), title: 'Playstation', isDone: false},
            {id: v1(), title: 'Weed', isDone: true},
        ]
    }
    let result=tasksReducer(startState, removeTaskAc('todo1','1'))
    expect(result["todo1"].length).toBe(2)

})

test('added task',()=>{

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
    let result=tasksReducer(startState, addTaskAc('GitHub','todo2'))
    expect(result["todo2"][0].title).toBe('GitHub')

})

test('changed status',()=>{

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
    let result=tasksReducer(startState, changeTaskAc('2','todo2'))
    expect(result["todo2"][1].isDone).toBe(true)

})