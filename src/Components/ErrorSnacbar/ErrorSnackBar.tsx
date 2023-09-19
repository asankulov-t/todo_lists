import {Alert, Space} from 'antd';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {setStatusAc} from "../../state/api_status";
//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
const ErrorSnackBar = () => {
    let error = useSelector<AppRootState>(state => state.apiStatusReducer.errors)
    let status = useSelector<AppRootState>(state => state.apiStatusReducer.status)
    let dispatch = useDispatch()
    let closeItem = () => {
        dispatch(setStatusAc({error: null, status: "succeess"}))
    }
    return (
        status === 'failed' ?
            <Space direction="vertical" style={{width: '35%', textAlign: 'center', margin: '0 auto'}}>
                <Alert
                    message={status + ''}
                    description={error + ""}
                    type="error"
                    onClose={() => closeItem()}
                    closable={true}
                />
            </Space> : null
    )
};
export default ErrorSnackBar;