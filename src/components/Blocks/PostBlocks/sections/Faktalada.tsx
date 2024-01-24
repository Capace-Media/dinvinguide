import handleParse from "@/lib/utils/handleParse";

const Faktalada = ({ content }: any) => {
  console.log("content =====>", content);
  return (
    <section className="py-[2rem] drop-cap">
      {handleParse(content.text)}
    </section>
  );
};

export default Faktalada;
