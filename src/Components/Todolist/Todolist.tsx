import React, {useCallback} from "react";
import style from './Todolist.module.css'
import InputElement from "../Input/InputElement";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, Checkbox, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {FilterType, TasksType} from "../../AppWithReducer";
import {addTaskAc, changeTaskAc, changeTaskTitleAc, removeTaskAc} from "../../state/Tasks-reducer";
import {changeFilterAc} from "../../state/TodoList-reducer";
import Task from "../Tasks/Task";

type PropsType = {
    changeTitleTodo: (todoId: string, title: string) => void,
    removeTodo: (id: string) => void,
    id: string,
    filter: FilterType
    title: string,
}

const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[props.id]);

    let filteredTask = tasks;

    if (props.filter === 'Active') {
        filteredTask = tasks.filter(t => t.isDone == false)
    }
    if (props.filter === 'Completed') {
        filteredTask = tasks.filter(t => t.isDone === true)
    }

    const localAddFunc = useCallback((title: string) => {
        dispatch(addTaskAc(title, props.id))
    }, [dispatch, addTaskAc, props.id])
    const changeTodoTitleHendler = useCallback((title: string) => {
        props.changeTitleTodo(props.id, title)
    }, [dispatch, props.changeTitleTodo, props.id])
    const localChangeFilFunc = useCallback((id: string, value: FilterType) => {
        let act = changeFilterAc(id, value);
        dispatch(act)
    }, [props.id, props.filter, dispatch])

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
                    return <Task title={item.title} taskId={item.id} tdId={props.id} isDone={item.isDone}/>
                }) : ''}

            </ul>
            <div className={style.btns}>
                <Space wrap>
                    <Button onClick={() => localChangeFilFunc(props.id, 'All')}
                            type={props.filter === "All" ? "primary" : "default"}>All</Button>
                    <Button onClick={() => localChangeFilFunc(props.id, 'Active')}
                            type={props.filter === "Active" ? "primary" : "default"}>Active</Button>
                    <Button onClick={() => localChangeFilFunc(props.id, 'Completed')}
                            type={props.filter === "Completed" ? "primary" : "default"}>Completed</Button>
                </Space>
            </div>
        </div>
    )
})

export default Todolist;