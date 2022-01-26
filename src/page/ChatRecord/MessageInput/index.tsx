import React, { useState } from 'react'
import { Input } from 'antd-mobile'

const MessageItem = () => {
    const [value, setValue] = useState('')
    // 提交消息
    const submitMessage = (e: any) => {
        setValue('')
    }
    return (
        <Input
            placeholder='请输入内容'
            value={value}
            onChange={val => {
                setValue(val)
            }}
            onEnterPress={submitMessage}
            style={{ 'border': '7px solid #f5f7fa', 'position': 'absolute', 'bottom': 0, 'padding': '0 10px' }}
        />
    )
}
export default MessageItem;