import parser from "html-react-parser";

export default function Fact({ content }) {
  return (
    <div className="max-w-4xl row mx-auto w-[85%]  ">
      <div className="p-5 leading-relaxed border-8 border-white first-letter:text-5xl first-letter:float-left first-letter:pr-3 fact-block">
        {content?.text && parser(content.text)}
      </div>
    </div>
  );
}
