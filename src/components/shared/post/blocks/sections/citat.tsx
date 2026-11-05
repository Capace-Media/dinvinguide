import handleParse from "@/lib/utils/handleParse";

interface CitatProps {
  content: any;
}

const Citat = ({ content }: CitatProps) => {
  if (!content?.text) {
    return null;
  }

  return (
    <section className="py-8">
      <blockquote className="font-sub text-[27px]">
        {handleParse(content?.text, undefined, true)}
      </blockquote>
    </section>
  );
};

export default Citat;
