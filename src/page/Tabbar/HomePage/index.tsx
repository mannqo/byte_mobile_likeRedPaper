import { memo, useEffect, useState } from 'react';
import { NavBar, Space, Toast, Tabs, PullToRefresh, Skeleton, Loading } from 'antd-mobile';
import { SearchOutline, AddOutline } from 'antd-mobile-icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TabPage from '../../TabPage';
import { sleep } from 'antd-mobile/es/utils/sleep';
import { Article, sorter } from '../../PostDetail';
import { getHomePageArticles } from '../../../services/article';

type Page = {
    tag: string,
    articles: Article[]
}

export default memo(function Homepage() {

    const history = useHistory();
    const goToSearch = () => {
        history.push('/search');
    }

    // State
    let [hasMore, setHasMore] = useState(true);
    let [pages, setPages] = useState<Page[]>([]);
    let [loading, setLoading] = useState(true);

    // Effect
    useEffect(() => {
        refresh();
    }, []);

    // 刷新页面
    const refresh = async () => {
        try {
            const res = (await getHomePageArticles()).pages as Page[];
            for (const page of res) {
                sorter(page.articles)
            }
            setPages(res);
            // 还原是否有更多评论的状态
            setHasMore(true);
            setLoading(false);
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
                            <TabPage loading={true} articles={[]} hasMore={false} loadMore={loadMore.bind(null, idx)} />
                        </Tabs.Tab>) :
                            pages.map((page, idx) => <Tabs.Tab title={page.tag} key={idx}>
                                <TabPage loading={false} articles={page.articles} hasMore={hasMore} loadMore={loadMore.bind(null, idx)} />
                            </Tabs.Tab>)}
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