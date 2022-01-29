import { Space, Toast } from "antd-mobile";
import MyAvatar from "./MyAvatar";
import {
    HeartOutline,
    HeartFill,
} from 'antd-mobile-icons'
import styled from "styled-components";
import { useState } from "react";

type NumOrString = number | string;
type ReviewObj = {
    avatar: string,
    userName: string,
    uid: number,
    content: string,
    likes: NumOrString,
    postDate: string,
    uuid: string,
    reviews?: Array<ReviewObj>
}

export function ReviewArea({
    reviews,
    enterUserHomePage,
    reviewCallback
}: {
    reviews: Array<ReviewObj>,
    enterUserHomePage: (userName: string) => void,
    reviewCallback: (uid: number, uuid: string, replyToArticle: boolean, userName?: string) => void,
}) {
    return (<>
        {reviews.map((review, idx) =>
            <ReviewItem
                info={review}
                enterUserHomePage={enterUserHomePage}
                reviewCallback={reviewCallback}
                key={idx}
            >
                <>
                    {review.reviews?.map((subReview, idx) =>
                        <ReviewItem
                            info={subReview}
                            enterUserHomePage={enterUserHomePage}
                            reviewCallback={reviewCallback}
                            key={idx}
                            subReview={true}
                        />
                    )}
                    <hr style={{
                        marginLeft: '40px',
                        color:'rgb(206, 206, 206, 0.2)'
                    }}/>
                </>
            </ReviewItem>
        )}
    </>)
}

export function ReviewItem({
    info: { avatar, userName, content, postDate, likes, uid, uuid },
    enterUserHomePage,
    reviewCallback,
    children,
    subReview = false,
}: {
    info: ReviewObj,
    enterUserHomePage: (userName: string) => void,
    reviewCallback: (uid: number, uuid: string, replyToArticle: boolean, userName?: string) => void,
    children?: React.ReactElement<any, any>,
    subReview?: boolean,
}) {
    const subReviewStyle = {
        paddingLeft: '40px',
        marginTop: '8px'
    }

    // State
    let [liked, setLiked] = useState(false);

    // 喜欢按钮
    const likeBtn = () => {
        Toast.show(`给${userName}的评论${liked ? '取消' : ''}点赞，评论uuid=${uuid}；` + (subReview ? `此评论为二级评论` : ''));
        setLiked(!liked);
    }

    return <ReviewItemContainer>
        <Space
            style={subReview ? subReviewStyle : {}}
            className="review-item"
            block
            align="start"
        >
            <MyAvatar src={avatar} onClick={() => enterUserHomePage(userName)} />
            <Space
                direction="vertical"
                style={{
                    '--gap-vertical': '2px'
                }}
            >
                <div className="review-author">
                    <span onClick={() => enterUserHomePage(userName)} style={{ cursor: 'pointer' }}>{userName}</span>
                </div>
                <div onClick={() => reviewCallback(uid, uuid, false, userName)}>
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
                {liked ? <HeartFill fontSize="20px" style={{ cursor: 'pointer' }} color="red"/> :
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
`