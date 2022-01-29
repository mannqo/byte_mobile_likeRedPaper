import request from "./axios";

export function getUserInfo(option) {
    return request({
        method: 'GET',
        url: '/getUserInfo',
        params: option,
    })
}

export function getBaseUserInfo(option) {
    return request({
        method: 'GET',
        url: '/user/baseInfo',
        params: option,
    })
}

export function getFullUserInfo(option) {
    return request({
        method: 'GET',
        url: '/user/fullInfo',
        params: option,
    })
}

export function followUser(option) {
    return request({
        method: 'POST',
        url: '/user/follow',
        data: option,
    })
}

export function cancelFollow(option) {
    return request({
        method: 'GET',
        url: '/user/cancelFollow',
        data: option,
    })
}