import { memo, useEffect, useState } from 'react';
import { NavBar, Space, Toast, Tabs, PullToRefresh, Skeleton, Loading } from 'antd-mobile';
import { SearchOutline, AddOutline } from 'antd-mobile-icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TabPage from '../../TabPage';
import { sleep } from 'antd-mobile/es/utils/sleep';
import { Article, sorter } from '../../PostDetail';
import { getHomePageArticles, getHomePageTagArticles } from '../../../services/article';

type Pages = {
    [tag: string]: Article[]
}

export default memo(function Homepage() {

    const history = useHistory();
    const goToSearch = () => {
        history.push('/search');
    }


    // State
    let [pages, setPages] = useState<Pages>({});
    let [pageTimes, setPageTimes] = useState<{ [key: string]: number }>({});
    let [pageMore, setPageMore] = useState<{ [key: string]: boolean }>({});
    let [loading, setLoading] = useState(true);

    // Effect
    useEffect(() => {
        refresh();
    }, []);

    // 刷新页面
    const refresh = async () => {
        try {
            const res = (await getHomePageArticles()).pages as Pages;
            let times: { [key: string]: number } = {};
            let more: { [key: string]: boolean } = {};
            for (const tag in res) {
                // sorter(res[tag]);
                times[tag] = 1;
                more[tag] = true;
            }
            setPageTimes(times);
            setPages(res);
            // 还原是否有更多评论的状态
            setPageMore(more);
            setLoading(false);
        } catch (err) {
            Toast.show((err as Error).message);
        }
    }

    // 加载更多Article
    const loadMore = async (tag: string) => {
        try {
            const res = (await getHomePageTagArticles({ tag, pages: pageTimes[tag] })).articles as Article[];
            let articles = pages[tag];
            articles.push(...res);
            // sorter(articles);
            setPageTimes({
                ...pageTimes,
                [tag]: pageTimes[tag] + 1
            })
            setPages({
                ...pages,
                [tag]: articles
            });
            // 还原是否有更多评论的状态
            if (res.length < 10) {
                setPageMore({
                    ...pageMore,
                    [tag]: false
                })
            }
        } catch (err) {
            Toast.show((err as Error).message);
        }
    }

    const right = (
        <div style={{ fontSize: 20, cursor: 'pointer' }}>
            <Space>
                <SearchOutline onClick={goToSearch} />
            </Space>
        </div>
    )

    // 跳转发布文章
    const gotoArticlePostPage = () => {
        history.push('/article/post');
    }

    // 页面
    const pagTabs = [];
    let i = 0;
    for (let tag in pages) {
        pagTabs.push(
            <Tabs.Tab title={tag} key={i}>
                <TabPage loading={false} articles={pages[tag]} hasMore={pageMore[tag]} loadMore={loadMore.bind(null, tag)} />
            </Tabs.Tab>)
        i++;
    }

    return (
        <TabsContainer>
            <div className='navbar'>
                <NavBar
                    right={right}
                    left={<AddOutline
                        onClick={gotoArticlePostPage}
                        style={{ fontSize: 20, cursor: 'pointer' }}
                    />}
                    backArrow={false}>
                    首页
                </NavBar>
            </div>
            <div className='main'>
                <PullToRefresh onRefresh={refresh}>
                    <Tabs defaultActiveKey='0'>
                        {loading ? (new Array(7).fill(null)).map((_, idx) => <Tabs.Tab title={<Loading />} key={idx}>
                            <TabPage loading={true} articles={[]} hasMore={false} loadMore={() => { }} />
                        </Tabs.Tab>) : pagTabs}
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

    .adm-nav-bar-back {
        margin-right: 0;
    }

    .main {
        margin-top: 36px;
    }
`