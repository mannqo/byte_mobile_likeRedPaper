import { NavBar } from 'antd-mobile'
import React, { memo, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getChattingRecord } from '../../services/chat'
import { getUserInfo } from '../../services/users'
import MessageInput from './MessageInput'
import { PropoverWrapper } from './Propover'

const id = 1;
export default memo(function ChatRecord() {
    const history = useHistory();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState([]);
    const [charRecord, setChatRecord] = useState();
    const receiverId = location.search.split('=')[1];

    useEffect(async () => {
        const user = await getUserInfo({ userId: receiverId });
        const record = await getChattingRecord({ userId: 1, receiverId })
        console.log(record);
        setChatRecord(record);
        setUserInfo(user);
    }, [])


    const back = () => {
        history.go(-1);
    }
    return (
        <div>
            <NavBar onBack={back}>{userInfo && userInfo.username}</NavBar>
            <PropoverWrapper userInfo={userInfo} chatRecord={charRecord}></PropoverWrapper>
            <MessageInput></MessageInput>
        </div>
    )
})
