import { NavBar } from 'antd-mobile';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom'; 

export default memo(function ChatRecord() {
    const history = useHistory();
    const back = () => {
        history.go(-1);
    }
    return (
        <div>
            <NavBar onBack={back}>发私信</NavBar>
            这个页面渲染我的全部关注
        </div>
    )
})
