import ReactHtmlParser from 'react-html-parser';
export default function Text({ content }) {
  return (
    <div className='row max-w-4xl mx-auto w-[85%] rich-text'>
      {ReactHtmlParser(content.text)}
    </div>
  );
}
