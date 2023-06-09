import React, {useCallback, useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import Todolist from './Components/Todolist/Todolist';
import InputElement from "./Components/Input/InputElement";
import {Card, Menu, MenuProps} from 'antd';
import {LoginOutlined} from '@ant-design/icons';
import {
    addTodoAc,
    changeFilterAc,
    changeTitleAc,
    removeTdAc,
} from "./state/TodoList-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

//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
//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
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
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists);
    let changeTitleTodo = useCallback((todoId: string, title: string) => {
        let action = changeTitleAc(todoId, title)
        dispatch(action)
    }, [dispatch])
    let removeTodo = useCallback((id: string) => {
        let action = removeTdAc(id)
        dispatch(action)
    }, [dispatch])
    let addTodo = useCallback((title: string) => {
        let action = addTodoAc(title);
        dispatch(action)
    }, [dispatch])
    let changeFilter = useCallback((todoId: string, value: FilterType) => {
        let action = changeFilterAc(todoId, value)
        dispatch(action)
    }, [dispatch])
    return (
        <div className="App">
            <Menu
                className={'header'}
                triggerSubMenuAction={'hover'}
                selectable={false}
                style={{fontSize: '35px', fontWeight: '700', color: '#ffffff', height: '70px',
                        alignItems: 'center'}}
                mode="horizontal"
                theme={"dark"}
                items={items}/>
            <InputElement add={addTodo}/>
            <div className={'todos'}>
                {
                    todoLists.map((tl) => {
                        return <Card className={'cart'} hoverable={true}>
                            <Todolist
                                changeTitleTodo={changeTitleTodo}
                                removeTodo={removeTodo}
                                key={tl.id}
                                id={tl.id}
                                filter={tl.filter}
                                changeFilter={changeFilter}
                                title={tl.title}/>
                        </Card>
                    })
                }
            </div>
        </div>
    );
}

export default AppWithReducer;
