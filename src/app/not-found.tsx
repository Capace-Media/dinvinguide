import Link from "next/link";
import ExplorePages from "./components/ExplorePages";

export default function NotFound() {
  return (
    <>
      <div className="layout bg-white pt-[80px]">
        <div className="w-full h-[30px] bg-[#F7F7E5] lg:col-span-5"></div>
        <h1>404 SIDAN FINNS TYVÄRR INTE</h1>
        <p>Denna sida finns tyvärr inte.</p>
      </div>
      <ExplorePages />
    </>
  );
}
