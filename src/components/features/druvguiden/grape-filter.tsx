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
              className="relative h-55.5 w-full"
            >
              <span className="absolute top-0 left-0 z-2 h-full w-full bg-[#3333335a]"></span>
              <Image
                src={green}
                alt="bild på gröna druvor"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
              <p className="center-x center-y absolute z-4 border-b-2 border-white font-sub text-[26px] text-white">
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
              className="relative h-55.5 w-full"
            >
              <span className="absolute top-0 left-0 z-2 h-full w-full bg-[#3333335a]"></span>
              <Image
                src={green}
                alt="bild på gröna druvor"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
              <p className="center-x center-y absolute z-4 border-b-2 border-white font-sub text-[26px] text-white">
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
              className="relative h-55.5 w-full"
            >
              <span className="absolute top-0 left-0 z-2 h-full w-full bg-[#3333335a]"></span>
              <Image
                src={blue}
                alt="bild på blå druvor"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
              <p className="center-x center-y absolute z-4 border-b-2 border-white font-sub text-[26px] text-white">
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
