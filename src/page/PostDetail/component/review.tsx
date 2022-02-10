import { Space, Toast } from "antd-mobile";
import MyAvatar from "./MyAvatar";
import {
    HeartOutline,
    HeartFill,
} from 'antd-mobile-icons'
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Review, UserFullInfo } from "..";
import { likeReview, unlikeReview } from "../../../services/review";
import cookie from 'react-cookies'; 

export function ReviewArea({
    reviews,
    likedReviews,
    enterUserHomePage,
    reviewCallback
}: {
    reviews: Review[],
    likedReviews: string[],
    enterUserHomePage: (userId: number) => void,
    reviewCallback: (userId: number, userName?: string, parentReviewId?: number) => void,
}) {
    return (<>
        {reviews.map((review, idx) =>
            <ReviewItem
                info={review}
                likedReviews={likedReviews}
                enterUserHomePage={enterUserHomePage}
                reviewCallback={reviewCallback}
                key={idx}
            >
                <>
                    {review.reviewList.map((subReview, idx) =>
                        <ReviewItem
                            info={subReview}
                            likedReviews={likedReviews}
                            enterUserHomePage={enterUserHomePage}
                            reviewCallback={reviewCallback}
                            key={idx}
                            subReview={true}
                            replyTo={subReview.replyToUserId !== review.authorId ? review.reviewList.find(i => i.authorId === subReview.replyToUserId)?.authorInfo.nickname : undefined}
                        />
                    )}
                    <hr style={{
                        marginLeft: '40px',
                        color: 'rgb(206, 206, 206, 0.2)'
                    }} />
                </>
            </ReviewItem>
        )}
    </>)
}

export function ReviewItem({
    info: { authorInfo, content, postDate, likes, reviewId, parentReviewId, _id },
    likedReviews,
    enterUserHomePage,
    reviewCallback,
    children,
    subReview = false,
    replyTo,
}: {
    info: Review,
    likedReviews: string[],
    enterUserHomePage: (userId: number) => void,
    reviewCallback: (userId: number, userName?: string, parentReviewId?: number) => void,
    children?: React.ReactElement<any, any>,
    subReview?: boolean,
    replyTo?: string,
}) {
    const subReviewStyle = {
        paddingLeft: '40px',
        marginTop: '8px'
    }

    const { userId } = cookie.load('userInfo') as UserFullInfo;

    // State
    let [liked, setLiked] = useState(false);
    let [hasLiked, setHasLiked] = useState(false);
    useEffect(() => {
        if (likedReviews.includes(_id)) {
            setLiked(true);
            setHasLiked(true);
        }
    }, [likedReviews]);

    if (hasLiked && typeof likes === 'number') {
        likes -= 1;
    }

    // 喜欢按钮
    const likeBtn = async () => {
        try {
            if (liked) {
                await unlikeReview({ userId, reviewId });
            } else {
                await likeReview({ userId, reviewId });
            }
            setLiked(!liked);
        } catch (err) {
            Toast.show((err as Error).message);
        }
    }

    return <ReviewItemContainer>
        <Space
            style={subReview ? subReviewStyle : {}}
            className="review-item"
            block
            align="start"
        >
            <MyAvatar src={authorInfo.avatar} onClick={() => enterUserHomePage(authorInfo.userId)} />
            <Space
                direction="vertical"
                style={{
                    '--gap-vertical': '2px'
                }}
            >
                <div className="review-author">
                    <span
                        onClick={() => enterUserHomePage(authorInfo.userId)}
                        style={{ cursor: 'pointer' }}
                    >{authorInfo.nickname}</span>
                </div>
                <div onClick={() => reviewCallback(authorInfo.userId, authorInfo.nickname, subReview ? parentReviewId : reviewId)}>
                    {replyTo ? <span className="replyTo">{'@' + replyTo + ' '}</span> : ''}
                    {content}
                    <span className="review-date">{postDate}</span>
                </div>
            </Space>
            <Space
                direction="vertical"
                align="center"
                style={{
                    '--gap-vertical': '0',
                    cursor: 'pointer'
                }}
                onClick={likeBtn}
            >
                {liked ? <HeartFill fontSize="20px" style={{ cursor: 'pointer' }} color="red" /> :
                    <HeartOutline fontSize="20px" style={{ cursor: 'pointer' }} />}
                <div style={{ fontSize: '12px' }}>
                    {
                        typeof likes === 'number' ? (likes + (liked ? 1 : 0)) : likes
                    }
                </div>
            </Space>
        </Space>
        {children}
    </ReviewItemContainer>;
}

const ReviewItemContainer = styled.div`
    .review-item{
        margin-top: 22px;
    }

    .review-item>:nth-child(2){
        display: flex;
        flex: auto;
    }
    
    .review-date{
        display: inline-block;
        font-size: 12px;
        color: rgb(170, 170, 170);
        margin-left: 4px;
    }

    .review-author{
        font-size: 12px;
        color: rgb(170, 170, 170);
    }

    .replyTo{
        font-size: 12px;
        color: rgb(170, 170, 170);
        white-space: pre;
    }
`