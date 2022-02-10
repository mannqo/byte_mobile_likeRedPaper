import { Skeleton, Space } from "antd-mobile";
import { HeartOutline } from "antd-mobile-icons";
import styled from "styled-components";

export default function SkeletonCard() {
    return <Container>
        <div className="card">
            <div className="content">
                <Skeleton.Title animated />
                <Space className="content-bottom" align="center" justify="between" block>
                    <Space align="center" block>
                        <div style={{
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            backgroundColor: 'rgb(243,243,243)'
                        }} />
                        <Skeleton.Title />
                    </Space>
                    <Space align="center" style={{ '--gap-horizontal': '3px' }} block>
                        <HeartOutline />
                    </Space>
                </Space>
            </div>
        </div>
    </Container>;
}

const Container = styled.div`
    * {
        box-sizing: border-box;
    }

    .head-img{
        border-top-left-radius: 8px; 
        border-top-right-radius: 8px; 
    }

    .card {
        break-inside: avoid;
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    }

    .content {
        padding: 8px;
    }

    .content > h3 {
        margin: 4px 0 8px;
    }

    .content-bottom > :first-child {
        flex: auto;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`