import { DlNextArrow } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

interface RelatedRecipesProps {
  data: any;
}

const RelatedRecipes = ({ data }: RelatedRecipesProps) => {
  return (
    <section className=" relative w-full lg:h-[500px] z-10 h-[700px]">
      <div className="absolute bg-[#F8F8F9] h-full lg:w-[calc(100%+10rem)] md:w-[calc(100%+5.5rem)] w-[calc(100%+2rem)] center-x center-y dl-layout">
        <div className="grid lg:grid-cols-2 h-full md:py-20 py-10 gap-10">
          <div className="w-full h-full flex flex-col justify-between md:w-[80%]">
            <div className="lg:pr-20">
              <p>Passar med</p>
              <h2>{data.title}</h2>
              {data?.acf_recipe?.desc && <p>{data.acf_recipe.desc}</p>}
            </div>

            <Link
              className="relative  flex items-center gap-2 cursor-pointer lg:hover:underline lg:ease-in-out lg:duration-300 "
              href={`/recept/${data?.slug}`}
            >
              <span>Gå till recept</span> <DlNextArrow />
            </Link>
          </div>
          <div className="w-full h-full">
            <div className="relative w-[100%] md:w-[80%] h-[270px] lg:h-full">
              {data?.featuredImage?.node?.mediaItemUrl &&
              data?.featuredImage?.node?.mediaItemUrl?.includes("https://") ? (
                <Image
                  src={data.featuredImage.node.mediaItemUrl}
                  alt={
                    data?.featuredImage?.node?.altText
                      ? data.featuredImage.node.altText
                      : `Bild på ${data.title}`
                  }
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedRecipes;
