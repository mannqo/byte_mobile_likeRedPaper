import { Article } from "../PostDetail";
import Mock from 'mockjs';
import styled from "styled-components";
import { InfiniteScroll } from "antd-mobile";
import ArticleCard from "./component/ArticleCard";

const buildFake = () => {
    let data = Mock.mock({
        title: '@title',
        content: '@paragraph',
        'likes|0-20000': 20000,
        postDate: '@datetime',
        'articleId|1-2': 2,
        images: [
            'https://cdn.jsdelivr.net/gh/tagbug/demo@latest/img/1620385114079.png',
            'https://cdn.jsdelivr.net/gh/tagbug/demo@latest/img/1611837869906.png',
            'https://cdn.jsdelivr.net/gh/tagbug/demo@latest/img/1612394877886.png',
            'https://cdn.jsdelivr.net/gh/tagbug/demo@latest/img/1636805552641.jpg',
        ],
        tags: [],
        stars: 0,
        reviews: 0,
    })
    return data as Article;
}

let articles: Article[] = [];
for (let i = 0; i < 10; i++) {
    articles[i] = buildFake();
}

export default function TabPage({
    hasMore,
    loadMore
}: {
    hasMore: boolean,
    loadMore: Function
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