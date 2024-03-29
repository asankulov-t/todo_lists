import {Button, Input} from 'antd';
import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import style from './InputElementStyle.module.css'

export type inputType = {
    add: (id: string, title: string) => void,
    id?: string
}

const InputElement = React.memo((props: inputType) => {
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<boolean>(false)

    let changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let addFunc = () => {
        if (title !== '') {
            props.add(props.id ? props.id : '', title.trim())
            setTitle('')
            setError(false)
        } else {
            setError(true)
        }
    }

    let enterBtn = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addFunc()
            setTitle('')
        }
    }

    return <div>
        <div className={style.inputBlock}>
            <Input
                status={error ? "error" : ''}
                placeholder="Write something"
                size="large"
                value={title}
                onChange={changeInput}
                onKeyPress={enterBtn}
                type={"text"}
            />
            <Button ghost onClick={() => addFunc()}>+</Button>

        </div>
        <p className={style.error}>{error ? 'Field is Empty' : ''}</p>
    </div>

})

export default InputElement;