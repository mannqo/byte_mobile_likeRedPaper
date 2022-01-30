import React, { useState } from 'react'
import { Input } from 'antd-mobile'
import styled from 'styled-components'
import { sendMessage } from '../../../services/chat'

const userId = 1;
const MessageItem = (props) => {
    const { receiverId } = props;
    const [value, setValue] = useState('')
    // 提交消息
    const submitMessage = async (e) => {
        const { value } = e.target;
        setValue(value)
        try {
            await sendMessage({ userId, receiverId, message: value });
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
    width: 100vw;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    border: 10px solid #ccc;
    background-color: #fff;
`