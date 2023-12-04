import handleParse from "@/lib/utils/handleParse";

interface BrodtextProps {
  content: any;
}

const Brodtext = ({ content }: BrodtextProps) => {
  return <section className="py-[2rem]">{handleParse(content.text)}</section>;
};

export default Brodtext;
