import { Toast } from 'antd-mobile';
import React, { memo, useEffect, useState } from 'react';
import TabPage from '../../../page/TabPage';
import { getStaredArticles } from '../../../services/article';

export default memo(function MyStarArticle(props) {
  const [starArticles, setStarArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = props;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStaredArticles({ userId });
        const articles = res.staredArticles;
        setStarArticles(articles)
        setLoading(false);
      } catch (err) {
        Toast.show(err.message);
      }
    }
    fetchData();
  }, [userId])
  return (
    <TabPage loading={loading} articles={starArticles} />
  );
});
