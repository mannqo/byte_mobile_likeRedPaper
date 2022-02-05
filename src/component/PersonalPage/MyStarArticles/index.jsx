import React, { memo, useEffect, useState } from 'react';
import TabPage from '../../../page/TabPage';
import { getStaredArticles } from '../../../services/article';

export default memo(function MyStarArticle(props) {
  const [starArticles, setStarArticles] = useState([]);
  const { userId } = props;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStaredArticles({ userId });
        const articles = res.staredArticles;
        setStarArticles(articles)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [userId])
  return (
    <TabPage articles={starArticles} />
  );
});
