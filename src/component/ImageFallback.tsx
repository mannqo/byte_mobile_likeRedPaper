import { Space } from "antd-mobile";
import { PictureWrongOutline } from "antd-mobile-icons"
import styled from "styled-components";

export default function ImageFallback() {
    return <Container>
        <Space className="loading" align="center" justify="center">
            <PictureWrongOutline fontSize={24} />
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