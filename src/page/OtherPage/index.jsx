import { NavBar } from 'antd-mobile';
import React, { memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PersonalPage from '../../component/PersonalPage';

export default memo(function OtherPage() {
    const history = useHistory();
    const location = useLocation();
    const userId = location.search.split('=')[1];
    const back = () => {
        history.go(-1);
    }
    return (
        <>
            <NavBar onBack={back} > </NavBar>
            <PersonalPage userId={userId} />
        </>

    )
});


