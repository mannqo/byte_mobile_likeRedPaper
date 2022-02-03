import request from "./axios";



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
 * @params: userId
 * 获取粉丝列表        
 */

export function getFansList(option) {
    return request({
        method: 'GET',
        url: '/user/fanList',
        params: option,
    })
}
/*
 * @params: userId
 * 获取关注列表        
 */
export function getFollowsList(option) {
    return request({
        method: 'GET',
        url: '/user/followerList',
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

/* 
 * params: userId
 */
export function getFullUserInfo(option) {
    return request({
        method: 'GET',
        url: '/user/fullInfo',
        params: option,
    })
}


/* 
 * edit编辑接口
*/
export function editMy(option) {
    return request({
        method: 'POST',
        url: '/user/edit',
        data: option
    })
}

export function upload(option) {
    return request({
        method: 'POST',
        url: '/user/upload',
        data: option,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}