import { List, Toast } from 'antd-mobile';
import { memo, useEffect, useState } from 'react';
import cookie from 'react-cookies';
import SkeletonItem from '../../../component/SkeletonItem';
import { getLikeUsersComment } from '../../../services/notice';
import CommentItem from './CommentItem';

export default memo(function CommentList() {
    const { userId } = cookie.load('userInfo'); 
    const [like, setLike] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getLikeUsersComment({ userId });
                setLike(res.like);
                setLoading(false);
            } catch (err) {
                Toast.show(err.message);
            }
        }
        fetchData();
    }, [userId])  
    return (
        <List>
            {loading ? (new Array(3).fill(null)).map((_, idx) => <SkeletonItem key={idx} />) :
                like.map(info => (
                    <CommentItem key={info.reviews.postDate} info={info} />
                ))
            }
        </List>
    );

});
