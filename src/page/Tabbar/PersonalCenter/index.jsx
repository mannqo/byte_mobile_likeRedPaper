import { NavBar, Space, List, Avatar, Tabs } from 'antd-mobile'
import React, { memo } from 'react'
import { MoreOutline, SendOutline } from 'antd-mobile-icons'
import styled from 'styled-components'
import EditInfo from './EditInfo'
import cookie from 'react-cookies'
import { useHistory } from 'react-router-dom'


export default memo(function PersonalCenter() {
    const userInfo = cookie.load('userInfo');
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
            <ItemContainer className='ItemContainer'>
                {userInfo ?
                    <List.Item
                        prefix={<Avatar src={userInfo.avatar}
                            style={{ borderRadius: '50%', '--size': '90px' }} />}
                        description={userInfo.description}
                    >
                        {userInfo.nickname}
                    </List.Item>
                    : <></>
                }
            </ItemContainer>
            <EditInfo />
            <TabsWrapper>
                <Tabs defaultActiveKey='1'>
                    <Tabs.Tab title='笔记' key='1'> 1 </Tabs.Tab>
                    <Tabs.Tab title='收藏' key='2'> 2 </Tabs.Tab>
                    <Tabs.Tab title='赞过' key='3'> 3 </Tabs.Tab>
                </Tabs>
            </TabsWrapper>
        </div>
    )
})

const ItemContainer = styled.div`
    display: flex;
    .adm-list-item {
        margin-left: 30px;
        .adm-list-item-content-main {
            display: flex;
            padding-left: 10px;
            flex-direction: column; 
            justify-content: center;
            font-size: 20px;
            line-height: 30px;
        .adm-list-item-description {
            font-size: 16px;
        }
    }
    }
    
`
const TabsWrapper = styled.div`
    margin-top: 10px;
`