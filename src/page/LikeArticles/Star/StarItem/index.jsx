import { List, Image } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import { getArticleById } from '../../../../services/article';
import { getBaseUserInfo } from '../../../../services/users';

export default memo(function StarItem(props) {
    const { articleId, userId } = props.info;
    const [user, setUser] = useState({});
    const [article, setArticle] = useState({});
    useEffect(async () => {
        try {
            const userRes = await getBaseUserInfo({ userId });
            const articleRes = await getArticleById({ articleId })
            setUser(userRes.user);
            setArticle(articleRes.article);
        } catch (err) {
            console.log(err);
        }

    }, [])
    console.log(user);
    return (
        <List.Item
            key={userId}
            prefix={
                <Image
                    src={user.avatar}
                    style={{ borderRadius: 20 }}
                    fit='cover'
                    width={40}
                    height={40}
                />
            }
            description={user.description}
        >
            {user.nickname}
        </List.Item>
    );
});
