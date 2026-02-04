import handleParse from "@/lib/utils/handleParse";

const Faktalada = ({ content }: any) => {
  if (!content.text) {
    return null;
  }

  return (
    <section className="py-8 drop-cap">
      {handleParse(content.text)}
    </section>
  );
};

export default Faktalada;
