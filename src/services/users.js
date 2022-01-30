import request from "./axios";

/* 
 * params: userId
 */
export function getUserInfo(option) {
    return request({
        method: 'GET',
        url: '/user/fullInfo',
        params: option,
    })
}

/* 
 * 关注别人
*/
export function followOthers(option) {
    return request({
        method: 'POST',
        url: '/user/follow',
        data: option
    })
}
/* 
 * 取消关注
*/
export function cancelFollow(option) {
    return request({
        method: 'POST',
        url: '/user/cancelFollow',
        data: option
    })
}


/*
 * @params: userId, followerId 
 * 获取粉丝列表        
 */

export function getFansList(option) {
    return request({
        method: 'GET',
        url: '/user/fanList',
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