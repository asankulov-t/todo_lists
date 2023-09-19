import React from 'react';
import './App.css';
import Todolist from './Components/Todolist/Todolist';
import {Progress} from 'antd';
import {AppRootState} from "./state/store";
import {taskType} from "./state/Tasks-reducer";
import ErrorSnackBar from "./Components/ErrorSnacbar/ErrorSnackBar";
import Login from "./Login/Login";
import {Route, Routes} from "react-router-dom";
import NavBar from "./Components/Nav/NavBar";
import {useSelector} from "react-redux";

export type TasksStateType = {
    [key: string]: Array<taskType>
}
//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
function AppWithReducer() {
    let status = useSelector<AppRootState>(state => state.apiStatusReducer.status)
    return <div className="App">
        <NavBar/>
        {status === 'loading' && <Progress format={() => ''}
                                           percent={100}
                                           status="exception"
                                           strokeColor={{from: '#108ee9', to: '#7e1ab0'}}/>}
        <Routes>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/'} element={<Todolist/>}/>
        </Routes>
        <ErrorSnackBar/>
    </div>
}

export default AppWithReducer;
