import React, { memo, useEffect, useState } from 'react';
import { getArticleByAuthor } from '../../../services/article';
import TabPage from '../../../page/TabPage';
import { Toast } from 'antd-mobile';

export default memo(function MyArticle(props) {
  const [myArticle, setMyArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const authorId = props.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
      const res = await getArticleByAuthor({ authorId });
      setMyArticle(res.articles)
      setLoading(false);
      } catch (err) {
        Toast.show(err.message);
      }
    }
    fetchData();
  }, [authorId])
  return (
    <TabPage loading={loading} articles={myArticle} />
  );
});
