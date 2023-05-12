import React, {ChangeEvent, useState,KeyboardEvent} from 'react';
import style from './InputElementStyle.module.css'
export type inputType={
    add:(title:string)=>void
}

const InputElement = (props:inputType) => {
    let [title, setTitle]=useState<string>("");
    let [error, setError]=useState<boolean>(false)

    let changeInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }

    let addFunc=()=>{
        if (title!==''){
            props.add(title.trim())
            setTitle('')
            setError(false)
        }else {
            setError(true)
        }
    }

    let enterBtn=(e:KeyboardEvent<HTMLInputElement>)=>{
           if (e.charCode===13){
               addFunc()
               setTitle('')
           }
    }

    return <div>
        <div className={style.inputBlock}>
            <input
                className={error?style.error:""}
                value={title}
                onChange={changeInput}
                onKeyPress={enterBtn}
                type={"text"}
            />
            <button onClick={()=>addFunc()}>+</button>

        </div>
        <p className={style.error}>{error?'Field is Empty':''}</p>
    </div>

};

export default InputElement;