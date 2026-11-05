import handleParse from "@/lib/utils/handle-parse";

interface BrodtextProps {
  content: any;
}

const Brodtext = ({ content }: BrodtextProps) => {
  if (!content.text) {
    return null;
  }

  return <section className="py-8">{handleParse(content.text)}</section>;
};

export default Brodtext;
