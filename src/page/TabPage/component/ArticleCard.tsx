import { Avatar, Image, Space, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Article, converter, UserFullInfo, UserInfo } from "../../PostDetail";
import { HeartOutline, HeartFill } from 'antd-mobile-icons';
import { getBaseUserInfo } from "../../../services/users";
import { ExecuteError } from "../../../services/axios";
import { getLikedArticles, likeArticle, unlikeArticle } from "../../../services/article";
import cookie from 'react-cookies';
import { useHistory } from "react-router-dom";
import ImagePlaceholder from "../../../component/ImagePlaceholder";

export default function ArticleCard({ article }: { article: Article }) {
    const userInfo = cookie.load('userInfo') as UserFullInfo;
    if (!userInfo) window.location.replace('/#/login');

    // 格式化
    converter(article);

    const history = useHistory();

    // State
    let [authorInfo, setAuthorInfo] = useState<UserInfo>({
        avatar: "",
        nickname: "",
        userId: 0
    });
    let [liked, setLiked] = useState(false);
    let [likes, setLikes] = useState(article.likes);

    // Effect
    useEffect(() => {
        updateAuthorInfo();
    }, [])

    // 更新文章作者信息
    const updateAuthorInfo = async () => {
        try {
            let userJson = (await getBaseUserInfo({ userId: article.authorId })).user as UserInfo;
            setAuthorInfo(userJson);
            const likedArticles = (await getLikedArticles({ userId: userInfo.userId })).likedArticles.map((i: any) => i._id);;
            setLiked(likedArticles.includes(article._id));
            if (likedArticles.includes(article._id) && typeof likes === 'number') {
                setLikes(likes - 1);
            }
        } catch (err) {
            console.log((err as ExecuteError).message);
        }
    }

    // 跳转到文章详情页
    const turnToPostDetail = () => {
        history.push('/post/detail/' + article.articleId);
    }

    // 跳转到作者个人主页
    const turnToUserPage = () => {
        history.push('/other/page/' + authorInfo.userId);
    }

    // 喜欢按钮
    const likeBtn = async () => {
        try {
            if (liked) {
                await unlikeArticle({ userId: userInfo.userId, articleId: article.articleId });
            } else {
                await likeArticle({ userId: userInfo.userId, articleId: article.articleId });
            }
            setLiked(!liked);
        } catch (err) {
            Toast.show((err as ExecuteError).message);
        }
    }

    return <Container>
        <div className="card">
            {article.images.length > 0 ?
                <Image
                    src={article.images[0]}
                    className="head-img"
                    placeholder={<ImagePlaceholder />}
                    onClick={turnToPostDetail}
                    style={{ cursor: 'pointer' }}
                />
                : undefined
            }
            <div className="content">
                <h3 onClick={turnToPostDetail} style={{ cursor: 'pointer' }}>{article.title}</h3>
                {/* <div>{article.content}</div> */}
                <Space className="content-bottom" align="center" justify="between" block>
                    <Space align="center" onClick={turnToUserPage} style={{ cursor: 'pointer' }} block>
                        <Avatar
                            src={authorInfo.avatar}
                            style={{
                                '--size': '24px',
                                'borderRadius': '12px'
                            }}
                        />
                        <div style={{ textOverflow: 'ellipsis' }}>{authorInfo.nickname}</div>
                    </Space>
                    <Space align="center" onClick={likeBtn} style={{ cursor: 'pointer', '--gap-horizontal': '3px' }} block>
                        {liked ? < HeartFill color="red" /> :
                            <HeartOutline />}
                        {
                            typeof likes === 'number' ? (likes + (liked ? 1 : 0)) : article.likes
                        }
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