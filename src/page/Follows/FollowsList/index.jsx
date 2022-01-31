import React, { memo, useEffect, useState } from 'react';
import { List } from 'antd-mobile';
import cookie from 'react-cookies';
import { getFollowsList } from '../../../services/users';
import FollowsItem from './FollowsItem';

export default memo(function FollowsList(props) {
    const { style } = props;
    const [followsList, setFollowsList] = useState([]);
    const { userId } = cookie.load('userInfo');

    useEffect(async () => {
        try {
            const res = await getFollowsList({ userId });
            setFollowsList(res.followsList);
        } catch (err) {
            console.log(err);
        }
    }, [userId])
    return (
        <List>
            {
                followsList && followsList.map(user => (
                    <FollowsItem key={user.userId} userInfo={user} style={style} />
                ))
            }
        </List>
    );
});
