import { List } from 'antd-mobile'; 
import FansItem from '../../Fans/FansList/FansItem'; 


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

