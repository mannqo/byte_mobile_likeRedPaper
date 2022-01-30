import { memo } from 'react';
import { NavBar, Space, Toast, Tabs } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export default memo(function Homepage() {
    const history = useHistory();
    const goToSearch = () => {
        history.push('/search');
    }
    const right = (
        <div style={{ fontSize: 20 }}>
            <Space>
                <SearchOutline onClick={goToSearch} />
            </Space>
        </div>
    )
    const back = () =>
        Toast.show({
            content: '记录我的日常',
            duration: 1000,
        })

    return (
        <TabsContainer>
            <NavBar right={right} onBack={back}> 首页 </NavBar>
            <Tabs defaultActiveKey='1'>
                <Tabs.Tab title='推荐' key='1'> 1 </Tabs.Tab>
                <Tabs.Tab title='旅行' key='2'> 2 </Tabs.Tab>
                <Tabs.Tab title='美食' key='3'> 3 </Tabs.Tab>
                <Tabs.Tab title='时尚' key='4'> 4 </Tabs.Tab>
                <Tabs.Tab title='彩妆' key='5'> 5 </Tabs.Tab>
                <Tabs.Tab title='高效' key='6'> 6 </Tabs.Tab>
                <Tabs.Tab title='护肤' key='7'> 7 </Tabs.Tab>
            </Tabs>
        </TabsContainer>
    )
})
const TabsContainer = styled.div`
    height: 90vh;
`