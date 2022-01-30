import { NavBar } from 'antd-mobile'
import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'
import FansList from './FansList'

export default memo(function Fans() {
    const history = useHistory();
    const back = () => {
        history.go(-1);
    }
    return (
        <>
            <NavBar onBack={back} > 新增关注 </NavBar>
            <FansList />
        </>
    )
})
