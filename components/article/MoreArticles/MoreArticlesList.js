import MoreArticlesListItem from './MoreArticlesListItem';
import { useState } from 'react';
const MoreArticlesList = ({ articles }) => {
  const incrementNum = 15;
  const [maxNodes, setMaxNodes] = useState(incrementNum);
  const incrementNodes = () => {
    setMaxNodes((prev) => prev + incrementNum);
  };
  return (
    <>
      <div className='row'>
        <h2 className='text-center text-brand-red'>Fler artiklar</h2>
      </div>
      <ul className='grid gap-3 lg:grid-cols-3 row'>
        {articles.map(({ node: article }, index) => {
          if (index < maxNodes) {
            return (
              <MoreArticlesListItem
                article={article}
                incrementNodes={incrementNodes}
                last={index + 1 === maxNodes ? true : false}
              />
            );
          }
        })}
      </ul>
    </>
  );
};

export default MoreArticlesList;
