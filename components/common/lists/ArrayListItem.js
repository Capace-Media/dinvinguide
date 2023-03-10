import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import flattenObject from "../../../utils/flattenObject";

const ArrayListItem = ({ data, loadMore, last }) => {
  const o = flattenObject(data);
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView && last) {
      loadMore();
    }
  }, [inView, loadMore, last]);
  return (
    <li
      className="relative block overflow-hidden text-white bg-black group"
      ref={last ? ref : null}
    >
      <Link href={o.uri}>
        <a className="relative block h-60">
          {o["featuredImage.node.mediaItemUrl"] && (
            <Image
              src={o["featuredImage.node.mediaItemUrl"]}
              layout="fill"
              objectFit="cover"
              alt={o.title ? o.title : "Bild från DinVinGuide"}
              className="opacity-60"
            />
          )}
          <div className="relative p-5">
            <div className="px-3 border-l-4 border-brand-bronze">
              <h3>{data["title"]}</h3>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};
ArrayListItem.displayName = "ArrayListItem";
export default ArrayListItem;
