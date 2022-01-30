import { Space } from "antd-mobile";
import styled from "styled-components";
import { Article } from "../../PostDetail";

export default function ArticleCard({ article }: { article: Article }) {
    return <Container>
        <div className="card">
            <h3>{article.title}</h3>
            <div>{article.content}</div>
        </div>
    </Container>;
}

const Container = styled.div`
    * {
        box-sizing: border-box;
    }

    .card {
        break-inside: avoid;
        width: 100%;
        padding: 12px;
        border-radius: 16px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    }
`