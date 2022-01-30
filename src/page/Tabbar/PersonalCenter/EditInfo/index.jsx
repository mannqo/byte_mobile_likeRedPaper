import { TabBar, Badge, Button } from 'antd-mobile';
import React, { memo } from 'react';
import styled from 'styled-components';

export default memo(function EditInfo() {
  const tabs = [
    {
      key: 'follow',
      title: '关注',
      icon: 25,
      badge: Badge.dot,
    },
    {
      key: 'fans',
      title: '粉丝',
      icon: 25,
    },
    {
      key: 'star',
      title: '点赞与收藏',
      icon: 1,
    },
  ]
  return (
    <div style={{ 'display': 'flex', 'margin': '10px 0' }}>
      <TabBarWrapper>
        <TabBar>
          {tabs.map(item => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              badge={item.badge}
            />
          ))}
        </TabBar>
      </TabBarWrapper>
      <EditWrapper>
        <Button fill='outline' size='mini' style={{'height': '30px'}}>编辑资料</Button>
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
