import handleParse from "@/lib/utils/handle-parse";

const Faktalada = ({ content }: any) => {
  if (!content.text) {
    return null;
  }

  return (
    <section className="drop-cap py-8">{handleParse(content.text)}</section>
  );
};

export default Faktalada;
