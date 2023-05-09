import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import {FilterType, TasksType} from "../../App";
import style from './Todolist.module.css'

type PropsType = {
    id:string,
    filter:FilterType
    changeStatus:(id:string)=>void
    addTask:(title:string)=>void
    removeTask:(id:string)=>void,
    changeFilter:(todoId:string,value:FilterType)=>void,
    title: string,
    tasks: Array<TasksType>
}

function Todolist(props: PropsType) {

    let [title, setTitle]=useState<string>("");
    let [error, setError]=useState<boolean>(false)
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const localAddFunc=()=>{
        if (title!==''){
            props.addTask(title.trim())
            setTitle('')
            setError(false)
        }else {
            setError(true)
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
                       className={error?style.error:''}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPress}
                       type="text"/>
                <button onClick={localAddFunc}>+</button>
                <p className={style.error}>{error?'Field is Empty':''}</p>
            </div>
            <ul>
                {props.tasks.map((item) => {
                    const onRemoveHandler=()=>{
                        props.removeTask(item.id)
                    }
                    const changeCheck=()=>{
                        props.changeStatus(item.id)
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