import { NavBar } from 'antd-mobile';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

export default memo(function LikeArticle() {
    const history = useHistory();
    const back = () => {
        history.go(-1);
    }
    return (
        <div>
            <NavBar onBack={back} > 获赞与收藏 </NavBar>
        </div>
    );
});
