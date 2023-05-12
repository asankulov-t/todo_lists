import React, {ChangeEvent, useState} from 'react';

export type EditType = {
    title: string
}


const EditableSpan = (props: EditType) => {
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
    }
    return (
        <div >
            {editMode ? <input
                                onChange={onChangeTitleHandler}
                                onBlur={viewModeActivate}
                                autoFocus
                                type="text"
                                value={title}/> :
                <span  onDoubleClick={activeMode}>{title}</span>}
        </div>
    );
};

export default EditableSpan;