import request from "./axios";


// 根据关键字搜索文章
export function searchByArticle(option) {
    return request({
        method: 'GET',
        url: '/search/byArticle',
        params: option
    })
}

// 根据关键字搜索用户
export function searchByUser(option) {
    return request({
        method: 'GET',
        url: '/search/byUser',
        params: option
    })
}