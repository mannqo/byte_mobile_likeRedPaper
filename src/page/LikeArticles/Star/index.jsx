import { List } from 'antd-mobile';
import React, { memo, useEffect } from 'react';
import Item from '../Item';

export default memo(function Star(props) {
    const { star } = props;
    return (
        <List >
            {star.map((info, idx) => (
                <Item key={idx}  type='收藏' info={info} />
            ))}
        </List>
    );
});
