import { TabBar, Badge, Button } from 'antd-mobile';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import cookie from 'react-cookies'

export default memo(function EditInfo() {
  const userInfo = cookie.load('userInfo');
  const { fans, follows, likedArticles } = userInfo;
  const history = useHistory();
  const getList = (e) => {
    switch (e) {
      case '1': history.push('/person/follows'); break;
      case '2': history.push('/person/fans'); break;
      default: console.log(1);
    }
  }

  return (
    <div style={{ 'display': 'flex', 'margin': '10px 0' }}>
      <TabBarWrapper>
        <TabBar onChange={getList}>
          <TabBar.Item key='1' icon={follows && follows.length === 0 ? '0' : follows.length} title='关注' badge={Badge.dot} />
          <TabBar.Item key='2' icon={fans && fans.length === 0 ? '0' : fans.length} title='粉丝' />
          <TabBar.Item key='3' icon={likedArticles && likedArticles.length === 0 ? '0' : likedArticles.length} title='点赞与收藏' />
        </TabBar>
      </TabBarWrapper>
      <EditWrapper>
        <Button fill='outline' size='mini' style={{ 'height': '30px' }}>编辑资料</Button>
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
