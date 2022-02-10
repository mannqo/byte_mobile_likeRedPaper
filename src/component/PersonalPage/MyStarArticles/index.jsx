import React, { memo, useEffect, useState } from 'react';
import TabPage from '../../../page/TabPage';
import cookie from 'react-cookies'
import { getStaredArticles } from '../../../services/article';

export default memo(function MyStarArticle(props) {
  const [starArticles, setStarArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = props;
  useEffect(async () => {
    const res = await getStaredArticles({ userId });
    const articles = res.staredArticles;
    setStarArticles(articles)
    setLoading(false);
  }, [userId])
  return (
    <TabPage loading={loading} articles={starArticles} />
  );
});
