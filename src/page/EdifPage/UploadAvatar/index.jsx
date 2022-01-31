import React, { memo, useState } from 'react'
import { ImageUploader, Image } from 'antd-mobile'
import { mockUpload } from './utils'
import cookie from 'react-cookies';


export default memo(function UploadAvatar() {
    const avatar = cookie.load('userInfo').avatar;
    const [fileList, setFileList] = useState([])

    return (
        <ImageUploader value={fileList} onChange={setFileList} upload={mockUpload}>
            <Image
                src={avatar}
                width={100}
                height={100}
                fit='cover'
                style={{
                    borderRadius: '50%',
                }}
            />
        </ImageUploader >
    )
});
