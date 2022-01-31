import React, { memo, useEffect, useState } from 'react';
import { getLikeArticles } from '../../../../services/article';
import TabPage from '../../../TabPage';
import cookie from 'react-cookies'

export default memo(function MyLikeArticles() {
    const [likeArticles, setLikeArticles] = useState([]);
    const userId = cookie.load('userInfo').userId;
    
    useEffect(async () => {
        const res = await getLikeArticles({ userId });
        const articles = res.likedArticles;
        setLikeArticles(articles)
    }, [userId])
    return (
        <TabPage articles={likeArticles} />
    );
});
