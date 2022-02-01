import { NavBar } from 'antd-mobile';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

export default memo(function BeLiked() {
    const history = useHistory();
    const back = () => {
        history.go(-1);
    }
    return (
        <>
            <NavBar onBack={back} > 收到的评论和@ </NavBar>
        </>

    );
});
