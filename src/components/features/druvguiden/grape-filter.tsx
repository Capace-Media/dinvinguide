"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import blue from "../../../../public/Images/blaa_druvor_kategori.webp";
import green from "../../../../public/Images/grona_druvor_kategori.webp";

const GrapeFilter = () => {
  const router = useRouter();
  return (
    <div className="py-10">
      <h2 className="pb-10">Sortera efter druva</h2>
      <nav>
        <ul className="grid grid-cols-3 gap-4">
          <li>
            <button
              onClick={() => {
                router.push(`/druvguiden`, { scroll: false });
              }}
              className="w-full relative h-55.5"
            >
              <span className="absolute w-full h-full top-0 left-0 bg-[#3333335a] z-2"></span>
              <Image
                src={green}
                alt="bild på gröna druvor"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
              <p className="absolute z-4 text-white font-sub center-x center-y text-[26px] border-b-2 border-white">
                Alla Druvor
              </p>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push(`/druvguiden?filter=grona-druvsorter`, {
                  scroll: false,
                });
              }}
              className="w-full relative h-55.5"
            >
              <span className="absolute w-full h-full top-0 left-0 bg-[#3333335a] z-2"></span>
              <Image
                src={green}
                alt="bild på gröna druvor"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
              <p className="absolute z-4 text-white font-sub center-x center-y text-[26px] border-b-2 border-white">
                Gröna druvor
              </p>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push(`/druvguiden?filter=bla-druvsorter`, {
                  scroll: false,
                });
              }}
              className="w-full relative h-55.5"
            >
              <span className="absolute w-full h-full top-0 left-0 bg-[#3333335a] z-2"></span>
              <Image
                src={blue}
                alt="bild på blå druvor"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
              <p className="absolute z-4 text-white font-sub center-x center-y text-[26px] border-b-2 border-white">
                Blåa druvor
              </p>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default GrapeFilter;
