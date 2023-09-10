import { Alert } from 'antd';
import React from 'react';

const ErrorSnackBar = () => {
    return (
        <div>
            <Alert
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
            />
        </div>
    );
};

export default ErrorSnackBar;