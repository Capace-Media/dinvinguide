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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/recept/maltider/forratter"
          className="flex h-50 flex-col items-center justify-center gap-3 bg-brand-primary font-sub text-[27px] text-white lg:duration-300 lg:ease-in-out lg:hover:scale-[1.03]"
        >
          <Forratter />
          Förrätter
        </Link>
        <Link
          href="/recept/maltider/huvudratter"
          className="flex h-50 flex-col items-center justify-center gap-3 bg-brand-primary font-sub text-[27px] text-white lg:duration-300 lg:ease-in-out lg:hover:scale-[1.03]"
        >
          <Huvudratter />
          Huvudrätter
        </Link>
        <Link
          href="/recept/maltider/frukost"
          className="flex h-50 flex-col items-center justify-center gap-3 bg-brand-primary font-sub text-[27px] text-white lg:duration-300 lg:ease-in-out lg:hover:scale-[1.03]"
        >
          <Frukost />
          Frukost
        </Link>
        <Link
          href="/recept/maltider/specialkost"
          className="flex h-50 flex-col items-center justify-center gap-3 bg-brand-primary font-sub text-[27px] text-white lg:duration-300 lg:ease-in-out lg:hover:scale-[1.03]"
        >
          <Specialkost />
          Specialkost
        </Link>
        <Link
          href="/recept/maltider/efterratter"
          className="flex h-50 flex-col items-center justify-center gap-3 bg-brand-primary font-sub text-[27px] text-white lg:duration-300 lg:ease-in-out lg:hover:scale-[1.03]"
        >
          <Efterratter />
          Efterrätter
        </Link>
        <Link
          href="/recept/maltider/tilltugg-snacks"
          className="flex h-50 flex-col items-center justify-center gap-3 bg-brand-primary font-sub text-[27px] text-white lg:duration-300 lg:ease-in-out lg:hover:scale-[1.03]"
        >
          <TilltuggSnacks />
          Tilltugg/snacks
        </Link>
        <Link
          href="/recept/receptbanken"
          className="flex h-50 flex-col items-center justify-center gap-3 bg-brand-primary font-sub text-[27px] text-white md:col-span-2 lg:duration-300 lg:ease-in-out lg:hover:scale-[1.03]"
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
