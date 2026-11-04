import {
  Fagel,
  Fisk,
  Flask,
  Lamm,
  Not,
  Skaldjur,
  Veganskt,
  Vegetariskt,
} from "@/components/icons";
import ingredientLinks from "@/json/ingrediens.json";
import Link from "next/link";
import type { ElementType } from "react";

const iconMapping: Readonly<Record<string, ElementType>> = {
  "fagel-slug": Fagel,
  "fisk-slug": Fisk,
  "flask-slug": Flask,
  "lamm-slug": Lamm,
  "not-slug": Not,
  "skaldjur-slug": Skaldjur,
  "veganskt-slug": Veganskt,
  "vegetariskt-slug": Vegetariskt,
};
const Ingredients = () => {
  return (
    <section className="layout bg-white">
      <div className="pb-8">
        <h2>Recept baserat på ingrediens</h2>
      </div>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ingredientLinks.map((link) => {
          const IconComponent = iconMapping[`${link.slug}-slug`];
          return (
            <li key={link.id}>
              <Link
                href={`/recept/ingrediens/${link.slug}`}
                className="flex h-50 flex-col items-center justify-center gap-3 bg-brand-secondary font-sub text-[27px] text-white lg:duration-300 lg:ease-in-out lg:hover:scale-[1.03]"
              >
                {IconComponent ? <IconComponent /> : null}
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Ingredients;
