import { Popover, Avatar } from 'antd-mobile';
import './index.css';
import cookie from 'react-cookies';
import { useHistory } from 'react-router-dom';

export const PropoverWrapper = (props) => {
    const { userInfo, chatRecord } = props;
    const user = cookie.load('userInfo');

    return (
        <div className='popover'>
            {
                chatRecord && chatRecord.map(record => (
                    record.userId == user.userId ?
                        <PopoverItem
                            key={record._id}
                            avatar={user.avatar}
                            userId={userInfo.userId}
                            content={record.message}
                            direct='left'
                            classname='dialog leftDialog' />
                        : <PopoverItem
                            key={record._id}
                            avatar={userInfo.avatar}
                            userId={userInfo.userId}
                            content={record.message}
                            direct='right'
                            classname='dialog rightDialog'
                        />
                ))
            }
        </div>
    )
}

const PopoverItem = (props) => {
    const { userId, avatar, content, direct, classname } = props;
    const history = useHistory();
    const toPersonalPage = async () => {
        history.push('/other/page/' + userId);
    }
    return (
        <div className={classname}>
            <Popover content={content} placement={direct} defaultVisible visible>
                <Avatar onClick={toPersonalPage} src={avatar} style={{ borderRadius: '50%', '--size': '60px' }} />
            </Popover>
        </div>
    )
}

// Popover组件使用时，如果气泡在左侧，如果左侧空间不够，默认会将气泡移动到右侧