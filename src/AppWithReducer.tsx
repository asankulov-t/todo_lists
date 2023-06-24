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
} from "./state/TodoList-reducer";

import {addTaskAc, changeTaskAc, changeTaskTitleAc, removeTaskAc, tasksReducer} from "./state/Tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


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

    const dispatch=useDispatch();
    const todoLists=useSelector<AppRootState, Array<TodoListType>>(state=>state.todoLists);
    const tasks=useSelector<AppRootState, TasksStateType>(state=>state.tasks);


    let changeTitleTodo = (todoId: string, title: string) => {
        let action=changeTitleAc(todoId, title)
        dispatch(action)
    }
    let removeTodo = (id: string) => {
        let action=removeTdAc(id)
        dispatch(action)
    }
    let addTodo = (title: string) => {
        let action=addTodoAc(title);
        dispatch(action)
    }
    let changeFilter = (todoId: string, value: FilterType) => {
        let action=changeFilterAc(todoId,value)
       dispatch(action)
    }

    let changTaskTitle = (todoId: string, taskId: string, title: string) => {
        let action=changeTaskTitleAc(todoId,taskId,title)
        dispatch(action)
    }

    let removeTask = (id: string, todoId: string) => {
        let action=removeTaskAc(todoId, id)
        dispatch(action)
    }

    let addTask = (title: string, todoId: string) => {
        let action=addTaskAc(title,todoId);
        dispatch(action)
    }
    let changeStatus = (id: string, todoId: string) => {
        let action=changeTaskAc(id,todoId);
        dispatch(action)
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
                    todoLists.map((tl) => {
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
