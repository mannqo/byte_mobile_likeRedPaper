import { Button, Dialog, InfiniteScroll, Input, NavBar, Popup, PullToRefresh, Space, Swiper, Tag, TextArea, Toast } from "antd-mobile";
import {
    SendOutline,
    FrownOutline,
    HeartOutline,
    StarOutline,
    MessageOutline,
    UserCircleOutline,
    SmileOutline,
    HeartFill,
    StarFill,
} from 'antd-mobile-icons'
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MyAvatar from "./component/MyAvatar";
import { ReviewArea } from "./component/review";
import { sleep } from 'antd-mobile/es/utils/sleep';
import { getArticleById, likeArticle, getLikedArticles, starArticle, unlikeArticle, unstarArticle, getStaredArticles } from "../../services/article";
import { cancelFollow, followOthers, getBaseUserInfo, getFollowsList } from "../../services/users";
import { getLikedReviews, postReview } from "../../services/review";
import { ExecuteError } from "../../services/axios";
import cookie from 'react-cookies';

type UserInfo = {
    avatar: string,
    nickname: string,
    userId: number,
}

type UserFullInfo = {
    avatar: string,
    nickname: string,
    userId: number,
    fans: number[],
    follows: number[],
    likedArticles: string[],
    likedReviews: string[],
    staredArticles: string[],
}

type NumOrString = number | string;
type Article = {
    _id: string,
    authorId: number,
    images: string[],
    title: string,
    content: string,
    tags: string[],
    likes: NumOrString,
    stars: NumOrString,
    reviews: NumOrString,
    postDate: string,
    articleId: number
}
type Review = {
    _id: string,
    authorId: number,
    authorInfo: UserInfo,
    content: string,
    likes: NumOrString,
    postDate: string,
    reviewId: number,
    replyToUserId: number,
    replyToArticleId: number,
    parentReviewId?: number,
    reviewList: Review[]
}
export type { UserFullInfo, UserInfo, Article, Review };

export default function PostDetail() {
    const history = useHistory();
    const userInfo = cookie.load('userInfo') as UserFullInfo;
    if (!userInfo) history.push('/login');

    const param = useParams<{ articleId: string | undefined }>()
    const articleId = Number(param.articleId);

    // State
    let [article, setArticle] = useState<Article>({
        _id: '',
        authorId: 0,
        images: [],
        title: "",
        content: "",
        tags: [],
        likes: 0,
        stars: 0,
        reviews: 0,
        postDate: "",
        articleId: 0
    });
    let [reviews, setReviews] = useState<Review[]>([]);
    let [authorInfo, setAuthorInfo] = useState<UserInfo>({
        avatar: "",
        nickname: "",
        userId: 0
    });
    let [followed, setFollowed] = useState(false);
    let [liked, setLiked] = useState(false);
    let [stared, setStared] = useState(false);
    let [likedReviews, setLikedReviews] = useState<string[]>([]);
    let [popupVisible, setPopupVisible] = useState(false);
    let [showPostBtn, setShowPostBtn] = useState(false);
    let [inputValue, setInputValue] = useState('');
    let [hasMoreReviews, setHasMoreReviews] = useState(true);
    // 评论发布相关
    let [inputPlaceHolder, setInputPlaceHolder] = useState('喜欢就给个评论支持一下~');
    type ReviewTo = { userId: number, parentReviewId?: number };
    let [reviewTo, setReviewTo] = useState<ReviewTo>({
        userId: 0
    });

    // Effect
    useEffect(() => {
        refresh();
    }, []);

    // 返回上一级按钮
    const back = () => {
        history.go(-1);
    }

    // 刷新页面
    const refresh = async () => {
        try {
            const json = await getArticleById({ articleId });
            const article = json.article as Article;
            const reviewJson = json.article.reviewList as Review[];
            for (const reviewItem of reviewJson) {
                await fillReviewAuthorInfo(reviewItem);
            }
            const authorJson = (await getBaseUserInfo({ userId: article.authorId })).user;
            authorJson.userId = article.authorId;
            const followsList = (await getFollowsList({ userId: userInfo.userId })).followsList.map((i: any) => i.userId);
            const likedArticles = (await getLikedArticles({ userId: userInfo.userId })).likedArticles.map((i: any) => i._id);;
            const staredArticles = (await getStaredArticles({ userId: userInfo.userId })).staredArticles.map((i: any) => i._id);;
            const reviews = (await getLikedReviews({ userId: userInfo.userId })).likedReviews.map((i: any) => i._id);;
            // 排序
            sorter(reviewJson);
            reviewJson.forEach(function f(item) {
                sorter(item.reviewList);
            })
            // 格式化
            converter(article);
            reviewJson.forEach(function f(item) {
                converter(item);
                item.reviewList.forEach(f);
            })
            // 更新state
            setLiked(likedArticles.includes(article._id));
            if (likedArticles.includes(article._id) && typeof article.likes === 'number') {
                article.likes -= 1;
            }
            setStared(staredArticles.includes(article._id));
            if (staredArticles.includes(article._id) && typeof article.stars === 'number') {
                article.stars -= 1;
            }
            setArticle(article);
            setReviews(reviewJson);
            setAuthorInfo(authorJson);
            setFollowed(followsList.includes(authorInfo.userId));
            setLikedReviews(reviews);
            // 还原是否有更多评论的状态
            setHasMoreReviews(true);
        } catch (err) {
            Toast.show((err as ExecuteError).message);
        }
    }

    // 加载更多评论
    const loadMoreReviews = async () => {
        // Toast.show('正在加载更多评论...');
        await sleep(2000);
        // Toast.show('加载完成');
        setHasMoreReviews(false);
    }

    // 分享按钮
    const shareBtn = () => {
        Toast.show('分享');
    }

    // 关注文章作者的按钮
    const followBtn = async () => {
        try {
            if (followed) {
                // 取消关注
                Dialog.confirm({
                    content: '是否要取消关注？',
                    onConfirm: async () => {
                        await cancelFollow({ userId: userInfo.userId, followerId: authorInfo.userId });
                        setFollowed(false);
                    },
                    closeOnMaskClick: true
                })
            } else {
                // 关注
                await followOthers({ userId: userInfo.userId, followerId: authorInfo.userId });
                setFollowed(true);
            }
        } catch (err) {
            Toast.show((err as ExecuteError).message);
        }
    }

    // 不喜欢这篇文章的按钮
    const dislikeBtn = (e: React.MouseEvent) => {
        Toast.show('不喜欢');
    }

    // 跳转到指定用户主页
    const gotoUserPage = (userId: number) => {
        history.push('/other/page/' + userId);
    }

    // 跳转到搜索...
    const search = (text: string) => {
        Toast.show('搜索：' + text);
    }

    // 喜欢按钮
    const likeBtn = async () => {
        try {
            if (liked) {
                await unlikeArticle({ userId: userInfo.userId, articleId: articleId });
            } else {
                await likeArticle({ userId: userInfo.userId, articleId: articleId });
            }
            setLiked(!liked);
        } catch (err) {
            Toast.show((err as ExecuteError).message);
        }
    }

    // 收藏按钮
    const starBtn = async () => {
        try {
            if (stared) {
                await unstarArticle({ userId: userInfo.userId, articleId: articleId });
            } else {
                await starArticle({ userId: userInfo.userId, articleId: articleId });
            }
            setStared(!stared);
        } catch (err) {
            Toast.show((err as ExecuteError).message);
        }
    }

    // 打开评论弹出层
    const reviewBtn = (userId: number, userName?: string, parentReviewId?: number) => {
        if (userName) {
            setInputPlaceHolder(`回复@${userName}：`);
        } else {
            setInputPlaceHolder("喜欢就给个评论支持一下~");
        }
        setReviewTo({ userId, parentReviewId });
        setPopupVisible(true);
        const input = document.querySelector('.popup textarea');
        if (input instanceof HTMLElement) {
            // 延迟执行，保证在遮罩层弹出后再focus
            setTimeout(() => { input.focus() });
        }
    }

    // 发布评论
    const postBtn = async () => {
        try {
            await postReview({
                replyToUserId: reviewTo.userId,
                replyToArticleId: articleId,
                parentReviewId: reviewTo.parentReviewId,
                authorId: userInfo.userId,
                content: inputValue,
            });
            setInputValue('');
            Toast.show('发布成功');
            refresh();
        } catch (err) {
            Toast.show((err as ExecuteError).message);
        }
    }

    // 顶栏右边的关注和分享按钮
    const right = <Space align="end" style={{
        fontSize: '24px',
        '--gap-horizontal': '12px',
    }}>
        <Button
            size="mini"
            fill="outline"
            shape="rounded"
            color={followed ? "default" : "primary"}
            onClick={followBtn}>
            {followed ? '已关注' : '关注'}
        </Button>
        <SendOutline onClick={shareBtn} style={{ cursor: 'pointer' }} />
    </Space>

    // 轮播图Items
    const swiperItems = article.images.map((url, idx) =>
        <Swiper.Item key={idx}>
            <img src={url} style={{ width: '100%' }}></img>
        </Swiper.Item>
    )

    // 文章的Tags
    const tagItems = article.tags.map((text, idx) =>
        <Tag
            className="tag"
            color="primary"
            fill="outline"
            style={{
                '--border-color': 'transparent',
                'cursor': 'pointer'
            }}
            key={idx}
            onClick={() => search(text)}
        >
            {text}
        </Tag>
    )

    return (
        <Container>
            {/* 顶部导航栏 */}
            <NavBar onBack={back} right={right} className="nav">
                <Space
                    className="top"
                    align="center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => gotoUserPage(authorInfo.userId)}
                >
                    <MyAvatar src={authorInfo.avatar} />
                    <span style={{ fontSize: '1rem' }}>{authorInfo.nickname}</span>
                </Space>
            </NavBar>
            {/* 主体（文章详情&评论区） */}
            <div className="content">
                <PullToRefresh onRefresh={refresh}>
                    {/* 轮播图 */}
                    {swiperItems.length > 0 ? <Swiper rubberband={false} style={{ '--track-padding': ' 0 0 12px' }}>{swiperItems}</Swiper> : undefined}
                    {/* 文章主体（包括评论） */}
                    <article>
                        {/* 文章详情 */}
                        <h3>{article.title}</h3>
                        <div>{article.content}</div>
                        {tagItems.length > 0 ? <Space block wrap={true} style={{ '--gap-vertical': '0' }}>{tagItems}</Space> : undefined}
                        <Space block justify="between" align="center">
                            <span className="date">{article.postDate}</span>
                            <Button
                                size="mini"
                                fill="outline"
                                shape="rounded"
                                color="default"
                                onClick={dislikeBtn}>
                                <FrownOutline /> 不喜欢
                            </Button>
                        </Space>
                        {/* 过渡 */}
                        <hr />
                        {/* 中部评论工具栏 */}
                        <Space block>{`共 ${article.reviews} 条评论`}</Space>
                        <Space className="review-space" block align="center">
                            <MyAvatar src={userInfo.avatar} />
                            <div onClick={() => reviewBtn(authorInfo.userId)} style={{ flexGrow: '1' }}>
                                <Input
                                    placeholder="说点什么吧，万一火了呢~"
                                    disabled
                                    style={{
                                        '--font-size': '0.8rem',
                                        backgroundColor: 'rgb(204, 204, 204, 0.4)',
                                        '--placeholder-color': 'grey',
                                        padding: '4px 16px',
                                        borderRadius: 'calc(0.8rem + 4px)',
                                        cursor: 'text'
                                    }}
                                />
                            </div>
                        </Space>
                        {/* 评论展示区域 */}
                        <ReviewArea reviews={reviews} likedReviews={likedReviews} enterUserHomePage={gotoUserPage} reviewCallback={reviewBtn} />
                        <InfiniteScroll hasMore={hasMoreReviews} loadMore={() => loadMoreReviews()} />
                    </article>
                </PullToRefresh>
            </div>
            {/* 底部fixed栏 */}
            <Space className="bottom" block align="center">
                <div onClick={() => reviewBtn(authorInfo.userId)}>
                    <Input
                        placeholder="✏️ 说点什么..."
                        style={{
                            '--font-size': '1rem',
                            backgroundColor: 'rgb(204, 204, 204, 0.4)',
                            '--placeholder-color': 'grey',
                            padding: '4px 16px',
                            borderRadius: 'calc(1rem + 4px)',
                            cursor: 'text',
                        }}
                        disabled
                    />
                </div>
                <Space
                    align="center"
                    style={{ '--gap-horizontal': '2px', cursor: 'pointer' }}
                    onClick={() => likeBtn()}
                >
                    {liked ? < HeartFill fontSize="28px" style={{ cursor: 'pointer' }} color="red" /> :
                        <HeartOutline fontSize="28px" style={{ cursor: 'pointer' }} />}
                    {
                        typeof article.likes === 'number' ? (article.likes + (liked ? 1 : 0)) : article.likes
                    }
                </Space>
                <Space
                    align="center"
                    style={{ '--gap-horizontal': '2px', cursor: 'pointer' }}
                    onClick={() => starBtn()}
                >
                    {stared ? <StarFill fontSize="28px" style={{ cursor: 'pointer' }} color="orange" /> :
                        <StarOutline fontSize="28px" style={{ cursor: 'pointer' }} />}
                    {
                        typeof article.stars === 'number' ? (article.stars + (stared ? 1 : 0)) : article.stars
                    }
                </Space>
                <Space
                    align="center"
                    style={{ '--gap-horizontal': '2px', cursor: 'pointer' }}
                    onClick={() => reviewBtn(authorInfo.userId)}
                >
                    <MessageOutline fontSize="28px" style={{ cursor: 'pointer' }} />
                    {article.reviews}
                </Space>
            </Space>
            {/* 评论弹出层 */}
            <Popup
                visible={popupVisible}
                onMaskClick={() => setPopupVisible(false)}
            >
                <PopupContainer>
                    <Space className="popup" block style={{ '--gap-horizontal': '0' }}>
                        <Space className="input" block align="center">
                            <TextArea
                                value={inputValue}
                                placeholder={inputPlaceHolder}
                                rows={1}
                                style={{
                                    '--font-size': '1rem',
                                    '--placeholder-color': 'grey',
                                    cursor: 'text'
                                }}
                                onChange={(str) => {
                                    setInputValue(str);
                                    str === '' ? setShowPostBtn(false) : setShowPostBtn(true);
                                }}
                            />
                            {/* @他人的按钮 */}
                            <UserCircleOutline
                                onClick={() => {
                                    setInputValue(inputValue + '@');
                                    const input = document.querySelector('.popup textarea');
                                    if (input instanceof HTMLElement) {
                                        input.focus();
                                    }
                                }}
                            />
                            {/* TODO: 添加表情的按钮 */}
                            <SmileOutline />
                        </Space>
                        <Button
                            className={showPostBtn ? "" : "hidden"}
                            style={{ marginLeft: '4px' }}
                            color="primary"
                            shape="rounded"
                            onClick={() => postBtn()}
                        >
                            发送
                        </Button>
                    </Space>
                </PopupContainer>
            </Popup>
        </Container>
    );
}

// 美化过万数字
const parseNum = (num: number | string) => {
    if (typeof num === 'string') {
        return num;
    }
    if (num < 10000) {
        return num;
    }
    return (num / 10000).toFixed(1) + '万';
}

// 解析并美化日期字符串
const parseDate = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    if (now.getFullYear() === date.getFullYear()) {
        // 今年
        if (date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
            // 当天
            let second = Math.floor((now.getTime() - date.getTime()) / 1000);
            if (second < 60) {
                return '刚刚';
            } else if (second < 3600) {
                let minute = Math.floor(second / 60);
                return minute + ' 分钟前';
            } else {
                let hour = Math.floor(second / 3600);
                return hour + ' 小时前';
            }
        } else {
            date.setDate(date.getDate() + 1);
            if (date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
                // 昨天
                return '昨天 ' + `0${date.getHours()}`.slice(-2) + ':' + `${date.getMinutes()}`.slice(-2);
            } else {
                // 今年
                date.setDate(date.getDate() - 1);
                // 去掉年份
                return date.toLocaleDateString().replaceAll('/', '-').slice(5);
            }
        }
    } else {
        // 不是今年
        return date.toLocaleDateString().replaceAll('/', '-');
    }
}

// Num和Date格式转换器
export const converter = (obj: { likes?: number | string, stars?: number | string, reviews?: number | string | Array<any>, postDate?: string }) => {
    if (obj.likes !== undefined) {
        obj.likes = parseNum(obj.likes);
    }
    if (obj.stars !== undefined) {
        obj.stars = parseNum(obj.stars);
    }
    if (obj.reviews !== undefined && !(obj.reviews instanceof Array)) {
        obj.reviews = parseNum(obj.reviews);
    }
    if (obj.postDate !== undefined) {
        obj.postDate = parseDate(obj.postDate);
    }
}

// 根据likes数和postDate排序，likes数优先，其次是postDate
const sorter = (arr: Array<{ likes: number | string, postDate: string }>) => {
    // 从大到小排
    arr.sort((b, a) => {
        if (a.likes !== b.likes) {
            return (a.likes as number) - (b.likes as number);
        } else {
            return (new Date(a.postDate)).getTime() - (new Date(b.postDate)).getTime();
        }
    })
}

// 根据authorId获取对应authorInfo并填充
const fillReviewAuthorInfo = async (review: Review) => {
    try {
        for (const reviewItem of review.reviewList) {
            await fillReviewAuthorInfo(reviewItem);
        }
        review.authorInfo = (await getBaseUserInfo({ userId: review.authorId })).user as UserInfo;
        review.authorInfo.userId = review.authorId;
    } catch (err) {
        Toast.show((err as ExecuteError).message);
    }
}

const Container = styled.div` 
    *{
        box-sizing: border-box;
    }

    .nav {
        position: fixed;
        top: 0;
        width: 100%;
        background-color: #fff;
        z-index: 999;
    }

    .content {
        margin-top: 45px;
    }

    button[type="button"]{
        font-size: 12px;
        white-space: pre;
    }

    .adm-nav-bar-left{
        flex: 0;
    }
    
    .top{
        width: 100%;
    }

    .adm-swiper-track-inner{
        align-items: center;
    }

    article{
        padding: 0 12px;
        margin-bottom: 36px;
    }

    article *{
        white-space: pre-line;
        line-height: 1.2rem;
    }

    article h3{
        margin: 8px 0;
    }

    article > *{
        margin: 4px 0;
    }

    .tag::before{
        content: '#'
    }

    .date{
        color: grey;
        font-size: 0.7em;
    }

    hr{
        margin: 12px 0;
        border-color: #f8f8f838;
        border-width: 0.5px 0 0 0;
    }

    input[disabled]{
        cursor: text;
    }

    .review-space>:last-child{
        display: flex;
        flex-grow: 1;
    }

    .bottom{
        position: fixed;
        width: 100%;
        padding: 6px 12px;
        background-color: white;
        bottom: 0;
        font-weight: bold;
    }

    .bottom>:first-child{
        flex: auto;
    }
`

const PopupContainer = styled.div`
    *{
        box-sizing: border-box;
    }

    .popup{
        padding: 6px 12px;
    }

    .input{
        background-color: rgb(204, 204, 204, 0.4);
        border-radius: calc(1rem + 4px);
        padding: 4px 16px;
        font-size: 28px;
    }

    .popup>:first-child,
    .input>:first-child{
        flex: auto;
    }

    .hidden{
        display: none;
    }
`