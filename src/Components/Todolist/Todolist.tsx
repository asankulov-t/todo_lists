import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import {FilterType, TasksType} from "../../App";
import style from './Todolist.module.css'

type PropsType = {
    changeStatus:(id:string)=>void
    addTask:(title:string)=>void
    removeTask:(id:string)=>void,
    changeFilter:(value:FilterType)=>void,
    title: string,
    tasks: Array<TasksType>
}

function Todolist(props: PropsType) {

    let [title, setTitle]=useState<string>("");

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const localAddFunc=()=>{
        if (title!==''){
            props.addTask(title)
            setTitle('')
        }
    }
    const onKeyPress=(e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.charCode===13){
            localAddFunc()
            setTitle('')
        }
    }
    return (
        <div className={style.card}>
            <h3>{props.title}</h3>
            <div>
                <input
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPress}
                       type="text"/>
                <button onClick={localAddFunc}>+</button>
            </div>
            <ul>
                {props.tasks.map((item) => {
                    const onRemoveHandler=()=>{
                        props.removeTask(item.id)
                    }
                    const changeCheck=()=>{
                        props.changeStatus(item.id)
                    }
                    return <li key={item.id}>
                        <div>
                            <input type="checkbox"
                                   checked={item.isDone}
                                   onChange={changeCheck}
                            />
                            <span>{item.title}</span>
                        </div>
                            <button onClick={onRemoveHandler}>x</button>
                           </li>
                })}

            </ul>
            <button onClick={()=>props.changeFilter('All')}>All</button>
            <button onClick={()=>props.changeFilter('Active')}>Active</button>
            <button onClick={()=>props.changeFilter('Completed')}>Completed</button>
        </div>
    )
}

export default Todolist;