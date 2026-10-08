import {
  Efterratter,
  Forratter,
  Frukost,
  Huvudratter,
  Specialkost,
  TilltuggSnacks,
} from "@/components/icons";
import Link from "next/link";

const Meals = () => {
  return (
    <section className="layout bg-white">
      <div className="pb-8">
        <h2>Måltider</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/recept/maltider/forratter"
          className="h-50 lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300  bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Forratter />
          Förrätter
        </Link>
        <Link
          href="/recept/maltider/huvudratter"
          className="h-50 lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Huvudratter />
          Huvudrätter
        </Link>
        <Link
          href="/recept/maltider/frukost"
          className="h-50 lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Frukost />
          Frukost
        </Link>
        <Link
          href="/recept/maltider/specialkost"
          className="h-50 lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Specialkost />
          Specialkost
        </Link>
        <Link
          href="/recept/maltider/efterratter"
          className="h-50 lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Efterratter />
          Efterrätter
        </Link>
        <Link
          href="/recept/maltider/tilltugg-snacks"
          className="h-50 lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <TilltuggSnacks />
          Tilltugg/snacks
        </Link>
        <Link
          href="/recept/receptbanken"
          className="h-50 lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px] md:col-span-2"
        >
          <div className="flex items-center gap-6">
            <Efterratter />
            <Forratter />
            <TilltuggSnacks />
            <Huvudratter />
            <Frukost />
            <Specialkost />
          </div>
          Visa alla recept
        </Link>
      </div>
    </section>
  );
};

export default Meals;
