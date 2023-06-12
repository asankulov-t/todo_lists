import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import Todolist from './Components/Todolist/Todolist';
import InputElement from "./Components/Input/InputElement";
import {Card, Menu, MenuProps} from 'antd';
import {LoginOutlined, MailOutlined} from '@ant-design/icons';
import {
    addTodoAc,
    changeFilterAc,
    changeTitleAc,
    removeTdAc,
    todoListReducer
} from "./Components/Todolist/TodoList-reducer";
import {addTaskAc, changeTaskAc, changeTaskTitleAc, removeTaskAc, tasksReducer} from "./Components/Tasks/Tasks-reducer";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type FilterType = "All" | "Active" | "Completed"

function AppWithReducer() {
    const items: MenuProps['items'] = [
        {
            label: 'LOGIN',
            key: 'Login',
            icon: <LoginOutlined className={'icon'}/>,
        }
    ]
    let todoID1 = v1();
    let todoID2 = v1();

    let [todolists, dispatchTodo] = useReducer(todoListReducer,[
        {id: todoID1, title: 'What to learn', filter: 'All'},
        {id: todoID2, title: 'What to byu', filter: 'All'}
    ])

    let [tasks, dispatchTask] = useReducer(tasksReducer,{

        [todoID1]: [
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'JavaScript', isDone: true},],
        [todoID2]: [
            {id: v1(), title: 'PC', isDone: true},
            {id: v1(), title: 'Playstation', isDone: false},
            {id: v1(), title: 'Weed', isDone: true},
        ]
    })


    let changeTitleTodo = (todoId: string, title: string) => {
        let action=changeTitleAc(todoId, title)
       dispatchTodo(action)
    }
    let removeTodo = (id: string) => {
        let action=removeTdAc(id)
        dispatchTodo(action)
        dispatchTask(action)
    }
    let addTodo = (title: string) => {
        let action=addTodoAc(title);
        dispatchTodo(action)
        dispatchTask(action)
    }
    let changeFilter = (todoId: string, value: FilterType) => {
        let action=changeFilterAc(todoId,value)
       dispatchTodo(action)
    }

    let changTaskTitle = (todoId: string, taskId: string, title: string) => {
        let action=changeTaskTitleAc(todoId,taskId,title)
        dispatchTask(action)
    }

    let removeTask = (id: string, todoId: string) => {
        let action=removeTaskAc(todoId, id)
        dispatchTask(action)
    }

    let addTask = (title: string, todoId: string) => {
        let action=addTaskAc(title,todoId);
        dispatchTask(action)
    }
    let changeStatus = (id: string, todoId: string) => {
        let action=changeTaskAc(id,todoId);
        dispatchTask(action)
    }

    return (
        <div className="App">
            <Menu
                triggerSubMenuAction={'hover'}
                selectable={false}
                style={{fontSize: '35px', fontWeight: '700', color: '#fff', height: '70px', alignItems: 'center'}}
                mode="horizontal"
                theme={"dark"}
                items={items}/>;
            <InputElement add={addTodo}/>
            <div className={'todos'}>
                {
                    todolists.map((tl) => {
                        let todos = tasks[tl.id];

                        if (tl.filter === 'Completed') {
                            todos = todos.filter((t) => t.isDone === true)
                        }
                        if (tl.filter === 'Active') {
                            todos = todos.filter((t) => t.isDone === false)
                        }
                        return <Card className={'cart'} hoverable={true}>
                            <Todolist
                                changeTitleTodo={changeTitleTodo}
                                changTaskTitle={changTaskTitle}
                                removeTodo={removeTodo}
                                key={tl.id}
                                id={tl.id}
                                filter={tl.filter}
                                changeStatus={changeStatus}
                                addTask={addTask}
                                changeFilter={changeFilter}
                                removeTask={removeTask}
                                tasks={todos}
                                title={tl.title}/>
                        </Card>
                    })
                }
            </div>
        </div>
    );
}
export default AppWithReducer;
