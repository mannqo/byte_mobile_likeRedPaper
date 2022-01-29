import { Avatar } from "antd-mobile";

export default function MyAvatar({ src, onClick }: { src: string, onClick?: Function }) {
    return <Avatar
        src={src}
        onClick={() => onClick?.call(null)}
        style={{
            'borderRadius': '16px',
            '--size': '32px',
        }}
    ></Avatar>
}