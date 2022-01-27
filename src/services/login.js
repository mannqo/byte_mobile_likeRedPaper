import request from "./axios";

export function register(username, password) {
    return request({
        method: 'POST',
        url: '/register',
        data: {
            username,
            password
        }
    })
}

export function login(username, password) {
    return request({
        method: 'POST',
        url: '/login',
        params: {
            username,
            password
        }
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