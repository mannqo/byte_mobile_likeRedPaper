import { List } from 'antd-mobile';
import SkeletonItem from '../../../component/SkeletonItem';
import FansItem from '../../Fans/FansList/FansItem';


export default function UserResult({ userList, loading }: { userList: any[], loading: boolean }) {
    return (
        <List>
            {loading ? (new Array(3).fill(null)).map((_, idx) => <SkeletonItem key={idx} />) :
                userList && userList.map((user, idx) => (
                    <FansItem key={idx} userInfo={user} />
                ))
            }
        </List>
    );
};

