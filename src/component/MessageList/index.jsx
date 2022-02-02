import { List } from 'antd-mobile'
import { useEffect, useState } from 'react';
import { getChatList } from '../../services/chat';
import MessageItem from './MessageItem';
import cookie from 'react-cookies';

const MessageList = () => {
    const [chatList, setChatList] = useState([]);
    const { userId } = cookie.load('userInfo');

    useEffect(async () => {

        try {
            const res = await getChatList({ userId });
            setChatList(res.chatList);
        } catch (err) {
            console.log(err);
        }

    }, [])
    return (
        <List>
            {
                chatList.map(user => (
                    <MessageItem key={user.userId} user={user} />
                ))
            }
        </List >
    )
}
export default MessageList;