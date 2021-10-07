import parse from 'html-react-parser';
const OldContent = ({ content }) => {
  return (
    <div className='mx-auto prose-sm max-w-prose lg:prose'>
      {parse(content)}
    </div>
  );
};

export default OldContent;
