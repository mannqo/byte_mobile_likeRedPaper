import { List } from 'antd-mobile'
import { useEffect, useState } from 'react';
import MessageItem from './MessageItem';

const MessageList = () => {
    let data = null;
    const [charList, setChatList] = useState([]);
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3000/getChatList');
        ws.addEventListener('message',(e)=>{
            console.log(JSON.parse(e.data));
        })
        const userId = 2;
        ws.onopen = () => {
            ws.send(userId);
        }
        ws.onmessage = (e) => {
            data = JSON.parse(e.data);
            console.log(data);
            setChatList(data);
        }
        return () => {
            ws.close();
        }

    }, [data])
    return (
        <List>
            {
                users.map(user => (
                    <MessageItem key={user.name} user={user} />
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