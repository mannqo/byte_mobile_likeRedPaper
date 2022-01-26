import { NavBar } from 'antd-mobile'
import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'
import MessageInput from './MessageInput'
import { LeftPropover, RightPropover } from './Propover'

export default memo(function ChatRecord() {
    const history = useHistory();
    const back = () => {
        history.go(-1);
    }
    return (
        <div>
            <NavBar onBack={back}>昵称</NavBar>
            <RightPropover></RightPropover>
            <LeftPropover></LeftPropover>
            <MessageInput></MessageInput>
        </div>
    )
})
