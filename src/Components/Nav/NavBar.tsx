import React from 'react';
import {Menu, MenuProps} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {logoutTh} from "../../state/LoginReducer";
import {Link, Navigate} from "react-router-dom";

const NavBar = () => {
    let dispatch = useDispatch()
    let loginStatus = useSelector<AppRootState>(state => state.login.isLoggin)

    const items: MenuProps['items'] = [
        {
            label: loginStatus === true ? 'Logout' : 'Login',
            key: loginStatus === true ? 'Logout' : 'Login',

        }
    ]

    let logout = () => {
        // @ts-ignore
        if (loginStatus ===true) {
            // @ts-ignore
            dispatch(logoutTh())
            return <Navigate to={'/login'}/>
        }
    }

    return (
        <div>
            <Link onClick={() => logout()} to={loginStatus === false ? '/login' : '/'}>
                <Menu
                    className={'header'}
                    triggerSubMenuAction={'hover'}
                    selectable={false}
                    style={{
                        fontSize: '35px',
                        fontWeight: '700',
                        color: '#ffffff',
                        height: '70px',
                        alignItems: 'center'
                    }}
                    mode="horizontal"
                    theme={"dark"}
                    items={items}/>
            </Link>

        </div>
    );
};

export default NavBar;