import { Article } from "../PostDetail";
import styled from "styled-components";
import { InfiniteScroll } from "antd-mobile";
import ArticleCard from "./component/ArticleCard";

export default function TabPage({
    hasMore,
    loadMore,
    articles,
}: {
    hasMore: boolean,
    loadMore: Function,
    articles: Article[]
}) {
    return <Container>
        <div className="page">
            <div className="container">
                {articles.map((article, idx) => <ArticleCard key={idx} article={article} />)}
            </div>
            <InfiniteScroll hasMore={hasMore} loadMore={async () => await loadMore()} />
        </div>
    </Container>;
}

const Container = styled.div`
    * {
        box-sizing: border-box;
    }

    .page {
        margin-bottom: 32px;
    }

    .container {
        column-count: 2;
        column-gap: 8px;
    }

    .container > * {
        break-inside: avoid;
        margin-bottom: 10px;
    }
`