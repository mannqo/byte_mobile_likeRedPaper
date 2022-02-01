import request from "./axios";

export function sendMessage(option) {
    return request({
        method: 'POST',
        url: '/chat/send',
        data: option
    })
}

export function getChatList(option) {
    return request({
        method: 'GET',
        url: '/chat/getList',
        params: option,
    })
}

export function getChattingRecord(option) {
    return request({
        method: 'GET',
        url: '/chat/getRecord',
        params: option
    })
}