import { List } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import { getFansList } from '../../../services/users';
import FansItem from './FansItem';
import cookie from 'react-cookies';


export default memo(function FanList() {
    const [fansList, setFansList] = useState([]);
    const { userId } = cookie.load('userInfo');

    useEffect(async () => {
        try {
            const res = await getFansList({ userId });
            setFansList(res.fansList);
        } catch (err) {
            console.log(err);
        }
    }, [userId]) 
    
    return (
        <List>
            {
                fansList && fansList.map(user => (
                    <FansItem key={user.userId} userInfo={user} />
                ))
            }
        </List>
    );
});

