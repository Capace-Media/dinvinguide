import Image from "next/image";
import Link from "next/link";

interface SuitableWinesProps {
  data: any;
}

const SuitableWines = ({ data }: SuitableWinesProps) => {
  if (!data) {
    return null;
  }
  return (
    <section className="">
      <h2 className="pb-10">Passande drycker</h2>

      <ul className="flex items-center gap-6 overflow-x-scroll md:overflow-hidden shrink-1 py-8">
        {data &&
          data?.map((wine: any) => {
            return (
              <li key={wine.id} className="group min-w-[320px]">
                <Link
                  href={`/drycker/${wine?.slug}`}
                  className="flex"
                  aria-label={`läs mer om ${wine?.title}`}
                >
                  {wine?.featuredImage?.node.mediaItemUrl && (
                    <div className="min-w-[100px] h-[150px] relative shake-image">
                      <Image
                        src={wine.featuredImage.node.mediaItemUrl}
                        alt={
                          wine?.featuredImage?.altText
                            ? wine.featuredImage.altText
                            : `bild på ${wine?.title}`
                        }
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                        sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
                        className=""
                      />
                    </div>
                  )}
                  <div className=" flex gap-2 flex-col justify-center w-full p-4 ">
                    <h2 className="text-[17px] lg:group-hover:underline">
                      {wine?.title}
                    </h2>

                    <p className="text-[14px] flex">
                      {wine?.acf_drinks?.dryckestyper?.name} -{" "}
                      {wine?.acf_drinks?.forpackningar?.name}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default SuitableWines;
