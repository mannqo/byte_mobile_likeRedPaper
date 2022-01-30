import { Form, Input,NavBar } from 'antd-mobile';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

export default memo(function EditPage() {
    const history = useHistory();
    const back = () => {
        history.go(-1);
    }
    return (
        <>
            <NavBar onBack={back} > 编辑资料 </NavBar>

            <Form>
                <Form.Item label='昵称'> <Input /> </Form.Item>
                <Form.Item label='自我介绍'> <Input /> </Form.Item>
                <Form.Item label='moreDetail'> <Input /> </Form.Item>
            </Form>
        </>

    );
});
