import ReactHtmlParser from "html-react-parser";
export default function Quote({ content }) {
  return (
    <blockquote className="row w-[85%] max-w-7xl mx-auto  text-brand-red text-center leading-snug">
      {ReactHtmlParser(content.text)}
    </blockquote>
  );
}
