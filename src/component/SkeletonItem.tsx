import { List, Skeleton } from 'antd-mobile'

export default function SkeletonItem() {
    return (
        <List.Item
            prefix={
                <div
                    style={{
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        backgroundColor: 'rgb(243,243,243)'
                    }}
                />
            }
            onClick={() => { }}
        >
            <Skeleton.Title animated />
        </List.Item>
    )
}

