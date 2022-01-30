import React, { memo } from 'react';
import { Form, Input } from 'antd-mobile';

export default memo(function Login() {
    return <div>
        <Form.Item
            name='姓名'
            label='姓名'
            rules={[{ required: true, message: '姓名不能为空' }]}
        >
            <Input onChange={console.log} placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item name='address' label='地址'>
            <TextArea placeholder='请输入地址' maxLength={100} rows={4} />
        </Form.Item>
    </div>;
});
