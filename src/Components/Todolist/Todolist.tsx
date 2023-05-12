import React from "react";
import {FilterType, TasksType} from "../../App";
import style from './Todolist.module.css'
import InputElement from "../Input/InputElement";
import EditableSpan from "../EditableSpan/EditableSpan";

type PropsType = {
    changeTitleTodo:(todoId:string, title:string)=>void,
    removeTodo:(id:string)=>void,
    changTaskTitle:(todoID:string,taskId:string,title:string)=>void,
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

    const changeTodoTitleHendler=(title:string)=>{
            props.changeTitleTodo(props.id, title)
    }


    return (
        <div className={style.card}>
            <h3><EditableSpan title={props.title} onChange={changeTodoTitleHendler}/>
            <button onClick={()=>props.removeTodo(props.id)}>X</button></h3>
            <div>
                <InputElement add={localAddFunc}/>
            </div>
            <ul>
                {props.tasks?props.tasks.map((item) => {
                    const onRemoveHandler=()=>{
                        props.removeTask(item.id,props.id)
                    }
                    const changeCheck=()=>{
                        props.changeStatus(item.id, props.id)
                    }
                    const changeTitleTask=(title:string)=>{
                        props.changTaskTitle(props.id,item.id, title)
                    }
                    return <li key={item.id} className={item.isDone?style.is_done:''}>
                        <div className={style.list}>
                            <input type="checkbox"
                                   checked={item.isDone}
                                   onChange={changeCheck}
                            />
                            <EditableSpan title={item.title} onChange={changeTitleTask}/>
                        </div>
                            <button onClick={onRemoveHandler}>x</button>
                           </li>
                }):''}

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