import Image from "next/image";
import Link from "next/link";

interface WineExplorerListProps {
  data: any[];
}

const WineExplorerList = ({ data }: WineExplorerListProps) => {
  console.log("data =====>", data);
  return (
    <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-[4.3rem] pb-10">
      {data &&
        data.map((wine: any) => {
          console.log("wine.node.acf_drinks =====>", wine.node.acf_drinks);
          return (
            <li key={wine.node.id} className="group">
              <Link
                href={`/drycker/${wine?.node?.slug}`}
                className="flex"
                aria-label={`läs mer om ${wine?.node?.title}`}
              >
                <div className="min-w-[100px] h-[150px] relative shake-image">
                  <Image
                    src={wine.node.featuredImage.node.mediaItemUrl}
                    alt={
                      wine?.node?.featuredImage?.node?.altText
                        ? wine.node.featuredImage.node.altText
                        : `bild på ${wine?.node?.title}`
                    }
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                    sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
                    className=""
                  />
                </div>
                <div className=" flex gap-2 flex-col justify-center w-full p-4 ">
                  <h2 className="text-[17px] lg:group-hover:underline">
                    {wine?.node?.title}
                  </h2>

                  <p className="text-[14px] flex">
                    {wine?.node?.acf_drinks?.dryckestyper?.name} -{" "}
                    {wine?.node?.acf_drinks?.forpackningar?.name}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default WineExplorerList;
