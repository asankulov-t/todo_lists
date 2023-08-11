import React, {useCallback, useEffect, useReducer, useState} from 'react';
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
import { authFunc} from "./Api/Api";

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
    let [res,setRes]=useState<any>()

    useEffect(()=>{
        authFunc().then(r=>setRes(r))
    },[])
    console.log(res)
    const items: MenuProps['items'] = [
        {
            label: 'LOGIN',
            key: 'Login',
            icon: <LoginOutlined className={'icon'}/>,
        }
    ]
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists);
    console.log(todoLists)
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

    return (
        <div className="App">
            <Menu
                className={'header'}
                triggerSubMenuAction={'hover'}
                selectable={false}
                style={{
                    fontSize: '35px', fontWeight: '700', color: '#ffffff', height: '70px',
                    alignItems: 'center'
                }}
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
                                title={tl.title}/>
                        </Card>
                    })
                }
            </div>
        </div>
    );
}

export default AppWithReducer;
