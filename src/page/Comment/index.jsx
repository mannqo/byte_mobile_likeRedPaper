import { NavBar } from 'antd-mobile';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import CommentList from './CommnetList';

export default memo(function BeLiked() {
    const history = useHistory();

    return (
        <>
            <NavBar onBack={history.goBack} > 收到的评论和@ </NavBar>
            <CommentList></CommentList>
        </>

    );
});
