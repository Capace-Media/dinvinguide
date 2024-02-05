import ArticleTemplate from "@/components/Templates/ArticleTemplate";
import Line from "@/components/graphic/Line";
import Newsletter from "../components/Newsletter";
import Ads from "../components/ads";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { id: string };
};

const Articles = ({ searchParams, params }: Props) => {
  return (
    <>
      <div className="layout bg-white pt-20">
        <Line />
      </div>
      <Ads pageType="default" position="TOP" />
      <ArticleTemplate searchParams={searchParams} />
      <Ads pageType="default" position="MID" />
      <Newsletter />
    </>
  );
};

export default Articles;
