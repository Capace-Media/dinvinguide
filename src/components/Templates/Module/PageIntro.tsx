import handleParse from "@/lib/utils/handleParse";

interface PageIntroProps {
  data?: string | null;
}

const PageIntro = ({ data }: PageIntroProps) => {
  return (
    <section className="layout py-5 md:py-12 ">{handleParse(data ?? "")}</section>
  );
};

export default PageIntro;
