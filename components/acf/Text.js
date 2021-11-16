import ReactHtmlParser from 'react-html-parser';
import parse from 'html-react-parser';
export default function Text({ content }) {
  return (
    <div className='row max-w-prose mx-auto w-[85%] prose-sm lg:prose '>
      {parse(content.text, {
        replace: (domNode) => {
          if (domNode.name === 'figure') {
            domNode.attribs.width = '100%';
            domNode.attribs.style = 'display:block;';

            console.log(domNode);
          }
        },
      })}
    </div>
  );
}
