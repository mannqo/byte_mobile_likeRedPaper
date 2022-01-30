import { FC } from 'react'
import { TabBar } from 'antd-mobile'
import styled from 'styled-components';
import {
    useHistory,
    useLocation,
} from 'react-router-dom'
import {
    AppOutline,
    MessageOutline,
    UserOutline,
} from 'antd-mobile-icons'
import { renderRoutes } from 'react-router-config';

const Bottom: FC = () => {
    const history = useHistory()
    const location = useLocation()
    const { pathname } = location;

    const setRouteActive = (value: string) => {
        history.push(value)
    }

    const tabs = [
        {
            key: '/tabbar/home',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: '/tabbar/message',
            title: '我的消息',
            icon: <MessageOutline />,
        },
        {
            key: '/tabbar/me',
            title: '个人中心',
            icon: <UserOutline />,
        },
    ]

    return (
        <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    )
}


const Tabbar = (props: any) => {

    const route = props.route;

    return (
        <TabbarContainer>
            <div className="app">
                <div className="body">
                    {route && renderRoutes(route.routes)}
                </div>
                <div className="bottom">
                    <Bottom />
                </div>
            </div>
        </TabbarContainer>
    )
}

export default Tabbar;

const TabbarContainer = styled.div` 
    .bottom {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    
` 