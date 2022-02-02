import { List, Image } from 'antd-mobile';
import React, { memo } from 'react';

export default memo(function Item(props) {
    const { articleInfo, userInfo } = props.info;
    const { images } = articleInfo;
    const { type } = props;
    const displayStatus = images[0] ? 'block' : 'none';

    return (
        <List.Item
            key={userInfo.userId}
            prefix={
                <Image
                    src={userInfo.avatar}
                    style={{ borderRadius: 20 }}
                    fit='cover'
                    width={40}
                    height={40}
                />
            }
            extra={
                <Image
                    src={images && images[0]}
                    width={50}
                    height={50}
                    style={{ display: displayStatus }}
                />
            }
            description={type + '了你的笔记'}
        >
            {userInfo.nickname}
        </List.Item >
    );
});
