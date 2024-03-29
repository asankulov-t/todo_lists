import React, {ChangeEvent, useState} from 'react';
import style from './EditableSpan.module.css'
import {Input} from "antd";
export type EditType = {
    title: string,
    onChange:(id:string,title:string)=>void,
    id:string
}


const EditableSpan = React.memo((props: EditType) => {
    let [editMode, setEditMode]=useState(false)
    let [title, setTitle]=useState(props.title?props.title:'')

    const onChangeTitleHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const activeMode=()=>{
        setEditMode(true)
    }
    const viewModeActivate=()=>{
        setEditMode(false)
        props.onChange(props.id,title)
    }
    return (
        <div >
            {editMode ? <Input
                                onChange={onChangeTitleHandler}
                                onBlur={viewModeActivate}
                                autoFocus
                                type="text"
                                value={title}/> :
                <span className={style.span} onDoubleClick={activeMode}>{title}</span>}
        </div>
    );
})

export default EditableSpan;