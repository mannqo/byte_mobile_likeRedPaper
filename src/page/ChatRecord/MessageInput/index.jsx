import React, { useState } from 'react'
import { Input, Space } from 'antd-mobile'
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
            <div className="input">
                <Input
                    placeholder='请输入内容'
                    value={value}
                    onChange={val => {
                        setValue(val)
                    }}
                    onEnterPress={submitMessage}
                />
            </div>
        </InputWrapper>
    )
}
export default MessageItem;

const InputWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    background-color: rgb(243,243,243);

    .input {
        padding: 8px 12px;
        background-color: #fff;
        border-radius: 24px;
    }

    input {
        font-size: 1rem;
    }
`