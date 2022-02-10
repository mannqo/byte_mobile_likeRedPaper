import React, { memo, useEffect, useState } from 'react';
import { List } from 'antd-mobile';
import cookie from 'react-cookies';
import { getFollowsList } from '../../../services/users';
import FollowsItem from './FollowsItem';
import SkeletonItem from '../../../component/SkeletonItem';

export default memo(function FollowsList(props) {
    const { style } = props;
    const { userId } = cookie.load('userInfo');

    // State
    const [followsList, setFollowsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getFollowsList({ userId });
                setFollowsList(res.followsList);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [userId])

    return (
        <List>
            {loading ? (new Array(3).fill(null)).map((_, idx) => <SkeletonItem key={idx} />) :
                followsList && followsList.map(user => (
                    <FollowsItem key={user.userId} userInfo={user} style={style} />
                ))
            }
        </List>
    );
});
