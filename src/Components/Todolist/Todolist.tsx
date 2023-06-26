import React, {useCallback} from "react";
import style from './Todolist.module.css'
import InputElement from "../Input/InputElement";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, Checkbox, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {FilterType, TasksStateType, TasksType} from "../../AppWithReducer";
import {addTaskAc, changeTaskAc, changeTaskTitleAc, removeTaskAc} from "../../state/Tasks-reducer";

type PropsType = {
    changeTitleTodo: (todoId: string, title: string) => void,
    removeTodo: (id: string) => void,
    id: string,
    filter: FilterType
    changeFilter: (todoId: string, value: FilterType) => void,
    title: string,
}

const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[props.id]);
    const localAddFunc = useCallback((title: string) => {
        dispatch(addTaskAc(title, props.id))
    }, [])
    const changeTodoTitleHendler = useCallback((title: string) => {
        props.changeTitleTodo(props.id, title)
    }, [])
    return (
        <div className={style.card}>
            <h3><EditableSpan title={props.title} onChange={changeTodoTitleHendler}/>
                <DeleteOutlined onClick={() => props.removeTodo(props.id)}></DeleteOutlined>
            </h3>
            <div>
                <InputElement add={localAddFunc}/>
            </div>
            <ul>
                {tasks ? tasks.map((item) => {
                    const onRemoveHandler = () => {
                        dispatch(removeTaskAc(props.id, item.id))
                    }
                    const changeCheck = () => {
                        dispatch(changeTaskAc(item.id, props.id))
                    }
                    const changeTitleTask = (title: string) => {
                        dispatch(changeTaskTitleAc(props.id, item.id, title))
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
                            <EditOutlined/>
                            <DeleteOutlined className={style.treshs_icon} onClick={onRemoveHandler}/>
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
})

export default Todolist;