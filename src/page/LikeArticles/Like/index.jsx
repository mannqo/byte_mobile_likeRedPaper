import { List } from 'antd-mobile';
import React, { memo } from 'react';
import Item from '../Item';

export default memo(function Like(props) {
    const { like } = props;
console.log(like);
    return (
        <List>
            {
                like.map(info => (
                    <Item key={JSON.stringify(info.userInfo)} type='赞' info={info} />
                ))
            }
        </List>
    );
});
