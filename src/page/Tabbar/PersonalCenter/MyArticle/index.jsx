import React, { memo, useEffect, useState } from 'react';
import { getArticleByAuthor } from '../../../../services/article';
import TabPage from '../../../TabPage';
import cookie from 'react-cookies';

export default memo(function MyArticle() {
  const [myArticle, setMyArticle] = useState([]);
  const authorId = cookie.load('userInfo').userId;
  useEffect(async () => {
    try {
      const res = await getArticleByAuthor({ authorId });
      setMyArticle(res.articles)
    } catch (err) {
      console.log(err);
    }
  }, [authorId])
  return (
    <TabPage articles={myArticle} />
  );
});
