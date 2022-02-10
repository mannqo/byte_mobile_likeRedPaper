import { DotLoading, Space, SpinLoading } from "antd-mobile";
import styled from "styled-components";

export default function ImagePlaceholder() {
    return <Container>
        <Space className="loading" align="center" justify="center">
            <SpinLoading color='primary' />
        </Space>
    </Container>
}

const Container = styled.div`
    width: 100%;
    height: 150px;
    background-color: rgb(243,243,243);
    font-size: 16px;

    .loading {
        width: 100%;
        height: 100%;
    }
`