import handleParse from "@/lib/utils/handleParse";

interface BrodtextProps {
  content: any;
}

const Brodtext = ({ content }: BrodtextProps) => {
  console.log("content =====>", content);
  return (
    <section className="">
      <div>{handleParse(content.text)}</div>
    </section>
  );
};

export default Brodtext;
