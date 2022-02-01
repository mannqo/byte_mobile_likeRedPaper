import request from "./axios";

export function getLikeUsersArticle(option) {
    return request({
        method: 'GET',
        url: '/notice/article/like',
        params: option
    })
}

export function getStarUsersArticle(option) {
    return request({
        method: 'GET',
        url: '/notice/article/star',
        params: option
    })
}

export function getLikeUsersComment(option) {
    return request({
        method: 'GET',
        url: '/notice/comment',
        params: option
    })
}

