import React, { memo, useEffect } from 'react';
import { Form, Input, Button, Toast } from 'antd-mobile';
import styled from 'styled-components';
import { checkStatus, login } from '../../services/login';
import { useHistory } from 'react-router-dom';
import { getFullUserInfo } from '../../services/users';
import cookie from 'react-cookies';




export default memo(function Login() {
    const history = useHistory();
    if (cookie.load('userInfo')) history.push('/tabbar');

    const onFinish = async (user) => {
        const { username } = user;
        try {
            const res = await login(user);
            Toast.show({
                content: res.msg,
                afterClose: async () => {
                    const userInfo = await getFullUserInfo({ userId: res.userId });
                    cookie.save('userInfo', userInfo.user);
                    history.push('/tabbar');
                },
            })
        } catch (err) {
            Toast.show(err.message);
            if (err.status === 406) {
                const userInfo = await getFullUserInfo({ userId: err.res.userId });
                cookie.save('userInfo', userInfo.user);
                history.push('/tabbar');
            }
        }

    }
    return (
        <LoginWrapper>
            <h3 className='title'>欢迎来到小日常~</h3>
            <Form
                className='form'
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Item
                    name='username'
                    label='用户名'
                    rules={[{ required: true, message: '姓名不能为空' }]}
                >
                    <Input placeholder='请输入用户名' clearable />
                </Form.Item>
                <Form.Item
                    name='password'
                    label='密码'
                    rules={[{ required: true, message: '密码不能为空' }]}
                >
                    <Input placeholder='请输入密码' value='' clearable type='password' />
                </Form.Item>
            </Form>
        </LoginWrapper>
    );
});

const LoginWrapper = styled.div`
    .title {
        position: absolute;
        top: 100px;
        font-size: 40px;
        text-align: center;
    }
    .form {
        margin-top: 220px;
    }
`