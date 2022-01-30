import { List } from 'antd-mobile'
import { useEffect, useState } from 'react';
import { getChatList } from '../../services/chat';
import MessageItem from './MessageItem';

const MessageList = () => {
    const [chatList, setChatList] = useState([]);
    useEffect(async () => {
        try {
            const res = await getChatList({ userId: 1 }); 
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