import { memo } from 'react'
import { Space, NavBar, TabBar } from 'antd-mobile'
import { HeartFill, MessageFill, TeamFill } from 'antd-mobile-icons'
import styled from 'styled-components'
import MessageList from '../../../component/MessageList'
import { useHistory } from 'react-router-dom'

export default memo(function Message() {
    const history = useHistory();
    const createChatting = () => {
        history.push('/message/chat');
    }
    
    const right = (
        <div onClick={createChatting} style={{ fontSize: 16 }}>
            创建聊天
        </div>
    )
    const getList = (e) => {
        switch (e) {
            case '1': history.push('/person/like'); break;
            case '2': history.push('/person/fans'); break;
            case '3': history.push('/person/comment'); break;
            default: console.log(1);
        }
    }

    return (
        <>
            <NavBar right={right}>
                消息
            </NavBar>
            <Space wrap >
                <IconContainer>
                    <TabBar className='TabbarWrapper' onChange={getList} defaultActiveKey='0'>
                        <TabBar.Item style={{ 'transform': 'scale(1.2)' }} key='1' icon={<HeartFill color='#ed7370' />} title='赞和收藏' />
                        <TabBar.Item style={{ 'transform': 'scale(1.2)' }} key='2' icon={<TeamFill color='#5690f3' />} title='新增关注' />
                        <TabBar.Item style={{ 'transform': 'scale(1.2)' }} key='3' icon={<MessageFill color='#59ce9e' />} title='评论和@' />
                    </TabBar>
                </IconContainer>
            </Space>
            <MessageList></MessageList>
        </>
    )
})
const IconContainer = styled.div`
    width: 100vw;
    padding: 20px 0;
    display: flex;
    justify-content: space-between; 
    .TabbarWrapper {
        flex: 1; 
        .icon {

        }
    } 
`