import React, { useState } from 'react'
import { Input } from 'antd-mobile'
import styled from 'styled-components'


const MessageItem = (props) => {
    const { sendMessage } = props;
    const [value, setValue] = useState('')
    // 提交消息
    const submitMessage = async (e) => {
        try {
            const { value } = e.target;
            sendMessage(value);
            setValue('');

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <InputWrapper>
            <Input
                placeholder='请输入内容'
                value={value}
                onChange={val => {
                    setValue(val)
                }}
                onEnterPress={submitMessage}
            />
        </InputWrapper>
    )
}
export default MessageItem;

const InputWrapper = styled.div`
    width: 91vw;
    padding: 0 10px;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    border: 10px solid #bf95e3;
    border-radius: 10px;
    background-color: #fff;
`