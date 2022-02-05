import React, { memo, useEffect, useState } from 'react';
import { getLikedArticles } from '../../../services/article';
import TabPage from '../../../page/TabPage';

export default memo(function MyLikeArticles(props) {
    const [likeArticles, setLikeArticles] = useState([]);
    const { userId } = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getLikedArticles({ userId });
                const articles = res.likedArticles;
                setLikeArticles(articles)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [userId])
    return (
        <TabPage articles={likeArticles} />
    );
});
