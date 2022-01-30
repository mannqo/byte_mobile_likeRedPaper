import { Popover, Avatar } from 'antd-mobile';
import './index.css';
import cookie from 'react-cookies';


export const PropoverWrapper = (props) => {
    const { userInfo, chatRecord } = props;
    const user = cookie.load('userInfo');

    return (
        <div>
            {
                chatRecord && chatRecord.map(record => (
                    record.userId == user.userId ?
                        <PopoverItem
                            key={record._id}
                            avatar={user.avatar}
                            content={record.message}
                            direct='left'
                            classname='leftDialog' />
                        : <PopoverItem
                            key={record._id}
                            avatar={userInfo.avatar}
                            content={record.message}
                            direct='right'
                            classname='rightDialog'
                        />
                ))
            }
        </div>
    )
}

const PopoverItem = (props) => {
    const { avatar, content, direct, classname } = props;
    return (
        <div className={classname}>
            <Popover content={content} placement={direct} defaultVisible visible>
                <Avatar src={avatar} style={{ borderRadius: '50%', '--size': '60px' }} />
            </Popover>
        </div>
    )
}

// Popover组件使用时，如果气泡在左侧，如果左侧空间不够，默认会将气泡移动到右侧