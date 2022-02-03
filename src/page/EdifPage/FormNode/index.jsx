import { Form, Input, TextArea, Button } from 'antd-mobile';
import React, { memo } from 'react';



export default memo(function FormNode(props) {
    const { form,send, tipText, type, cancel } = props;

    const footer = (
        <div className='btn-wrap'>
            <Button className='btn' color='primary' type='submit'>确定</Button>
            <Button className='btn cancel-btn' color='default' onClick={cancel}>取消</Button>
        </div>
    )

    return (
        <Form
            className='form-wrap'
            form={form}
            footer={footer}
            onFinish={(value) => send(value)}
        >
            {
                type == 'nickname' ?
                    (
                        <Form.Item
                            name={type}
                            help={'字符在2~20个'}>
                            <Input className='form-ipt' minLength={2} maxLength={20} placeholder={tipText}></Input>
                        </Form.Item>
                    ) :
                    (
                        <Form.Item
                            name={type}
                        >
                            <TextArea
                                placeholder='编辑简介'
                                showCount
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                maxLength={100}
                            />
                        </Form.Item>
                    )
            }
        </Form>
    );
});
