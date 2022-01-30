import request from "./axios";

export function register(option) {
    return request({
        method: 'POST',
        url: '/register',
        data: option
    })
}

export function login(option) {
    return request({
        method: 'POST',
        url: '/login',
        data: option
    })
}

export function checkStatus(username) {
    return request({
        method: 'GET',
        url: '/getLoginStatus',
        data: username
    })
}

export function logout(username) {
    return request({
        method: 'POST',
        url: '/logout',
        data: username
    })
}