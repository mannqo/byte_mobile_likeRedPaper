import { NavBar } from 'antd-mobile'
import React, { memo, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getChattingRecord } from '../../services/chat'
import { getUserInfo } from '../../services/users'
import MessageInput from './MessageInput'
import { PropoverWrapper } from './Propover'
import './index.css';

export default memo(function ChatRecord() {
    const history = useHistory();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState([]);
    const [charRecord, setChatRecord] = useState();
    const receiverId = location.search.split('=')[1];

    useEffect(async () => {
        const user = await getUserInfo({ userId: receiverId });
        const res = await getChattingRecord({ userId: 1, receiverId })
        setChatRecord(res.record);
        setUserInfo(user.user);
    }, [])


    const back = () => {
        history.go(-1);
    }
    return (
        <div>
            <NavBar onBack={back} className='title'>{userInfo && userInfo.nickname}</NavBar>
            <PropoverWrapper userInfo={userInfo} chatRecord={charRecord}></PropoverWrapper>
            <MessageInput receiverId={receiverId}></MessageInput>
        </div>
    )
})
