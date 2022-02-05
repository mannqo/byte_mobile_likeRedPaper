import React, { memo, useEffect, useState } from 'react';
import { getArticleByAuthor } from '../../../services/article';
import TabPage from '../../../page/TabPage';

export default memo(function MyArticle(props) {
  const [myArticle, setMyArticle] = useState([]);
  const authorId = props.userId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getArticleByAuthor({ authorId });
        setMyArticle(res.articles)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [authorId])
  return (
    <TabPage articles={myArticle} />
  );
});
