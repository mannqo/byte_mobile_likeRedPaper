import { NavBar, Tabs, Toast } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLikeUsersArticle, getStarUsersArticle } from '../../services/notice';
import cookie from 'react-cookies';
import Like from './Like';
import Star from './Star';
import SkeletonItem from '../../component/SkeletonItem';

export default memo(function LikeArticle() {
    const history = useHistory();
    const { userId } = cookie.load('userInfo');

    // State
    const [like, setLike] = useState([]);
    const [star, setStar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const likeRes = await getLikeUsersArticle({ userId });
                const starRes = await getStarUsersArticle({ userId });
                setLike(likeRes.like);
                setStar(starRes.star);
                setLoading(false);
            } catch (err) {
                Toast.show(err.message);
            }
        }
        fetchData();
    }, [userId])

    return (
        <div>
            <NavBar onBack={history.goBack} > 获赞与收藏 </NavBar>
            <Tabs>
                <Tabs.Tab title='获赞' key='like'>
                    {loading ? (new Array(3).fill(null)).map((_, idx) => <SkeletonItem key={idx} />) :
                        <Like like={like} />}
                </Tabs.Tab>
                <Tabs.Tab title='收藏' key='star'>
                    {loading ? (new Array(3).fill(null)).map((_, idx) => <SkeletonItem key={idx} />) :
                        <Star star={star} />}
                </Tabs.Tab>
            </Tabs>
        </div>
    );
});
