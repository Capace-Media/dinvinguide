import ReactHtmlParser from 'react-html-parser';
export default function Text({ content }) {
  return (
    <div className='row max-w-prose mx-auto w-[85%] prose-sm lg:prose '>
      {ReactHtmlParser(content.text)}
    </div>
  );
}
