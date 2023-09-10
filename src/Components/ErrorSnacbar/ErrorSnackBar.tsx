import {Alert, Space} from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {setStatusAc} from "../../state/api_status";

const ErrorSnackBar = () => {
    let status=useSelector<AppRootState>(state => state.apiStatusReducer.errors)
    console.log(status)
    let dispatch=useDispatch()
    let closeItem=()=>{
        dispatch(setStatusAc(null,"succeess"))
    }
    return (
        status!==null?
        <Space direction="vertical" style={{ width: '35%', textAlign:'center',margin:'0 auto'}}>
            <Alert
                message={status+''}
                description="This is an error message about copywriting."
                type="error"
                onClose={()=>closeItem()}
                closable={true}
            />
        </Space>:null
    )
};

export default ErrorSnackBar;