import request from "./axios";


// 图片上传
export function uploadImage(option) {
    return request({
        method: 'POST',
        url: '/upload/image',
        data: option,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

// 撤销图片上传
export function revertUploadImage(option) {
    return request({
        method: 'POST',
        url: '/upload/image/revert',
        data: option
    })
}