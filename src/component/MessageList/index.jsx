import { List } from 'antd-mobile'
import { useEffect, useState } from 'react';
import { getChatList } from '../../services/chat';
import MessageItem from './MessageItem';
import cookie from 'react-cookies';
import SkeletonItem from '../SkeletonItem';

const MessageList = () => {
    const [chatList, setChatList] = useState([]);
    const { userId } = cookie.load('userInfo');

    // State
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        try {
            const res = await getChatList({ userId });
            setChatList(res.chatList);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }

    }, [])
    return (
        <List>
            {loading ? (new Array(3).fill(null)).map((_, idx) => <SkeletonItem key={idx} />) :
                chatList.map(user => (
                    <MessageItem key={user.userId} user={user} />
                ))
            }
        </List >
    )
}
export default MessageList;