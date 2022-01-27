import { List } from 'antd-mobile'
import { useEffect, useState } from 'react';
import { getChatList } from '../../services/chat';
import MessageItem from './MessageItem';

const MessageList = () => {
    const [charList, setChatList] = useState([]);
    useEffect(async () => {
        try {
            const list = await getChatList({ userId: 1 });
            setChatList(list);
        } catch (err) {
            console.log(err);
        }
    }, [])
    return (
        <List>
            {
                charList.map(user => (
                    <MessageItem key={user.username} user={user} />
                ))
            }
        </List >
    )
}
export default MessageList;
const users = [
    {
        avatar:
            'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        name: 'Novalee Spicer',
        description: 'Deserunt dolor ea eaque eos',
    },
]