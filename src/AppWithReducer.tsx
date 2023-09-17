import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from './Components/Todolist/Todolist';
import {Card, Menu, MenuProps, Progress, Space} from 'antd';
import {LoginOutlined} from '@ant-design/icons';

import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {taskType} from "./state/Tasks-reducer";
import ErrorSnackBar from "./Components/ErrorSnacbar/ErrorSnackBar";
import Login from "./Login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./Components/Nav/NavBar";

export type TasksStateType = {
    [key: string]: Array<taskType>
}

//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
function AppWithReducer() {

    let status=useSelector<AppRootState>(state => state.apiStatusReducer.status)
    let loginStatus=useSelector<AppRootState>(state => state.login.isLoggin)



    return <div className="App">
                 <NavBar/>
                 {status==='loading'&&<Progress format={()=>''} percent={100} status="exception"
                                                strokeColor={{ from: '#108ee9', to: '#7e1ab0' }} />}

                  <Routes>
                      <Route path={'/login'} element={<Login/>}/>
                       <Route path={'/'} element={  <Todolist/>}/>
                  </Routes>
                  <ErrorSnackBar/>

    </div>

}

export default AppWithReducer;
