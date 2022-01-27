import { Popover, Avatar } from 'antd-mobile'
import './index.css'

const userId = 1;
export const PropoverWrapper = (props) => {
    const { userInfo, chatRecord } = props;
    console.log(chatRecord);
    return (
        chatRecord && chatRecord.map(record => (
            record.userId === '1' ?
                <PopoverItem
                    key={record.time}
                    content={record.message}
                    direct={'left'}
                    classname='leftDialog' />
                : <PopoverItem
                    key={record.time}
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
                <Avatar src={avatar} style={{ borderRadius: '50%', '--size': '60px' }}  />
            </Popover>
        </div>
    )
}

// Popover组件使用时，如果气泡在左侧，如果左侧空间不够，默认会将气泡移动到右侧

const demoAvatarImages = [
    'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
]
