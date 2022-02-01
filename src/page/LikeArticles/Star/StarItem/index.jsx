import { List, Image } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import { getArticleById } from '../../../../services/article';
import { getBaseUserInfo } from '../../../../services/users';

export default memo(function StarItem(props) {
    const { articleInfo, userInfo } = props.info;

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
            description={userInfo.description}
        >
            {userInfo.nickname}
        </List.Item>
    );
});
