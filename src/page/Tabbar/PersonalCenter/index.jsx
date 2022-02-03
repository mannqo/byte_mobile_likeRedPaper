import { NavBar, Space } from 'antd-mobile'
import React, { memo  } from 'react'
import { MoreOutline, SendOutline } from 'antd-mobile-icons' 
import PersonalPage from '../../../component/PersonalPage'

export default memo(function PersonalCenter(props) {
    const right = (
        <div style={{ fontSize: 20 }}>
            <Space>
                <SendOutline />
            </Space>
        </div>
    )
    const left = (
        <div style={{ fontSize: 20 }}>
            <Space>
                <MoreOutline />
            </Space>
        </div>
    )
    return (
        <div>
            <NavBar right={right} left={left} backArrow={false}></NavBar>
            <PersonalPage userId={props.route.userId} />
        </div>
    )
}) 