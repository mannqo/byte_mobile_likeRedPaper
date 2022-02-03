import { Image } from 'antd-mobile';
import React, { memo } from 'react';

export default memo(function BgPic(props) {
    const { user, handleBackGround } = props;

    return (
        <div className='bg-main'>
            {
                user.backGroundPicture ? (
                    <div>
                        <input className='bg-upload' type='file' onChange={handleBackGround} />
                        <Image
                            src={user.backGroundPicture ? user.backGroundPicture : ''}
                            width={50}
                            height={50}
                            fit='cover'
                            style={{
                                borderRadius: '5px',
                            }}
                        />
                    </div>
                ) : (
                    <div>
                        <input className='bg-upload' type='file' onChange={handleBackGround} />
                        <span>请选择你的背景图</span>
                    </div>
                )
            }
        </div>
    );
});
