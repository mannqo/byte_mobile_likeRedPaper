import { TabBar, Badge, Button } from 'antd-mobile';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import cookie from 'react-cookies';

export default memo(function EditInfo(props) {
  const { userInfo } = props;
  const { fans, follows, likedArticles, userId } = userInfo;
  const id = cookie.load('userInfo').userId;
  const history = useHistory();
  const getList = (e) => {
    switch (e) {
      case '1': history.push('/person/follows'); break;
      case '2': history.push('/person/fans'); break;
      case '3': history.push('/person/like'); break;
      default: console.log(1);
    }
  }
  const toEdit = () => {
    history.push('/person/edit');
  }
  const toSend = () => {
    history.push('/message/detail/' + userId);
  }

  return (
    <div style={{ 'display': 'flex', 'margin': '10px 0' }}>
      <TabBarWrapper>
        <TabBar onChange={getList}>
          <TabBar.Item key='1' icon={follows && follows.length.toString()} title='关注' />
          <TabBar.Item key='2' icon={fans && fans.length.toString()} title='粉丝' />
          <TabBar.Item key='3' icon={likedArticles && likedArticles.length.toString()} title='点赞与收藏' />
        </TabBar>
      </TabBarWrapper>
      <EditWrapper>
        <Button fill='outline' size='mini' style={{ 'height': '30px' }} onClick={userId === id ? toEdit : toSend}> {userId === id ? '编辑资料' : '发消息'} </Button>
      </EditWrapper>
    </div>
  );

});

const TabBarWrapper = styled.div`
  flex: 1;
  padding-left: 10px;
`
const EditWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
