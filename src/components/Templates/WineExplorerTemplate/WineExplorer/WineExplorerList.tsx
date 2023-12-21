import Image from "next/image";

interface WineExplorerListProps {
  data: any[];
}

const WineExplorerList = ({ data }: WineExplorerListProps) => {
  return (
    <ul className="relative z-10 grid grid-cols-4 gap-8 dl-layout">
      {data &&
        data.map((wine: any) => {
          return (
            <li key={wine.node.id} className="flex">
              <div className="min-w-[100px] h-[150px] relative ">
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
                  sizes="(min-width: 940px) 50px, (min-width: 780px) calc(2.86vw + 24px), (min-width: 540px) calc(7.27vw - 6px), calc(25vw - 100px)"
                  className=""
                />
              </div>
              <div className=" flex items-center w-full p-4">
                <h2 className="text-[14px]">{wine?.node?.title}</h2>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default WineExplorerList;
