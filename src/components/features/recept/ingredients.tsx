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
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ingredientLinks.map((link) => {
            const IconComponent = iconMapping[`${link.slug}-slug`];
            return (
              <li key={link.id}>
                <Link
                  href={`/recept/ingrediens/${link.slug}`}
                  className="h-50 lg:hover:scale-[1.03] lg:ease-in-out lg:duration-300 bg-brand-secondary text-white flex flex-col gap-3 justify-center items-center font-sub text-[27px]"
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
