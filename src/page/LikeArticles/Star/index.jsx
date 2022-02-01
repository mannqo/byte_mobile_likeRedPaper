import { List } from 'antd-mobile';
import React, { memo, useEffect } from 'react';
import StarItem from './StarItem';

export default memo(function Star(props) {
    const { star } = props; 
    console.log(star);
    return (
        <List >
            {star.map(user => (
                <StarItem key={user.postDate} info={user} />
            ))}
        </List>
    );
});
