import request from "./axios";

export function sendMessage(userId, receiverId, message) {
    return request({
        method: 'POST',
        url: '/sendMessage',
        data: {
            userId,
            receiverId,
            message
        }
    })
}

export function getChatList(option) {
    console.log(option);
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