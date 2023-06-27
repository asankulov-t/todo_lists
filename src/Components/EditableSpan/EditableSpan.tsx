import React, {ChangeEvent, useCallback, useState} from 'react';
import style from './EditableSpan.module.css'
import {Input} from "antd";
export type EditType = {
    title: string,
    onChange:(title:string)=>void
}


const EditableSpan = React.memo((props: EditType) => {
    let [editMode, setEditMode]=useState(false)
    let [title, setTitle]=useState(props.title?props.title:'')
    console.log('editable component')
    const onChangeTitleHandler=useCallback((e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    },[])
    const activeMode=()=>{
        setEditMode(true)
    }
    const viewModeActivate=useCallback(()=>{
        setEditMode(false)
        props.onChange(title)
    },[props.onChange])
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