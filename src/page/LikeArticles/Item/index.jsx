import { List, Image } from 'antd-mobile';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

export default memo(function Item(props) {
    const { articleInfo, userInfo } = props.info;
    const { articleId, images } = articleInfo;
    const { type } = props;
    const displayStatus = images[0] ? 'block' : 'none';
    const history = useHistory();
    const toArticleDetail = () => {
        history.push('/post/detail/' + articleId)
    }
    return (
        <List.Item
            onClick={toArticleDetail}
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
                    width={40}
                    height={40}
                    style={{ display: displayStatus }}
                />
            }
            description={type + '了你的笔记'}
        >
            {userInfo.nickname}
        </List.Item >
    );
});
