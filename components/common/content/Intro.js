import parse from 'html-react-parser';

const Intro = ({ content }) => {
  return (
    <div className='mx-auto prose lg:prose-xl max-w-prose'>
      {parse(content)}
    </div>
  );
};

export default Intro;
