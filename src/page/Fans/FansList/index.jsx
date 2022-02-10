import { List } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import { getFansList } from '../../../services/users';
import FansItem from './FansItem';
import cookie from 'react-cookies';
import SkeletonItem from '../../../component/SkeletonItem';


export default memo(function FanList() {
    const { userId } = cookie.load('userInfo');

    // State
    const [fansList, setFansList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        try {
            const res = await getFansList({ userId });
            setFansList(res.fansList);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }, [userId])

    return (
        <List>
            {loading ? (new Array(3).fill(null)).map((_, idx) => <SkeletonItem key={idx} />) :
                fansList && fansList.map(user => (
                    <FansItem key={user.userId} userInfo={user} />
                ))
            }
        </List>
    );
});

