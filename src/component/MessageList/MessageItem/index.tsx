import { List, Image } from 'antd-mobile'
import React, { memo } from 'react'
import { useHistory } from 'react-router-dom';


interface propsType {
    user: any;
}

export default memo(function MessageItem(props: propsType) {
    const { name, avatar, description } = props.user;
    
    const history = useHistory();
    const goToMessageDetail = () => {
        history.push('/message/detail');
    }
    return (
        <List.Item 
            prefix={
                <Image
                    src={avatar}
                    style={{ borderRadius: 20 }}
                    fit='cover'
                    width={40}
                    height={40}
                />
            }
            description={description}
            onClick={goToMessageDetail}
        >
            {name}
        </List.Item>
    )
})

