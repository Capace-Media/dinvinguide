import handleParse from "@/lib/utils/handleParse";

interface BrodtextProps {
  content: any;
}

const Brodtext = ({ content }: BrodtextProps) => {
  return <section className="">{handleParse(content.text)}</section>;
};

export default Brodtext;
