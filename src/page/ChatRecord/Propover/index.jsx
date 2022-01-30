import { Popover, Avatar } from 'antd-mobile'
import './index.css'


export const PropoverWrapper = (props) => {
    const { userInfo, chatRecord } = props; 
    return (
        chatRecord && chatRecord.map(record => (
            record.userId === 1 ?
                <PopoverItem
                    key={record._id}
                    avatar={userInfo.avatar}
                    content={record.message}
                    direct={'left'}
                    classname='leftDialog' />
                : <PopoverItem
                    key={record._id}
                    avatar={userInfo.avatar}
                    content={record.message}
                    direct={'right'}
                    classname='rightDialog'
                />
        )) || <></>
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