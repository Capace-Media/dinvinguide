import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import { BestchampagneLogoBlack, Dryckeslistanlogo2, DvgLogo } from "../icons";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  const router = useRouter();
  const isDryckeslistan = router.asPath.includes("dryckeslistan");
  const handleExitPreview = async () => {
    const res = await fetch("/api/preview/exit");
    window.location.replace("/");
  };

  return (
    <>
      <Header />
      <div className="pb-8 contain flex justify-center items-center mt-[114px] space-x-3">
        <a
          href="https://bestchampagne.se"
          className="w-[200px] h-[30px]"
          target="noreferrer"
        >
          <BestchampagneLogoBlack />
        </a>

        <div className="w-[2px] bg-black h-[25px]"></div>
        <Link href={isDryckeslistan ? "/" : "/dryckeslistan"}>
          <a className="w-[200px] h-[30px]">
            {isDryckeslistan ? (
              <>
                <DvgLogo />
              </>
            ) : (
              <>
                <Dryckeslistanlogo2 />
              </>
            )}
          </a>
        </Link>
      </div>
      <main className="">{children}</main>
      <Footer />
      {router.isPreview && (
        <div className="fixed bottom-0 left-0 z-50 flex items-center justify-center w-screen py-2 space-x-3 text-sm text-center text-white uppercase bg-black lg:space-x-10 lg:text-base">
          <p>Förhandsgranskning</p>
          <span
            className="px-3 py-1 font-semibold text-black bg-white rounded cursor-pointer lg:px-4 lg:py-2"
            onClick={() => handleExitPreview()}
          >
            Lämna
          </span>
        </div>
      )}
    </>
  );
}
