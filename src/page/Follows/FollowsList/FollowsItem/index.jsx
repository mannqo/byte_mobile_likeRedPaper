import { List, Image, Button } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import { cancelFollow, followOthers, getFollowsList } from '../../../../services/users';
import cookie from 'react-cookies';
import { useHistory } from 'react-router-dom';

export default memo(function FollowsItem(props) {
    const id = cookie.load('userInfo').userId;
    const history = useHistory();
    const { userInfo } = props;
    const { userId, nickname, avatar, description } = userInfo;
    const followStatus = {
        status: 0,
        fill: 'solid',
        followStatus: '互相关注'
    }
    const initialStatus = {
        status: 1,
        fill: 'solid',
        followStatus: '已关注'
    }
    const [status, setStatus] = useState(initialStatus);
    const followOrNot = async () => {
        try {
            if (status.status) {
                await cancelFollow({ userId: id, followerId: userId })
                setStatus(initialStatus);
            }
            else {
                await followOthers({ userId: id, followerId: userId })
                setStatus(followStatus)
            }
        } catch (err) {
            console.log(err);
        }

    }
    const toPersonalPage = async () => {
        history.push('/other/page/' + userId);
    }

    useEffect(async () => {
        const res = await getFollowsList({ userId });
        const { followsList } = res;
        followsList.map(item => {
            item.userId === id && setStatus(followStatus);
        })
    }, [id])

    return (
        <List.Item>
            <List.Item
                onClick={toPersonalPage}
                key={userId}
                prefix={
                    <Image
                        src={avatar}
                        style={{ borderRadius: 20 }}
                        fit='cover'
                        width={40}
                        height={40}
                    />
                }
                description={description}
                extra={
                    <Button
                        color='primary'
                        size='small'
                        fill={status.fill}
                        onClick={followOrNot}
                        style={{ display: props.style }}
                    >
                        {status.followStatus}
                    </Button>
                }>
                {nickname}
            </List.Item>
        </List.Item>
    );
});
