interface CitatProps {
  content: any;
}

const Citat = ({ content }: CitatProps) => {
  return (
    <section className="">
      <blockquote className="text-[27px] font-sub">{content.text}</blockquote>
    </section>
  );
};

export default Citat;
