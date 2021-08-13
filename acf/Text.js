export default function Text(content) {
  console.log(content);
  return (
    <div
      className='row max-w-4xl mx-auto w-[85%] rich-text'
      dangerouslySetInnerHTML={{ __html: content.content }}
    />
  );
}
