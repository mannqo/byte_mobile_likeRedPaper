import { List } from 'antd-mobile';
import React, { memo } from 'react';
import StarItem from '../Star/StarItem';

export default memo(function Like(props) {
    const { like } = props
    return (
        <List>
            {like.map(info => (
                <StarItem key={info.postDate} info={info} />
            ))}
        </List>
    );
});
