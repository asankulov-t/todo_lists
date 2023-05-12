import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import {FilterType, TasksType} from "../../App";
import style from './Todolist.module.css'
import InputElement from "../Input/InputElement";

type PropsType = {
    removeTodo:(id:string)=>void,
    id:string,
    filter:FilterType
    changeStatus:(id:string,todoId:string)=>void
    addTask:(title:string,todoId:string)=>void
    removeTask:(id:string,todoId:string)=>void,
    changeFilter:(todoId:string,value:FilterType)=>void,
    title: string,
    tasks: Array<TasksType>
}

function Todolist(props: PropsType) {



    const localAddFunc=(title:string)=>{
            props.addTask(title.trim(),props.id)
    }

    return (
        <div className={style.card}>
            <h3>{props.title} <button onClick={()=>props.removeTodo(props.id)}>X</button></h3>
            <div>
                <InputElement add={localAddFunc}/>
            </div>
            <ul>
                {props.tasks.map((item) => {
                    const onRemoveHandler=()=>{
                        props.removeTask(item.id,props.id)
                    }
                    const changeCheck=()=>{
                        props.changeStatus(item.id, props.id)
                    }
                    return <li key={item.id} className={item.isDone?style.is_done:''}>
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
            <div className={style.btns}>
                <button className={props.filter==='All'?style.active_btn:style.btn}
                        onClick={()=>props.changeFilter(props.id,'All')}>All</button>
                <button className={props.filter==='Active'?style.active_btn:style.btn}
                        onClick={()=>props.changeFilter(props.id,'Active')}>Active</button>
                <button className={props.filter==='Completed'?style.active_btn:style.btn}
                        onClick={()=>props.changeFilter(props.id,'Completed')}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;