import ReactHtmlParser from 'react-html-parser';
const Content = ({ content }) => {
  return (
    <div className='mx-auto prose-sm lg:prose row max-w-prose'>
      {ReactHtmlParser(content)}
    </div>
  );
};

export default Content;
