import request from "./axios";

export function sendMessage(option) {
    return request({
        method: 'POST',
        url: '/sendMessage',
        data: option
    })
}

export function getChatList(option) {
    return request({
        method: 'GET',
        url: '/getChatList',
        params: option,
    })
}

export function getChattingRecord(option) {
    return request({
        method: 'GET',
        url: '/getChattingRecord',
        params: option
    })
}