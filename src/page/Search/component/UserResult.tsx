import { List } from 'antd-mobile';
import cookie from 'react-cookies';
import FansItem from '../../Fans/FansList/FansItem';
import { UserFullInfo } from '../../PostDetail';


export default function UserResult({ userList }: { userList: any[] }) {
    return (
        <List>
            {
                userList && userList.map((user, idx) => (
                    <FansItem key={idx} userInfo={user} />
                ))
            }
        </List>
    );
};

