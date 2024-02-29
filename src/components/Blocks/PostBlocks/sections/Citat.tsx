import handleParse from "@/lib/utils/handleParse";

interface CitatProps {
  content: any;
}

const Citat = ({ content }: CitatProps) => {
  return (
    <section className="py-[2rem]">
      <blockquote className="text-[27px] font-sub">
        {handleParse(content?.text)}
      </blockquote>
    </section>
  );
};

export default Citat;
