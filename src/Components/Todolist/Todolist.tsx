import React, {useCallback, useState} from "react";
import style from './Todolist.module.css'
import InputElement from "../Input/InputElement";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, Checkbox, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";

import {
    addTaskAc,
    changeTaskAc,
    changeTaskTitleAc,
    removeTaskAc,
    taskType
} from "../../state/Tasks-reducer";

import Task from "../Tasks/Task";

type PropsType = {
    changeTitleTodo: (todoId: string, title: string) => void,
    removeTodo: (id: string) => void,
    id: string,
    title: string,
}
export type FilterType = "All" | "Active" | "Completed"

const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<taskType>>(state => state.tasks[props.id]);
    let [filter,SetFilter]=useState<FilterType>("All")
    let filteredTask = tasks;

    if (filter === 'Active') {
        filteredTask = tasks.filter(t => t.completed == false)
    }
    if (filter === 'Completed') {
        filteredTask = tasks.filter(t => t.completed === true)
    }

    const localAddFunc = useCallback((title: string) => {
        dispatch(addTaskAc(title, props.id))
    }, [dispatch, addTaskAc, props.id])
    const changeTodoTitleHendler = useCallback((title: string) => {
        props.changeTitleTodo(props.id, title)
    }, [dispatch, props.changeTitleTodo, props.id])
    // const localChangeFilFunc = useCallback((filter: FilterType,todoId:string,taskID:string) => {
    //     let act = filterTasksAC(filter,todoId,taskID);
    //     dispatch(act)
    // }, [props.id, filter, dispatch])

    return (
        <div className={style.card}>
            <h3><EditableSpan title={props.title} onChange={changeTodoTitleHendler}/>
                <DeleteOutlined onClick={() => props.removeTodo(props.id)}></DeleteOutlined>
            </h3>
            <div>
                <InputElement add={localAddFunc}/>
            </div>
            <ul>
                {filteredTask ? filteredTask.map((item) => {
                    return <Task title={item.title} taskId={item.id} tdId={props.id} isDone={item.completed}/>
                }) : ''}

            </ul>
            <div className={style.btns}>
                <Space wrap>
                    <Button onClick={() => SetFilter( 'All')}
                            type={filter === "All" ? "primary" : "default"}>All</Button>
                    <Button onClick={() => SetFilter( 'Active')}
                            type={filter === "Active" ? "primary" : "default"}>Active</Button>
                    <Button onClick={() => SetFilter('Completed')}
                            type={filter === "Completed" ? "primary" : "default"}>Completed</Button>
                </Space>
            </div>
        </div>
    )
})

export default Todolist;