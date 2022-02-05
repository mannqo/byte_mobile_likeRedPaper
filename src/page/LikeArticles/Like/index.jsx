import { List } from 'antd-mobile';
import React, { memo } from 'react';
import Item from '../Item';

export default memo(function Like(props) {
    const { like } = props; 
    return (
        <List>
            {
                like.map(info => (
                    <Item key={JSON.stringify(info)} type='赞' info={info} />
                ))
            }
        </List>
    );
});
