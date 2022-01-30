import request from "./axios";

export function getReviewById(option) {
    return request({
        method: 'GET',
        url: '/review/byId',
        params: option
    })
}

export function getReviewByArticle(option) {
    return request({
        method: 'GET',
        url: '/review/byArticle',
        params: option
    })
}

export function postReview(option) {
    return request({
        method: 'POST',
        url: '/review',
        data: option
    })
}

export function deleteReview(option) {
    return request({
        method: 'POST',
        url: '/review/delete',
        data: option
    })
}

export function likeReview(option) {
    return request({
        method: 'POST',
        url: '/review/like',
        data: option
    })
}

export function unlikeReview(option) {
    return request({
        method: 'POST',
        url: '/review/unlike',
        data: option
    })
}