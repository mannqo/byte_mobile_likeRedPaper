import request from "./axios";


// 图片上传
export function uploadImage(option) {
    return request({
        method: 'POST',
        url: '/upload/image',
        data: option
    })
}