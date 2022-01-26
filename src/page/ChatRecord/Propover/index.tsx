import { Popover, Avatar } from 'antd-mobile'
import styled from 'styled-components'

export const RightPropover = () => {

    return (
        <MyDialogRight>
            <Popover content='Hello World' placement={'right'} defaultVisible visible>
                <Avatar src={demoAvatarImages[0]} style={{ borderRadius: '50%', '--size': '60px' }} />
            </Popover>
        </MyDialogRight>
    )
}

// Popover组件使用时，如果气泡在左侧，如果左侧空间不够，默认会将气泡移动到右侧
export const LeftPropover = () => {

    return (
        <MyDialog>
            <Popover content='Hello World' placement={'left'} defaultVisible visible>
                <Avatar src={demoAvatarImages[0]} style={{ borderRadius: '50%', '--size': '60px' }} />
            </Popover>
        </MyDialog>
    )
}
const demoAvatarImages = [
    'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
]
const MyDialog = styled.div`
    padding: 10px;
    padding-bottom: 0;
    display: flex;
    justify-content: flex-end;
`
const MyDialogRight = styled.div`
    padding: 10px;
    padding-bottom: 0;
`