import React, { memo, useState } from 'react'
import { Image, Toast } from 'antd-mobile'
import styled from 'styled-components';
import cookie from 'react-cookies';
import { upload } from '../../../services/users';


export default memo(function UploadAvatar() {
    const { avatar } = cookie.load('userInfo');
    const [avatarUrl, setAvatarUrl] = useState(avatar);
    const handleSubmit = async (e) => {
        const file = e.target.files[0];
        const formdata = new FormData();
        const userInfo = cookie.load('userInfo');
        const { userId } = userInfo;
        formdata.append('avatar', file, file.name);
        formdata.append('userId', Number(userId));
        try {
            const res = await upload(formdata);
            const { avatar, msg } = res;
            setAvatarUrl(avatar);
            cookie.save('userInfo', { ...userInfo, avatar }); 
            Toast.show({
                icon: 'success',
                content: msg,
            })
        } catch (err) {
            Toast.show({
                icon: 'loading',
                content: '修改异常',
            })
        }


    }
    return (
        <AvatarContainer>
            <div className='avatar-wrap'>
                <div className='avatar-main'>
                    <input className='avatar-upload' type='file' onChange={handleSubmit} />
                    <Image
                        src={avatarUrl}
                        width={100}
                        height={100} 
                        fit='cover'
                        style={{
                            borderRadius: '50%',
                        }}
                    />
                </div>
            </div>
        </AvatarContainer>
    )
});

const AvatarContainer = styled.div`
    .avatar-wrap {
        height:150px;
        .avatar-main {
            position:relative;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100%;
            .avatar-upload {
                position:absolute;
                width:100px;
                height:100px;
                boder-radius:50%;
                opacity:0;
                z-index:99;
            }
        }
    }
`