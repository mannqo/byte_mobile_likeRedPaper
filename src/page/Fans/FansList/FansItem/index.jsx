import { List, Image, Button } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import { cancelFollow, followOthers, getFansList } from '../../../../services/users';

export default memo(function FansItem(props) {
  const { userInfo } = props;
  const { userId, nickname, avatar, description } = userInfo;
  const initialStatus = {
    status: 0,
    fill: 'outline',
    followStatus: '未关注'
  }
  const followStatus = {
    status: 1,
    fill: 'solid',
    followStatus: '已关注'
  }
  const [status, setStatus] = useState(initialStatus);

  const followOrNot = async () => {
    try {
      if (status.status) {
        await cancelFollow({ userId: 1, followerId: userId })
        setStatus(initialStatus);
      }
      else {
        await followOthers({ userId: 1, followerId: userId })
        setStatus(followStatus)
      }
    } catch (err) {
      console.log(err);
    }

  }
  useEffect(async () => {
    const res = await getFansList({ userId });
    const { fansList } = res;
    fansList.map(item => {
      item.userId === 1 && setStatus(followStatus);
    })
  }, [])
  return (
    <List.Item
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
          onClick={followOrNot}>
          {status.followStatus}
        </Button>
      }>
      {nickname}
    </List.Item>
  );
});
