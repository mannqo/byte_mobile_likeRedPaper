import React, { memo, useEffect, useState } from 'react';
import { getLikedArticles } from '../../../services/article';
import TabPage from '../../../page/TabPage';
import cookie from 'react-cookies'

export default memo(function MyLikeArticles(props) {
    const [likeArticles, setLikeArticles] = useState([]);
    const { userId } = props;

    useEffect(async () => {
        const res = await getLikedArticles({ userId });
        const articles = res.likedArticles;
        setLikeArticles(articles)
    }, [userId])
    return (
        <TabPage articles={likeArticles} />
    );
});
