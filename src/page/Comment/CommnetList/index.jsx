import { List } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { getLikeUsersComment } from '../../../services/notice';
import CommentItem from './CommentItem';

export default memo(function CommentList() {
    const { userId } = cookie.load('userInfo');
    const [like, setLike] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getLikeUsersComment({ userId });
                setLike(res.like);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [userId])

    return (
        <List>
            {
                like.map(info => (
                    <CommentItem key={info.reviews.postDate} info={info} />
                ))
            }
        </List>
    );

});
