import React, { memo, useEffect, useState } from 'react';
import { getLikedArticles } from '../../../services/article';
import TabPage from '../../../page/TabPage';

export default memo(function MyLikeArticles(props) {
    const [likeArticles, setLikeArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId } = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getLikedArticles({ userId });
                const articles = res.likedArticles;
                setLikeArticles(articles)
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [userId])
    return (
        <TabPage loading={loading} articles={likeArticles} />
    );
});
