import handleParse from "@/lib/utils/handleParse";

interface CitatProps {
  content: any;
}

const Citat = ({ content }: CitatProps) => {
  if (!content?.text) {
    return null;
  }

  return (
    <section className="py-[2rem]">
      <blockquote className="text-[27px] font-sub">
        {handleParse(content?.text, undefined, true)}
      </blockquote>
    </section>
  );
};

export default Citat;
