import { memo, useState } from 'react';
import { NavBar, Space, Toast, Tabs, PullToRefresh } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TabPage from '../../TabPage';
import { sleep } from 'antd-mobile/es/utils/sleep';
import Mock from 'mockjs';
import { Article } from '../../PostDetail';

// 假数据。。。
const buildFake = () => {
    let data = Mock.mock({
        title: '@title',
        content: '@paragraph',
        'likes|0-20000': 20000,
        postDate: '@datetime',
        'articleId|1-2': 2,
        images: [
            'https://cdn.jsdelivr.net/gh/tagbug/demo@latest/img/1620385114079.png',
            'https://cdn.jsdelivr.net/gh/tagbug/demo@latest/img/1611837869906.png',
            'https://cdn.jsdelivr.net/gh/tagbug/demo@latest/img/1612394877886.png',
            'https://cdn.jsdelivr.net/gh/tagbug/demo@latest/img/1636805552641.jpg',
        ],
        tags: [],
        stars: 0,
        reviews: 0,
    })
    return data as Article;
}

let fake: Article[] = [];
for (let i = 0; i < 10; i++) {
    fake[i] = buildFake();
}

export default memo(function Homepage() {

    const history = useHistory();
    const goToSearch = () => {
        history.push('/search');
    }

    // State
    let [hasMore, setHasMore] = useState(true);
    let [articles, setArticles] = useState(fake);

    // 刷新页面
    const refresh = async () => {
        try {
            let length = Math.random() * 10 + 10;
            fake = [];
            for (let i = 0; i < length; i++) {
                fake[i] = buildFake();
            }
            setArticles(fake);
            // 还原是否有更多评论的状态
            setHasMore(true);
        } catch (err) {
            Toast.show((err as Error).message);
        }
    }

    // 加载更多Article
    const loadMore = async (tabIndex: number) => {
        await sleep(1000);
        setHasMore(false);
    }

    const right = (
        <div style={{ fontSize: 20 }}>
            <Space>
                <SearchOutline onClick={goToSearch} />
            </Space>
        </div>
    )

    const back = () => {
        Toast.show({
            content: '记录我的日常',
            duration: 1000,
        })
    }

    return (
        <TabsContainer>
            <div className='navbar'>
                <NavBar right={right} onBack={back}> 首页 </NavBar>
            </div>
            <div className='main'>
                <PullToRefresh onRefresh={refresh}>
                    <Tabs defaultActiveKey='1'>
                        <Tabs.Tab title='推荐' key='1'>
                            <TabPage articles={articles} hasMore={hasMore} loadMore={loadMore.bind(null, 1)} />
                        </Tabs.Tab>
                        <Tabs.Tab title='旅行' key='2'>
                            <TabPage articles={articles.slice(5)} hasMore={hasMore} loadMore={loadMore.bind(null, 2)} />
                        </Tabs.Tab>
                        <Tabs.Tab title='美食' key='3'>
                            <TabPage articles={articles.slice(7)} hasMore={hasMore} loadMore={loadMore.bind(null, 2)} />
                        </Tabs.Tab>
                        <Tabs.Tab title='时尚' key='4'>
                            <TabPage articles={articles.slice(2)} hasMore={hasMore} loadMore={loadMore.bind(null, 2)} />
                        </Tabs.Tab>
                        <Tabs.Tab title='彩妆' key='5'>
                            <TabPage articles={articles.slice(6)} hasMore={hasMore} loadMore={loadMore.bind(null, 2)} />
                        </Tabs.Tab>
                        <Tabs.Tab title='高效' key='6'>
                            <TabPage articles={articles.slice(1)} hasMore={hasMore} loadMore={loadMore.bind(null, 2)} />
                        </Tabs.Tab>
                        <Tabs.Tab title='护肤' key='7'>
                            <TabPage articles={articles.slice(8)} hasMore={hasMore} loadMore={loadMore.bind(null, 2)} />
                        </Tabs.Tab>
                    </Tabs>
                </PullToRefresh>
            </div>
        </TabsContainer>
    )
})
const TabsContainer = styled.div`
    height: 90vh;

    .navbar {
        display: block;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
        background-color: #fff;
    }

    .main {
        margin-top: 36px;
    }
`