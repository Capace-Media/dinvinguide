import parse from 'html-react-parser';
const OldContent = ({ content }) => {
  const sanitized = content;

  return (
    <div className='mx-auto w-[85%] prose-sm max-w-prose lg:prose'>
      {parse(sanitized)}
    </div>
  );
};

export default OldContent;
