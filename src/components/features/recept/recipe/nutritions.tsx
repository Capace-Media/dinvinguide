import type { AcfRecipe } from "./types";

interface NutritionsProps {
  nutritions: AcfRecipe["nutritions"] | undefined;
}

const Nutritions = ({ nutritions }: NutritionsProps) => {
  if (!nutritions?.kolhydrater) {
    return null;
  }
  return (
    <section className="bg-[#F5F5F5] p-4 rounded-[8px]">
      <h2 className="text-[28px] pb-5">Näringsinnehåll</h2>

      <ul className="flex flex-col gap-3">
        <li>
          <span>Energi: </span>
          <span>{nutritions.energKcal} kcal</span>
        </li>
        <li>
          <span>Fett: </span>
          <span>{nutritions.fett} g</span>
        </li>
        <li>
          <span>Kolhydrater: </span>
          <span>{nutritions.kolhydrater} g</span>
        </li>
        <li>
          <span>Protein: </span>
          <span>{nutritions.protein} g</span>
        </li>
      </ul>
    </section>
  );
};

export default Nutritions;
