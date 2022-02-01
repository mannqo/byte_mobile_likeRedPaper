import { List } from 'antd-mobile';
import React, { memo } from 'react';
import StarItem from '../Star/StarItem';

export default memo(function Like(props) {
    const { like } = props
    return (
        <List>
            {like.map(user => (
                <StarItem key={user.postDate} info={user} />
            ))}
        </List>
    );
});
