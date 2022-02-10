import React, { memo, useState } from 'react';
import { Form, Input, Button, Toast, SpinLoading } from 'antd-mobile';
import styled from 'styled-components';
import { login, register } from '../../services/login';
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';




export default memo(function Login() {
    const history = useHistory();
    const [loading, setLoading] = useState('none');
    if (cookie.load('userInfo')) history.push('/tabbar');

    const onFinish = async (user) => { 
        setLoading('true');
        const { username, password, affirmPassword } = user;
        if (password !== affirmPassword) {
            Toast.show({
                content: '两次密码输入不一致'
            })
        } else {
            try {
                const res = await register({ username, password });
                setLoading('none')
                Toast.show({
                    content: res.msg,
                    afterClose: async () => { 
                        history.replace('/#/login');
                    },
                })
            } catch (err) {
                Toast.show(err.message);
            }
        }
    }

    return (
        <LoginWrapper>
            <h3 className='title'>欢迎来到小日常~</h3>
            <SpinLoading className='loading' color='primary' style={{ display: loading }} />
            <Form
                className='form'
                onFinish={onFinish}
                footer={
                    <>
                        <Button block type='submit' color='primary' size='large'>
                            提交
                        </Button>
                    </>
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
                <Form.Item
                    name='affirmPassword'
                    label='确认密码'
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
    .loading {
        position: absolute;
        top: 42%;
        left: 46%;
    }
    .adm-form-footer {
        padding-top: 0;
    }
    .form {
        margin-top: 220px;
    }
    .register {
        float: right;
    }
`