import React, {useCallback, useEffect} from "react";
import style from './Todolist.module.css'
import InputElement from "../Input/InputElement";
import EditableSpan from "../EditableSpan/EditableSpan";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";

import {
   addTaskTh,
} from "../../state/Tasks-reducer";

import {
    addTodoListTh,
    changeTodoTitleTh,
    deleteTodoTh, fetchDataTodoTh,
    TodoListEntityType
} from "../../state/TodoList-reducer";
import Tasks from "../Tasks/Tasks";
import {Card} from "antd";
import {Navigate} from "react-router-dom";



const Todolist = React.memo(() => {
    const dispatch = useDispatch();
    let loginStatus=useSelector<AppRootState>(state => state.login.isLoggin)

    useEffect(() => {
        // @ts-ignore
        if (loginStatus===true){
            // @ts-ignore
            dispatch(fetchDataTodoTh())
        }
    }, [dispatch, loginStatus])
    const todoLists = useSelector<AppRootState, Array<TodoListEntityType>>(state => state.todoLists);
    const localAddFunc = useCallback((id:string,title: string) => {
        // @ts-ignore
        dispatch(addTaskTh(id,title))
    }, [dispatch])

    let addTodo = useCallback((id:string,title: string) => {
        // @ts-ignore
        dispatch(addTodoListTh(title))
    }, [dispatch])

    const changeTodoTitleHendler = useCallback((id:string,title: string) => {
        // @ts-ignore
        dispatch(changeTodoTitleTh(id, title))
    }, [dispatch])

    let removeTodo = useCallback((id: string) => {
        // @ts-ignore
        dispatch(deleteTodoTh(id))
    }, [dispatch])
    if (!loginStatus){
        return <Navigate to={'/login'}/>
    }
    return (
        <div >
            <InputElement add={addTodo} id={'sd'}/>
            <div className="todos">
                {todoLists.map((td) => {
                    return (
                        <div key={td.id} className={style.card}>
                            <Card hoverable>
                                <h3><EditableSpan title={td.title} id={td.id}
                                                  onChange={changeTodoTitleHendler}/>
                                    <DeleteOutlined onClick={() => removeTodo(td.id)}>
                                    </DeleteOutlined>
                                </h3>
                                <div>
                                    <InputElement add={localAddFunc} id={td.id}/>
                                </div>
                                <Tasks id={td.id}/>
                            </Card>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
})

export default Todolist;
