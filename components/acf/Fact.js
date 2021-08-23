import ReactHtmlParser from 'react-html-parser';
export default function Fact({ content }) {
  console.log(content);
  return (
    <div className='row max-w-4xl row mx-auto w-[85%] p-5 border-white border-8 '>
      <div className=' first-letter:text-7xl first-letter:float-left first-letter:pr-3 fact-block'>
        {ReactHtmlParser(content.text)}
      </div>
    </div>
  );
}
