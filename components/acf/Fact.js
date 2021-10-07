import ReactHtmlParser from 'react-html-parser';
export default function Fact({ content }) {
  return (
    <div className='max-w-4xl row mx-auto w-[85%]  '>
      <div className='p-5 border-8 border-white first-letter:text-7xl first-letter:float-left first-letter:pr-3 fact-block'>
        {ReactHtmlParser(content.text)}
      </div>
    </div>
  );
}
