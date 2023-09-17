import React, {useEffect, useState} from 'react';
import {fetchDataTaskTh, taskType} from "../../state/Tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import Task from "./Task";
import style from "../Todolist/Todolist.module.css";
import {Button, Space} from "antd";

type propsType={
    id:string
}
export type FilterType = "All" | "Active" | "Completed"

const Tasks = React.memo((props:propsType) => {
    const dispatch = useDispatch();
    let [filter, SetFilter] = useState<FilterType>("All")

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchDataTaskTh(props.id))
    }, [])


    const tasks = useSelector<AppRootState, Array<taskType>>(state => state.tasks[props.id]);
    let filteredTask = tasks;

    if (filter === 'Active') {
        filteredTask = tasks.filter(t => t.status! == 2)
    }
    if (filter === 'Completed') {
        filteredTask = tasks.filter(t => t.status === 2)
    }


    return (
        <div>
            <ul>
                {filteredTask&&filteredTask.map((ts)=><Task key={ts.id} title={ts.title} taskId={ts.id} tdId={props.id} isDone={ts.status}/>)}
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
    );
})

export default Tasks;