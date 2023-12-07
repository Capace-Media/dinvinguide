import {
  Efterratter,
  Forratter,
  Frukost,
  Huvudratter,
  Specialkost,
  TilltuggSnacks,
} from "@/components/icons";
import Link from "next/link";

interface MealsProps {}

const Meals = ({}: MealsProps) => {
  return (
    <section className="layout bg-white">
      <div className="pb-8">
        <h2 className="">Måltider</h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Link
          href="/recept/forratter"
          className="h-[200px] lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300  bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Forratter />
          Förrätter
        </Link>
        <Link
          href="/recept/huvudratter"
          className="h-[200px] lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Huvudratter />
          Huvudrätter
        </Link>
        <Link
          href="/recept/frukost"
          className="h-[200px] lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Frukost />
          Frukost
        </Link>
        <Link
          href="/recept/specialkost"
          className="h-[200px] lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Specialkost />
          Specialkost
        </Link>
        <Link
          href="/recept/efterratter"
          className="h-[200px] lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <Efterratter />
          Efterrätter
        </Link>
        <Link
          href="/recept/tilltugg-snacks"
          className="h-[200px] lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
        >
          <TilltuggSnacks />
          Tilltugg/snacks
        </Link>
        <Link
          href="/recept/efterratter"
          className="h-[200px] lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-primary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px] col-span-2"
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
