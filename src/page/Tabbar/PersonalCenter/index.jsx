import { Modal, NavBar, Space, Toast } from 'antd-mobile'
import React, { memo } from 'react'
import { UploadOutline, SendOutline } from 'antd-mobile-icons'
import PersonalPage from '../../../component/PersonalPage'
import cookie from 'react-cookies';
import { logout } from '../../../services/login';
import { useHistory } from 'react-router-dom';

export default memo(function PersonalCenter() {
    const history = useHistory();
    const { userId } = cookie.load('userInfo');
    const logOut = async () => {
        Modal.confirm({
            content: '确认登出吗',
            onConfirm: async () => {
                try {
                    const res = await logout({ userId });
                    console.log(res);
                    Toast.show({
                        icon: 'success',
                        content: '登出成功',
                    })
                    cookie.remove('userInfo');
                    history.push('/');
                } catch (err) {
                    Toast.show({
                        icon: 'loading',
                        content: '登出失败',
                    })
                }
            },
        })
    }
    const right = (
        <div style={{ fontSize: 20 }}>
            <Space >
                <SendOutline />
            </Space>
        </div>
    )
    const left = (
        <div style={{ fontSize: 20 }}>
            <Space>
                <UploadOutline onClick={logOut} />
            </Space>
        </div>
    )
    return (
        <div>
            <NavBar right={right} left={left} backArrow={false}></NavBar>
            <PersonalPage userId={userId} />
        </div>
    )
}) 