import { Article } from "../PostDetail";
import Mock from 'mockjs';
import styled from "styled-components";
import { InfiniteScroll, PullToRefresh, Space, Toast } from "antd-mobile";
import ArticleCard from "./component/ArticleCard";
import { useState } from "react";
import { sleep } from "antd-mobile/es/utils/sleep";

const buildFake = () => {
    let data = Mock.mock({
        title: '@title',
        content: '@paragraph',
        'likes|0-20000': 20000,
        postDate: '@datetime',
        'articleId|0-20': 20,
        images: [],
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
    }
`