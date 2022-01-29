import request from "./axios";

export function getUserInfo(option) {
    return request({
        method: 'GET',
        url: '/getUserInfo',
        params: option,
    })
}