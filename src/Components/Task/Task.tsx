import React, {useCallback} from 'react';
import {changeTaskAc, changeTaskTitleAc, removeTaskAc} from "../../state/Tasks-reducer";
import {useDispatch} from "react-redux";
import style from "./Task.module.css";
import {Checkbox} from "antd";
import EditableSpan from "../EditableSpan/EditableSpan";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


export type TaskType={
    todoId:string,
    taskId:string,
    isDone:boolean,
    title:string
}

const Task = React.memo((props:TaskType) => {
    const dispatch = useDispatch();

    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskAc(props.todoId, props.taskId))
    },[props.todoId, props.taskId])
    const changeCheck =useCallback( () => {
        dispatch(changeTaskAc(props.taskId, props.todoId))
    },[props.taskId, props.todoId])
    const changeTitleTask = useCallback((title: string) => {
        dispatch(changeTaskTitleAc(props.todoId, props.taskId, title))
    },[props.todoId, props.taskId])
    return <li key={props.taskId} className={props.isDone ? style.is_done : ''}>
        <div className={style.list}>
            <Checkbox className={style.check_icon}
                      checked={props.isDone}
                      onChange={changeCheck}>
            </Checkbox>
            <EditableSpan title={props.title}
                          onChange={changeTitleTask}/>
        </div>
        <div>
            <EditOutlined/>
            <DeleteOutlined className={style.treshs_icon}
                            onClick={onRemoveHandler}/>
        </div>
    </li>
})

export default Task;