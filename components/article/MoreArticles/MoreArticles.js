import MoreArticlesList from './MoreArticlesList';
const MoreArticles = ({ articles }) => {
  return (
    <div className='contain'>
      <MoreArticlesList articles={articles} />
    </div>
  );
};

export default MoreArticles;
