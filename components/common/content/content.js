import parse from 'html-react-parser';
const Content = ({ content }) => {
  return (
    <div className='mx-auto prose-sm lg:prose row max-w-prose'>
      {parse(content, {
        replace: (domNode) => {
          if (domNode.name === 'figure') {
            domNode.attribs.width = '100%';
            domNode.attribs.style = 'display:block;';
          }
          if (domNode.name === 'a') {
            if (
              !domNode?.attribs?.href?.includes('dinvinguide.se/') &&
              !domNode?.attribs?.href?.includes('dryckeslistan.se/') &&
              domNode?.attribs?.href?.charAt(0) !== '/'
            ) {
              console.log('EXTERNAL =>', domNode.attribs);
              domNode.attribs.target = '_blank';
            }
          }
        },
      })}
    </div>
  );
};

export default Content;
