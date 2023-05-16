
import {todoListReducer} from './TodoList-reducer';
import {TodoListType} from "../../App";
import {v1} from "uuid";


test('remove selected todo list',()=>{
    let todoID1 = v1();
    let todoID2 = v1();
    let state:Array<TodoListType>=[
        {id: todoID1, title: 'What to learn', filter: 'All'},
        {id: todoID2, title: 'What to byu', filter: 'All'}
    ]
    const result=todoListReducer(state,{type:"REMOVE-TODO",id:todoID1})
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(todoID2)
})

test('add todo list',()=>{
    let todoID1 = v1();
    let todoID2 = v1();
    let state:Array<TodoListType>=[
        {id: todoID1, title: 'What to learn', filter: 'All'},
        {id: todoID2, title: 'What to byu', filter: 'All'}
    ]
    const result=todoListReducer(state,{type:"ADD-TODO",title:'Do home work'})
    expect(result.length).toBe(3)
    expect(result[0].title).toBe('Do home work')
    expect(result[0].filter).toBe('All')
})

test('change todo title',()=>{
    let todoID1 = v1();
    let todoID2 = v1();
    let state:Array<TodoListType>=[
        {id: todoID1, title: 'What to learn', filter: 'All'},
        {id: todoID2, title: 'What to byu', filter: 'All'}
    ]
    const result=todoListReducer(state,{type:"CHANGE-TITLE",id:todoID2,title:'Byu netbook'})
    expect(result.length).toBe(2)
    expect(result[1].title).toBe('Byu netbook')
})

test('change todo filter',()=>{
    let todoID1 = v1();
    let todoID2 = v1();
    let state:Array<TodoListType>=[
        {id: todoID1, title: 'What to learn', filter: 'All'},
        {id: todoID2, title: 'What to byu', filter: 'All'}
    ]
    const result=todoListReducer(state,{type:"CHANGE-FILTER",id:todoID2,filter:'Completed'})
    expect(result.length).toBe(2)
    expect(result[1].filter).toBe('Completed')
})