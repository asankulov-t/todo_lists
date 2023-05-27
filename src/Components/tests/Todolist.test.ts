import {addTodoAc, changeFilterAc, changeTitleAc, removeTdAc, todoListReducer} from '../Todolist/TodoList-reducer';
import {TodoListType} from "../../App";
import {v1} from "uuid";


test('remove selected todo list',()=>{
    let todoID1 = v1();
    let todoID2 = v1();
    let state:Array<TodoListType>=[
        {id: todoID1, title: 'What to learn', filter: 'All'},
        {id: todoID2, title: 'What to byu', filter: 'All'}
    ]
    const result=todoListReducer(state,removeTdAc(todoID1))
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
    const result=todoListReducer(state,addTodoAc('Do home work'))
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
    const result=todoListReducer(state,changeTitleAc(todoID2,'Byu netbook'))
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
    const result=todoListReducer(state,changeFilterAc(todoID2,'Completed'))
    expect(result.length).toBe(2)
    expect(result[1].filter).toBe('Completed')
})
