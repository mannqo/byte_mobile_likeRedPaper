import request from "./axios";

export function getArticleById(option) {
    return request({
        method: 'GET',
        url: '/article/byId',
        params: option
    })
}

export function getArticleByAuthor(option) {
    return request({
        method: 'GET',
        url: '/article/byAuthor',
        params: option
    })
}

export function postArticle(option) {
    return request({
        method: 'POST',
        url: '/article',
        data: option
    })
}

export function deleteArticle(option) {
    return request({
        method: 'POST',
        url: '/article/delete',
        data: option
    })
}

export function likeArticle(option) {
    return request({
        method: 'POST',
        url: '/article/like',
        data: option
    })
}

export function unlikeArticle(option) {
    return request({
        method: 'POST',
        url: '/article/unlike',
        data: option
    })
}

export function starArticle(option) {
    return request({
        method: 'POST',
        url: '/article/star',
        data: option
    })
}

export function unstarArticle(option) {
    return request({
        method: 'POST',
        url: '/article/unstar',
        data: option
    })
}

<<<<<<< HEAD
export function getLikeArticles(option) {
=======
export function getLikedArticles(option) {
>>>>>>> f2631a5cab7278c4d29fac6fd9875f62f73fc267
    return request({
        method: 'GET',
        url: '/article/getLike',
        params: option
    })
}

<<<<<<< HEAD
export function getStarArticles(option) {
=======
export function getStaredArticles(option) {
>>>>>>> f2631a5cab7278c4d29fac6fd9875f62f73fc267
    return request({
        method: 'GET',
        url: '/article/getStar',
        params: option
    })
<<<<<<< HEAD
}
=======
}
>>>>>>> f2631a5cab7278c4d29fac6fd9875f62f73fc267
