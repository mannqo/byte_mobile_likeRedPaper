import { memo, useState } from 'react';
import { NavBar, Space, Toast, Tabs, PullToRefresh } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TabPage from '../../TabPage';
import { sleep } from 'antd-mobile/es/utils/sleep';

export default memo(function Homepage() {

    const history = useHistory();
    const goToSearch = () => {
        history.push('/search');
    }

    // State
    let [hasMore, setHasMore] = useState(true);

    // 刷新页面
    const refresh = async () => {
        try {
            await sleep(1000);
            // 还原是否有更多评论的状态
            setHasMore(true);
        } catch (err) {
            Toast.show((err as Error).message);
        }
    }

    const loadMore = async (tabIndex: number) => {
        await sleep(1000);
        // Toast.show('刷新了页面' + tabIndex);
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
                            <TabPage hasMore={hasMore} loadMore={loadMore.bind(null, 1)} />
                        </Tabs.Tab>
                        <Tabs.Tab title='旅行' key='2'> 2 </Tabs.Tab>
                        <Tabs.Tab title='美食' key='3'> 3 </Tabs.Tab>
                        <Tabs.Tab title='时尚' key='4'> 4 </Tabs.Tab>
                        <Tabs.Tab title='彩妆' key='5'> 5 </Tabs.Tab>
                        <Tabs.Tab title='高效' key='6'> 6 </Tabs.Tab>
                        <Tabs.Tab title='护肤' key='7'> 7 </Tabs.Tab>
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