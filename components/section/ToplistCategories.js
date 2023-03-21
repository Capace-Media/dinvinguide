import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useResized from "../../hooks/useResized";
import alk from "../../public/images/top/alkoholfri.jpg";
import alkCard from "../../public/images/top/alkoholfriCard.jpg";
import hall from "../../public/images/top/hallbart.jpg";
import hallCard from "../../public/images/top/hallbartCard.jpg";
import moCard from "../../public/images/top/mousserande-card.jpg";
import mo from "../../public/images/top/mousserande.jpg";
import rodbox from "../../public/images/top/rod-box.jpg";
import rodflaska from "../../public/images/top/rod-flaska.jpg";
import rodvinbox from "../../public/images/top/roda-viner-box.jpg";
import rodvinflaska from "../../public/images/top/roda-viner-flaska.jpg";
import roseCard from "../../public/images/top/rose-card.jpg";
import rose from "../../public/images/top/rose.jpg";
import vitbox from "../../public/images/top/vit-box.jpg";
import vitflaska from "../../public/images/top/vit-flaska.jpg";
import vitvinbox from "../../public/images/top/vita-viner-box.jpg";
import vitvinflaska from "../../public/images/top/vita-viner-flaska.jpg";
import { Mousserande, RedWine, WhiteWine } from "../icons";

const ToplistCategories = ({ top, i }) => {
  const size = 641;
  let isSm = useResized(size);
  return isSm ? <Sm top={top} /> : <Lg top={top} i={i} />;
};

export default ToplistCategories;

export const Sm = ({ top }) => {
  let packs = top?.acf_toplists?.forpackningar;
  let slogan = top?.acf_toplists?.slogan;
  let uri = top?.uri;

  const [image, setImage] = useState(vitflaska?.src);
  const [svg, setSvg] = useState(<Mousserande />);

  useEffect(() => {
    switch (uri) {
      case "/topplistor/flaska-vitt/":
        setImage(vitflaska?.src);
        setSvg(<WhiteWine />);
        break;

      case "/topplistor/flaska-rott/":
        setImage(rodflaska?.src);
        setSvg(<RedWine />);
        break;

      case "/topplistor/flaska-mousserande/":
        setImage(moCard?.src);
        setSvg(<Mousserande />);
        break;

      case "/topplistor/box-vitt/":
        setImage(vitbox?.src);
        setSvg(<WhiteWine />);
        break;
      case "/topplistor/box-rott/":
        setImage(rodbox?.src);
        setSvg(<RedWine />);
        break;
      case "/topplistor/rose/":
        setImage(roseCard?.src);
        setSvg(<RedWine />);
        break;
      case "/topplistor/hallbart-val/":
        setImage(hallCard?.src);

        break;
      case "/topplistor/alkoholfritt/":
        setImage(alkCard?.src);

        break;

      default:
        setImage(vitflaska?.src);
        setSvg(<Mousserande />);
        break;
    }

    return () => {
      setSvg(vitflaska?.src);
      setImage(<Mousserande />);
    };
  }, [uri]);

  return (
    <Link
      href={
        uri === "/topplistor/alkoholfritt/"
          ? "/dryckesutforskaren?filter=alkoholfritt"
          : uri
      }
      key={top?.id}
    >
      <a>
        <div className="card max-w-[350px] bg-[#F8F8F9] p-[20px] flex flex-col  ">
          <div className="relative w-[310px] h-[190px]">
            <Image
              src={image}
              objectFit="cover"
              layout="fill"
              alt={top?.acf_toplists?.slogan}
            />
          </div>

          {uri === "/topplistor/alkoholfritt/" ? (
            <div className=" grid grid-cols-6 pt-[20px]">
              <div className="font-body col-span-4">
                <p className="text-[14px]">DRYCKESUTFORSKAREN</p>
                <p className=" font-display font-bold text-[18px]">{slogan}</p>
                <p className=" italic text-[13px]">Testade av redaktionen</p>
              </div>
            </div>
          ) : uri === "/topplistor/hallbart-val/" ? (
            <div className=" grid grid-cols-6 pt-[20px]">
              <div className="font-body col-span-4">
                <p className="text-[14px]">Topplista</p>
                <p className=" font-display font-bold text-[18px]">{slogan}</p>
                <p className=" italic text-[13px]">Systembolagets märkning</p>
              </div>
            </div>
          ) : packs?.find((pack) => pack?.name?.includes("Box")) &&
            !packs?.find((pack) => pack?.name?.includes("Flaska")) ? (
            <div className=" flex justify-between items-center pt-[20px]">
              <div className="font-body">
                <p className="text-[14px]">TOPPLISTA</p>
                <p className=" font-display font-bold text-[18px]">{slogan}</p>
                <p className=" italic text-[13px]">På box</p>
              </div>
              <div className=" scale-75">{svg}</div>
            </div>
          ) : packs?.find((pack) => pack?.name?.includes("Box")) &&
            packs?.find((pack) => pack?.name?.includes("Flaska")) ? (
            <div className=" flex justify-between items-center pt-[20px]">
              <div className="font-body">
                <p className="text-[14px]">TOPPLISTA</p>
                <p className=" font-display font-bold text-[18px]">{slogan}</p>
                <p className=" italic text-[13px]">På flaska & box</p>
              </div>
              <div className=" scale-75">{svg}</div>
            </div>
          ) : (
            <div className=" flex justify-between items-center pt-[20px]">
              <div className="font-body">
                <p className="text-[14px]">TOPPLISTA</p>
                <p className=" font-display font-bold text-[18px]">{slogan}</p>
                <p className=" italic text-[13px]">På flaska</p>
              </div>
              <div className=" scale-75">{svg}</div>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export const Lg = ({ top, i }) => {
  let packs = top?.acf_toplists?.forpackningar;
  let slogan = top?.acf_toplists?.slogan;
  let uri = top?.uri;

  const [image, setImage] = useState(vitvinflaska?.src);
  const [svg, setSvg] = useState(<Mousserande />);

  useEffect(() => {
    switch (uri) {
      case "/topplistor/flaska-vitt/":
        setImage(vitvinflaska?.src);
        setSvg(
          <div className="child col-span-2 scale-75">
            <WhiteWine />
          </div>
        );
        break;

      case "/topplistor/flaska-rott/":
        setImage(rodvinflaska?.src);
        setSvg(
          <div className="child col-span-2 scale-75">
            <RedWine />
          </div>
        );
        break;

      case "/topplistor/flaska-mousserande/":
        setImage(mo?.src);
        setSvg(
          <div className="child col-span-2 scale-75">
            <Mousserande />
          </div>
        );
        break;

      case "/topplistor/box-vitt/":
        setImage(vitvinbox?.src);
        setSvg(
          <div className="child col-span-2 scale-75">
            <WhiteWine />
          </div>
        );
        break;
      case "/topplistor/box-rott/":
        setImage(rodvinbox?.src);
        setSvg(
          <div className="child col-span-2 scale-75">
            <RedWine />
          </div>
        );
        break;
      case "/topplistor/rose/":
        setImage(rose?.src);
        setSvg(
          <div className="child col-span-2 scale-75">
            <RedWine />
          </div>
        );
        break;
      case "/topplistor/hallbart-val/":
        setImage(hall?.src);
        setSvg(
          <div className="two flex col-span-2 scale-[.6]">
            <div className="first">
              <RedWine />
            </div>
            <div className="second">
              <WhiteWine />
            </div>
          </div>
        );
        break;
      case "/topplistor/alkoholfritt/":
        setImage(alk?.src);
        setSvg(
          <div className="two flex col-span-2 scale-[.6]">
            <div className="first">
              <RedWine />
            </div>
            <div className="second">
              <WhiteWine />
            </div>
          </div>
        );
        break;

      default:
        setImage(vitvinflaska?.src);
        setSvg(<Mousserande />);
        break;
    }

    return () => {
      setImage(vitvinflaska?.src);
      setSvg(<Mousserande />);
    };
  }, [uri]);

  return (
    <Link
      href={
        uri === "/topplistor/alkoholfritt/"
          ? "/dryckesutforskaren?filter=alkoholfritt"
          : uri
      }
      key={top?.id}
    >
      <a>
        <div
          className={`${
            i === 2 || i === 4 ? " flex-row-reverse" : ""
          } flex bg-[#F8F8F9] max-w-[630px] parent`}
        >
          <div className="relative w-[314px] h-[312px]">
            <Image
              src={image}
              objectFit="cover"
              layout="fill"
              alt={top?.acf_toplists?.slogan}
            />
          </div>

          <div className="w-[314px] flex flex-col justify-end p-[20px]">
            {uri === "/topplistor/alkoholfritt/" ? (
              <div className=" grid grid-cols-6 pt-[20px]">
                <div className="font-body col-span-4">
                  <p className="text-[14px]">DRYCKESUTFORSKAREN</p>
                  <p className=" font-display font-bold text-[18px]">
                    {slogan}
                  </p>
                  <p className=" italic text-[13px]">Testade av redaktionen</p>
                </div>
                {svg}
              </div>
            ) : uri === "/topplistor/hallbart-val/" ? (
              <div className=" grid grid-cols-6 pt-[20px]">
                <div className="font-body col-span-4">
                  <p className="text-[14px]">Topplista</p>
                  <p className=" font-display font-bold text-[18px]">
                    {slogan}
                  </p>
                  <p className=" italic text-[13px]">Systembolagets märkning</p>
                </div>
                {svg}
              </div>
            ) : packs?.find((pack) => pack?.name?.includes("Box")) &&
              !packs?.find((pack) => pack?.name?.includes("Flaska")) ? (
              <div className=" grid grid-cols-6 pt-[20px]">
                <div className="font-body col-span-4">
                  <p className="text-[14px]">TOPPLISTA</p>
                  <p className=" font-display font-bold text-[18px]">
                    {slogan}
                  </p>
                  <p className=" italic text-[13px]">På box</p>
                </div>
                {svg}
              </div>
            ) : packs?.find((pack) => pack?.name?.includes("Box")) &&
              packs?.find((pack) => pack?.name?.includes("Flaska")) ? (
              <div className="grid grid-cols-6 pt-[20px]">
                <div className="font-body col-span-4">
                  <p className="text-[14px]">TOPPLISTA</p>
                  <p className=" font-display font-bold text-[18px]">
                    {slogan}
                  </p>
                  <p className=" italic text-[13px]">På flaska & box</p>
                </div>
                {svg}
              </div>
            ) : (
              <div className=" grid grid-cols-6 pt-[20px]">
                <div className="font-body col-span-4">
                  <p className="text-[14px]">TOPPLISTA</p>
                  <p className=" font-display font-bold text-[18px]">
                    {slogan}
                  </p>
                  <p className=" italic text-[13px]">På flaska</p>
                </div>
                {svg}
              </div>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};
