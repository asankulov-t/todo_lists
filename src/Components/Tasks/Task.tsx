import React from 'react';
import {Checkbox} from "antd";
import EditableSpan from "../EditableSpan/EditableSpan";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons/lib";
import {changeTaskAc, changeTaskTitleAc, deleteTaskTh, removeTaskAc} from "../../state/Tasks-reducer";
import {useDispatch} from "react-redux";
import style from './Task.module.css'
import {TaskStatuses, TODOLISTAPI} from "../../Api/Api";
export type taskType = {
    title:string
    taskId:string,
    tdId: string,
    isDone: TaskStatuses,

}


const Task = React.memo((props:taskType) => {
    const dispatch = useDispatch();
    const onRemoveHandler = () => {
        // @ts-ignore
        dispatch(deleteTaskTh(props.tdId,props.taskId))
        }

    const changeCheck = () => {
        dispatch(changeTaskAc(props.taskId, props.tdId))
    }
    const changeTitleTask = (title: string) => {
        dispatch(changeTaskTitleAc(props.tdId, props.taskId, title))
    }
    return <li key={props.taskId} className={props.isDone ? style.is_done : ''}>
        <div className={style.list}>
            <Checkbox className={style.check_icon}
                      checked={props.isDone==2?true:false}
                      onChange={changeCheck}>
            </Checkbox>
            <div className={style.titleAndTresh}>
                <div>
                    <EditableSpan title={props.title}
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


