import { NavBar, Space, SpinLoading, Toast } from 'antd-mobile'
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

let reachTop = false;
export default function ChatRecord() {
    const { userId } = cookie.load('userInfo');
    const history = useHistory();
    const [userInfo, setUserInfo] = useState([]);
    const [chatRecord, setChatRecord] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [skeletonVisible, setSkeletonVisible] = useState(true);
    const [page, setPage] = useState(1);
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
            if (!reachTop) {
                setPage(page + 1);
                setLoading(true);
                setVisible(false);
                setVisible(true);
                const res = await getChattingRecord({ userId, receiverId: Number(receiverId), page: page + 1 });
                setLoading(false);
                setVisible(false);
                const { newRecord } = res;
                if (newRecord.length < 15) {
                    reachTop = true;
                }
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
                setVisible(true);
                setSkeletonVisible(false);
                socket.emit('online', userId);
                socket.on('receive-message', async () => {
                    window.scrollTo(0, document.body.scrollHeight);
                    setLoading(true);
                    setVisible(false);
                    setVisible(true);
                    const res = await getChattingRecord({ userId, receiverId: Number(receiverId), page })
                    setLoading(false);
                    setVisible(false)
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

    useEffect(() => {
        return () => { reachTop = false }
    },[])

    return (
        <div>
            <div className='titleWrap'>
                <NavBar onBack={history.goBack} className='title'> {userInfo && userInfo.nickname} </NavBar>
            </div>
            {(skeletonVisible || !loading) ? undefined : <Space block justify='center'><SpinLoading color="primary" /></Space>}
            <PropoverWrapper userInfo={userInfo} chatRecord={chatRecord} visible={visible} skeletonVisible={skeletonVisible} />

            <MessageInput sendMessage={sendMessageto}></MessageInput>
        </div>
    )
}
