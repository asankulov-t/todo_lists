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
import Login from "./Login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export type TasksStateType = {
    [key: string]: Array<taskType>
}


function AppWithReducer() {

    let status=useSelector<AppRootState>(state => state.apiStatusReducer.status)
    let loginStatus=useSelector<AppRootState>(state => state.login.isLoggin)

    const items: MenuProps['items'] = [
        {
            label: loginStatus===true?'Logout':'Login',
            key: loginStatus===true?'Logout':'Login',
            icon: <LoginOutlined className={'icon'}/>,
        }
    ]
    return <div className="App">
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
                  <Routes>
                      <Route path={'/login'} element={<Login/>}/>
                       <Route path={'/'} element={  <Todolist/>}/>
                  </Routes>
                  <ErrorSnackBar/>

    </div>

}

export default AppWithReducer;
