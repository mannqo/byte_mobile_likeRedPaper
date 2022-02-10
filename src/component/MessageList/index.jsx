import { List } from 'antd-mobile'
import { useEffect, useState } from 'react';
import { getChatList } from '../../services/chat';
import MessageItem from './MessageItem';
import cookie from 'react-cookies';
import SkeletonItem from '../SkeletonItem';

const MessageList = () => {
    const [chatList, setChatList] = useState([]);

    // State
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { userId } = cookie.load('userInfo');
                const res = await getChatList({ userId });
                setChatList(res.chatList);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
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