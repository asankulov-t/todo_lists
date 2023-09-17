import React, {useEffect} from 'react';
import {Button, Card, Checkbox, Form, Input} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {LoginFetchTh} from "../state/LoginReducer";
import {loginType} from "../Api/Api";
import {AppRootState} from "../state/store";
import {Navigate, redirect} from "react-router-dom";




type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};


const Login = () => {
    let isLogin=useSelector<AppRootState, boolean>(state => state.login.isLoggin)



    let dis=useDispatch()
    console.log(isLogin)
    const onFinish = (values: loginType) => {
        console.log(values)
        // @ts-ignore
        dis(LoginFetchTh(values))
    };

    if (isLogin){
        return  <Navigate to={'/'}/>
    }


    return (<Card>
            <h3>Авторизация</h3>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{email:'asankulov.t@mail.ru',password:'011235813.ttt', rememberMe: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="rememberMe"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;