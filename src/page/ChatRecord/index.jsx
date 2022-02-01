import { NavBar } from 'antd-mobile'
import React, { memo, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { getChattingRecord } from '../../services/chat'
import { getFullUserInfo } from '../../services/users'
import MessageInput from './MessageInput'
import { PropoverWrapper } from './Propover'
import './index.css';
import cookie from 'react-cookies';
import { sendMessage } from '../../services/chat';

import io from 'socket.io-client';
const socket = io.connect('ws://localhost:8080/chat');


export default memo(function ChatRecord() {
    window.scrollTo(0, document.body.scrollHeight);
    const { userId } = cookie.load('userInfo');
    const history = useHistory();
    const [userInfo, setUserInfo] = useState([]);
    const [chatRecord, setChatRecord] = useState();
    const { receiverId } = useParams();
        
    const sendMessageto = async (message) => {
        await sendMessage({ userId, receiverId: Number(receiverId), message });
        const res = await getChattingRecord({ userId, receiverId: Number(receiverId) })
        setChatRecord(res.record);
        socket.emit('send-message', { userId, receiverId: Number(receiverId), message });   // 发消息
        socket.on('receive-message', async data => {
            console.log(data);
            const res = await getChattingRecord({ userId, receiverId: Number(receiverId) })
            setChatRecord(res.record);
        });
    }

    useEffect(async () => {
        const user = await getFullUserInfo({ userId: Number(receiverId) });
        const res = await getChattingRecord({ userId, receiverId: Number(receiverId) })
        setChatRecord(res.record);
        setUserInfo(user.user);
    }, [userId])


    const back = () => {
        history.go(-1);
    }
    return (
        <div>
            <NavBar onBack={back} className='title'>{userInfo && userInfo.nickname}</NavBar>
            <PropoverWrapper userInfo={userInfo} chatRecord={chatRecord}></PropoverWrapper>
            <MessageInput sendMessage={sendMessageto}></MessageInput>
        </div>
    )
})
