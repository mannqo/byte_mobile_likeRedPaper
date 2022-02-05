import { List } from 'antd-mobile';
import React, { memo } from 'react';
import Item from '../Item';

export default memo(function Star(props) {
    const { star } = props;
    return (
        <List >
            {star.map(info => (
                <Item key={JSON.stringify(info)} type='收藏' info={info} />
            ))}
        </List>
    );
});
