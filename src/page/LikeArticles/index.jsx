import { NavBar, Tabs, Toast } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLikeUsersArticle, getStarUsersArticle } from '../../services/notice';
import cookie from 'react-cookies';
import Like from './Like';
import Star from './Star'; 

export default memo(function LikeArticle() {
    const history = useHistory();
    const { userId } = cookie.load('userInfo');
    const [like, setLike] = useState([]);
    const [star, setStar] = useState([]);
    useEffect(async () => {
        try {
            const likeRes = await getLikeUsersArticle({ userId });
            const starRes = await getStarUsersArticle({ userId });
            setLike(likeRes.like);
            setStar(starRes.star);
        } catch (err) {
            Toast.show(err.message);
        }
    }, [userId]) 
    return (
        <div>
            <NavBar onBack={history.goBack} > 获赞与收藏 </NavBar>
            <Tabs>
                <Tabs.Tab title='获赞' key='like'>
                    <Like like={like} />
                </Tabs.Tab>
                <Tabs.Tab title='收藏' key='star'>
                    <Star star={star} />
                </Tabs.Tab>
            </Tabs>
        </div>
    );
});
