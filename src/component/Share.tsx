import { Popup, Space } from "antd-mobile"
import {
    TwitterShareButton,
    TwitterIcon,
    TelegramShareButton,
    TelegramIcon,
    WeiboShareButton,
    WeiboIcon,
    EmailShareButton,
    EmailIcon
} from 'react-share';

export default function Share({ visible, setVisible }: { visible: boolean, setVisible: Function }) {
    
    return <Popup
        visible={visible}
        onMaskClick={() => {
            setVisible(false)
        }}
        bodyStyle={{ padding: '0 12px 12px', boxSizing: 'border-box' }}
    >
        <p>分享到...</p>
        <Space block justify="around">
            <TwitterShareButton url={global.location.href}>
                <TwitterIcon round />
            </TwitterShareButton>
            <TelegramShareButton url={global.location.href}>
                <TelegramIcon round />
            </TelegramShareButton>
            <WeiboShareButton url={global.location.href}>
                <WeiboIcon round />
            </WeiboShareButton>
            <EmailShareButton url={global.location.href}>
                <EmailIcon round />
            </EmailShareButton>
        </Space>
    </Popup>
}