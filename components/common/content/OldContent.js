import parse from 'html-react-parser';
const OldContent = ({ content }) => {
  const sanitized = content
    .replace(/section/g, '')
    .replace(/row/g, '')
    .replace(/[*]/g, '');

  return (
    <div className='mx-auto w-[85%] prose-sm max-w-prose lg:prose'>
      {content &&
        parse(sanitized, {
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
                !domNode?.attribs?.href.includes('dinvinguide.se/') &&
                !domNode?.attribs?.href.includes('dryckeslistan.se/') &&
                domNode?.attribs?.href.charAt(0) !== '/'
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

export default OldContent;
