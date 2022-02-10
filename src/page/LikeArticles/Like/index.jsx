import { List } from 'antd-mobile';
import { memo } from 'react';
import Item from '../Item';

export default memo(function Like(props) {
    const { like } = props;
    console.log(like);
    return (
        <List>
            {
                like.map((info, idx) => (
                    <Item className='animate__animated animate__fadeIn' key={idx} type='赞' info={info} />
                ))
            }
        </List>
    );
});
