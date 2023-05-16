import React from "react";
import {FilterType, TasksType} from "../../App";
import style from './Todolist.module.css'
import InputElement from "../Input/InputElement";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, Checkbox, Space} from "antd";
import {CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

type PropsType = {
    changeTitleTodo: (todoId: string, title: string) => void,
    removeTodo: (id: string) => void,
    changTaskTitle: (todoID: string, taskId: string, title: string) => void,
    id: string,
    filter: FilterType
    changeStatus: (id: string, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    removeTask: (id: string, todoId: string) => void,
    changeFilter: (todoId: string, value: FilterType) => void,
    title: string,
    tasks: Array<TasksType>
}

function Todolist(props: PropsType) {


    const localAddFunc = (title: string) => {
        props.addTask(title.trim(), props.id)
    }

    const changeTodoTitleHendler = (title: string) => {
        props.changeTitleTodo(props.id, title)
    }


    return (
        <div className={style.card}>
            <h3><EditableSpan title={props.title} onChange={changeTodoTitleHendler}/>
                <DeleteOutlined onClick={() => props.removeTodo(props.id)}></DeleteOutlined>
            </h3>
            <div>
                <InputElement add={localAddFunc}/>
            </div>
            <ul>
                {props.tasks ? props.tasks.map((item) => {
                    const onRemoveHandler = () => {
                        props.removeTask(item.id, props.id)
                    }
                    const changeCheck = () => {
                        props.changeStatus(item.id, props.id)
                    }
                    const changeTitleTask = (title: string) => {
                        props.changTaskTitle(props.id, item.id, title)
                    }
                    return <li key={item.id} className={item.isDone ? style.is_done : ''}>
                        <div className={style.list}>
                            <Checkbox className={style.check_icon}
                                      checked={item.isDone}
                                      onChange={changeCheck}>
                            </Checkbox>
                            <EditableSpan title={item.title} onChange={changeTitleTask}/>
                        </div>
                        <div>
                            <EditOutlined />
                            <DeleteOutlined className={style.treshs_icon} onClick={onRemoveHandler} />
                        </div>
                    </li>
                }) : ''}

            </ul>
            <div className={style.btns}>
                <Space wrap>
                    <Button onClick={() => props.changeFilter(props.id, 'All')}
                            type={props.filter === "All" ? "primary" : "default"}>All</Button>
                    <Button onClick={() => props.changeFilter(props.id, 'Active')}
                            type={props.filter === "Active" ? "primary" : "default"}>Active</Button>
                    <Button onClick={() => props.changeFilter(props.id, 'Completed')}
                            type={props.filter === "Completed" ? "primary" : "default"}>Completed</Button>

                </Space>
            </div>
        </div>
    )
}

export default Todolist;