import parse from 'html-react-parser';
const OldContent = ({ content }) => {
  // const sanitized = content
  //   .replace(/section/g, '')
  //   .replace(/row/g, '')
  //   .replace(/[*]/g, '');
  const sanitized = content;
  return (
    <div className='mx-auto prose-sm max-w-prose lg:prose'>
      {parse(sanitized)}
    </div>
  );
};

export default OldContent;
