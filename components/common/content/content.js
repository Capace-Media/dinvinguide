import parse from 'html-react-parser';
const Content = ({ content }) => {
  return (
    <div className='mx-auto prose-sm lg:prose row max-w-prose'>
      {parse(content)}
    </div>
  );
};

export default Content;
