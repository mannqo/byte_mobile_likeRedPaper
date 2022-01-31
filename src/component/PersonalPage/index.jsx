import { List, Avatar, Tabs } from 'antd-mobile'
import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import EditInfo from './EditInfo'
import MyArticle from './MyArticle'
import MyLikeArticles from './MyLikeArticles'
import MyStarArticles from './MyStarArticles'
import { getFullUserInfo } from '../../services/users'


export default memo(function PersonalPage(props) {  
    const { userId } = props;
    const [userInfo, setUserInfo] = useState({});

    useEffect(async () => {
        try {
            const res = await getFullUserInfo({ userId });
            setUserInfo(res.user);
        } catch (err) {
            console.log(err);
        }

    }, [])  
    return (
        <div>
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
            <EditInfo userInfo={userInfo} />
            <TabsWrapper>
                <Tabs defaultActiveKey='1'>
                    <Tabs.Tab title='笔记' key='1'><MyArticle userId={userInfo.userId} /></Tabs.Tab>
                    <Tabs.Tab title='收藏' key='2'><MyStarArticles userId={userInfo.userId} /></Tabs.Tab>
                    <Tabs.Tab title='赞过' key='3'><MyLikeArticles userId={userInfo.userId}></MyLikeArticles></Tabs.Tab>
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