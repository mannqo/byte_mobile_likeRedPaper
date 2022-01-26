import { List } from 'antd-mobile'
import { useEffect, useState } from 'react';
import MessageItem from './MessageItem';
 
const io = require('socket.io-client')
// const socket = io.connect('ws://localhost')
const MessageList = () => {
    useEffect(() => {
        socket.on("get-ChatList", (data) => {
            console.log(data);
        })
        // const ws = new WebSocket('ws://localhost:3000/getChatList');
        // const userId = 1;
        // ws.onopen = () => {
        //     ws.send(userId);
        // }
        // ws.onmessage = (e) => {
        //     console.log(e);
        // }

    }, [])
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