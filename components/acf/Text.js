import parse from 'html-react-parser';
export default function Text({ content }) {
  return (
    <div className='row max-w-prose mx-auto w-[85%] prose-sm lg:prose '>
      {content.text &&
        parse(content.text, {
          replace: (domNode) => {
            if (domNode.name === 'figure') {
              domNode.attribs.width = '100%';
              domNode.attribs.style = 'display:block;';
            }
            if (domNode.name === 'img') {
              domNode.attribs.src = domNode.attribs.src.replace(
                '/app/uploads/',
                'https://media.dinvinguide.se/wp-content/uploads/'
              );
            }
            if (domNode.name === 'a') {
              if (
                !domNode?.attribs?.href?.includes('dinvinguide.se/') &&
                !domNode?.attribs?.href?.includes('dryckeslistan.se/') &&
                domNode?.attribs?.href?.charAt(0) !== '/'
              ) {
                domNode.attribs.target = '_blank';
              }
            }
          },
        })}
    </div>
  );
}
