import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from './Components/Todolist/Todolist';
import InputElement from "./Components/Input/InputElement";
import {Card, Menu, MenuProps, Progress, Space} from 'antd';
import {LoginOutlined} from '@ant-design/icons';
import {
    addTodoListTh,
    changeTitleAc,
    fetchDataTodoTh,
    removeTdAc, TodoListEntityType,
} from "./state/TodoList-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {taskType} from "./state/Tasks-reducer";
import ErrorSnackBar from "./Components/ErrorSnacbar/ErrorSnackBar";

export type TasksStateType = {
    [key: string]: Array<taskType>
}


function AppWithReducer() {
    const dispatch = useDispatch();
    useEffect(() => {
       // @ts-ignore
        dispatch(fetchDataTodoTh())
    }, [])
    const items: MenuProps['items'] = [
        {
            label: 'LOGIN',
            key: 'Login',
            icon: <LoginOutlined className={'icon'}/>,
        }
    ]
    const todoLists = useSelector<AppRootState, Array<TodoListEntityType>>(state => state.todoLists);
    let status=useSelector<AppRootState>(state => state.apiStatusReducer.status)
    let changeTitleTodo = useCallback((todoId: string, title: string) => {
        let action = changeTitleAc(todoId, title)
        dispatch(action)
    }, [dispatch])
    let removeTodo = useCallback((id: string) => {
        let action = removeTdAc(id)
        dispatch(action)
    }, [dispatch])
    let addTodo = useCallback((title: string) => {
        // @ts-ignore
        dispatch(addTodoListTh(title))
    }, [dispatch])

    return (
        <div className="App">
            <Menu
                className={'header'}
                triggerSubMenuAction={'hover'}
                selectable={false}
                style={{
                    fontSize: '35px',
                    fontWeight: '700',
                    color: '#ffffff',
                    height: '70px',
                    alignItems: 'center'
                }}
                mode="horizontal"
                theme={"dark"}
                items={items}/>
            {status==='loading'&&<Progress format={()=>''} percent={100} status="exception" strokeColor={{ from: '#108ee9', to: '#7e1ab0' }} />}
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
                                title={tl.title}/>
                        </Card>
                    })
                }
            </div>
            <ErrorSnackBar/>

        </div>
    );
}

export default AppWithReducer;
