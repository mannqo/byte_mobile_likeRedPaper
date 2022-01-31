import React, { memo, useEffect, useState } from 'react';
import TabPage from '../../../TabPage';
import cookie from 'react-cookies'
import { getStarArticles } from '../../../../services/article';

export default memo(function MyStarArticle() {
  const [starArticles, setStarArticles] = useState([]);
  const { userId } = cookie.load('userInfo');
  useEffect(async () => {
    const res = await getStarArticles({ userId });
    const articles = res.staredArticles;
    setStarArticles(articles)
  }, [userId])
  return (
    <TabPage articles={starArticles} />
  );
});
