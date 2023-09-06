import React, {useCallback, useEffect, useState} from "react";
import style from './Todolist.module.css'
import InputElement from "../Input/InputElement";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, Checkbox, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";

import {
    addTaskAc, addTaskTh,
    changeTaskAc,
    changeTaskTitleAc, fetchDataTaskTh,
    removeTaskAc, setTasksAc,
    taskType
} from "../../state/Tasks-reducer";

import Task from "../Tasks/Task";
import {TODOLISTAPI} from "../../Api/Api";
import {deleteTodoTh} from "../../state/TodoList-reducer";

type PropsType = {
    changeTitleTodo: (todoId: string, title: string) => void,
    removeTodo: (id: string) => void,
    id: string,
    title: string,
}
export type FilterType = "All" | "Active" | "Completed"

const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchDataTaskTh(props.id))
    }, [])
    const tasks = useSelector<AppRootState, Array<taskType>>(state => state.tasks[props.id]);
    let [filter, SetFilter] = useState<FilterType>("All")
    let filteredTask = tasks;

    if (filter === 'Active') {
        filteredTask = tasks.filter(t => t.status! == 2)
    }
    if (filter === 'Completed') {
        filteredTask = tasks.filter(t => t.status === 2)
    }


    const localAddFunc = useCallback((title: string) => {
        // @ts-ignore
        dispatch(addTaskTh(props.id,title))
    }, [dispatch, addTaskAc, props.id])
    const changeTodoTitleHendler = useCallback((title: string) => {
        props.changeTitleTodo(props.id, title)
    }, [dispatch, props.changeTitleTodo, props.id])

    const deleteTodo=()=>{
        // @ts-ignore
        dispatch(deleteTodoTh(props.id))
    }

    return (
        <div className={style.card}>
            <h3><EditableSpan title={props.title} onChange={changeTodoTitleHendler}/>
                <DeleteOutlined onClick={deleteTodo}></DeleteOutlined>
            </h3>
            <div>
                <InputElement add={localAddFunc}/>
            </div>
            <ul>
                {filteredTask ? filteredTask.map((item) => {
                    return <Task title={item.title} taskId={item.id} tdId={props.id} isDone={item.status}/>
                }) : ''}

            </ul>
            <div className={style.btns}>
                <Space wrap>
                    <Button onClick={() => SetFilter('All')}
                            type={filter === "All" ? "primary" : "default"}>All</Button>
                    <Button onClick={() => SetFilter('Active')}
                            type={filter === "Active" ? "primary" : "default"}>Active</Button>
                    <Button onClick={() => SetFilter('Completed')}
                            type={filter === "Completed" ? "primary" : "default"}>Completed</Button>
                </Space>
            </div>
        </div>
    )
})

export default Todolist;