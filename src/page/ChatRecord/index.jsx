import { NavBar, Toast } from 'antd-mobile'
import React, { memo, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getChattingRecord } from '../../services/chat'
import { getFullUserInfo } from '../../services/users'
import MessageInput from './MessageInput'
import { PropoverWrapper } from './Propover'
import './index.css';
import cookie from 'react-cookies';
import { sendMessage } from '../../services/chat';

import io from 'socket.io-client';
const socket = io.connect('ws://localhost:8080/chat');

let page = 1, flag = 1;
export default memo(function ChatRecord() {
    const { userId } = cookie.load('userInfo');
    const history = useHistory();
    const [userInfo, setUserInfo] = useState([]);
    const [chatRecord, setChatRecord] = useState([]);
    const [visible, setVisible] = useState(true);
    const { receiverId } = useParams();

    const sendMessageto = async (message) => {
        try {
            const res = await sendMessage({ userId, receiverId: Number(receiverId), message });
            const { newMessage } = res;
            const newRecord = [...chatRecord, newMessage];
            setChatRecord(newRecord);
            window.scrollTo(0, document.body.scrollHeight);
            socket.emit('send-message', { userId, receiverId: Number(receiverId), message });   // 发消息
        } catch (err) {
            console.log(err);
        }
    }

    const handleScroll = async () => {
        const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
        if (!scrollTop) {
            if (flag) {
                page++;
                setVisible(false);
                const res = await getChattingRecord({ userId, receiverId: Number(receiverId), page });
                const { newRecord } = res;
                if (newRecord.length < 15) flag = 0;
                if (newRecord.length) {
                    setChatRecord([...newRecord, ...chatRecord])
                }
                setVisible(true);
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getFullUserInfo({ userId: Number(receiverId) });
                const res = await getChattingRecord({ userId, receiverId: Number(receiverId), page })
                const { newRecord } = res;
                setChatRecord(newRecord);
                setUserInfo(user.user);
                socket.emit('online', userId);
                socket.on('receive-message', async () => {
                    window.scrollTo(0, document.body.scrollHeight);
                    setVisible(false)
                    const res = await getChattingRecord({ userId, receiverId: Number(receiverId), page })
                    const { newRecord } = res;
                    setChatRecord(newRecord);
                    setVisible(true);
                });
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [userId, receiverId])
    useEffect(() => {
        Number(page) === 1 && window.scrollTo(0, document.body.scrollHeight);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [chatRecord])


    return (
        <div onScrollCapture={handleScroll}>
            <div className='titleWrap'>
                <NavBar onBack={history.goBack} className='title'> {userInfo && userInfo.nickname} </NavBar>
            </div>
            <PropoverWrapper userInfo={userInfo} chatRecord={chatRecord} visible={visible} />

            <MessageInput sendMessage={sendMessageto}></MessageInput>
        </div>
    )
})
