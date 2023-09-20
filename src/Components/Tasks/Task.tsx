import React from 'react';
import {Checkbox} from "antd";
import EditableSpan from "../EditableSpan/EditableSpan";
import {DeleteOutlined} from "@ant-design/icons/lib";
import {changeStatusTh, deleteTaskTh} from "../../state/Tasks-reducer";
import {useDispatch} from "react-redux";
import style from './Task.module.css'
import {TaskStatuses} from "../../Api/Api";
export type taskType = {
    title:string
    taskId:string,
    tdId: string,
    isDone: TaskStatuses,

}


const Task = React.memo((props:taskType) => {
    const dispatch = useDispatch();
    const onRemoveHandler = () => {
        let param={
            todoId:props.tdId,
            taskId:props.taskId
        }
        // @ts-ignore
        dispatch(deleteTaskTh(param))
        }

    const changeCheck = () => {
        // @ts-ignore
        dispatch(changeStatusTh(props.tdId,{status:props.isDone===2?0:2}, props.taskId))
    }
    const changeTitleTask = (id:string,title: string) => {
        // @ts-ignore
        dispatch(changeStatusTh(props.tdId,{title:title}, id))
    }
    return <li key={props.taskId} className={props.isDone ? style.is_done : ''}>
        <div className={style.list}>
            <Checkbox className={style.check_icon}
                      checked={props.isDone === 2}
                      onChange={changeCheck}>
            </Checkbox>
            <div className={style.titleAndTresh}>
                <div>
                    <EditableSpan title={props.title}
                                  id={props.taskId}
                                  onChange={changeTitleTask}/>
                </div>
                <div >
                    {/*<EditOutlined onChange={changeTitleTask}/>*/}
                    <DeleteOutlined className={style.treshs_icon}
                                    onClick={onRemoveHandler}/>
                </div>
            </div>
        </div>

    </li>
})

export default Task;


