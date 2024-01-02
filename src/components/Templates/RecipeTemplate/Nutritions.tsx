interface NutritionsProps {
  data: any;
}

const Nutritions = ({ data }: NutritionsProps) => {
  if (!data?.kolhydrater) {
    return null;
  }
  return (
    <section className="bg-[#F5F5F5] p-4 rounded-[8px]">
      <h2 className="text-[28px] pb-5">Näringsinnehåll</h2>

      <ul className="flex flex-col gap-3">
        <li>
          <span>Energi: </span>
          <span>{data?.energKcal} kcal</span>
        </li>
        <li>
          <span>Fett: </span>
          <span>{data?.fett} g</span>
        </li>
        <li>
          <span>Kolhydrater: </span>
          <span>{data?.kolhydrater} g</span>
        </li>
        <li>
          <span>Protein: </span>
          <span>{data?.protein} g</span>
        </li>
      </ul>
    </section>
  );
};

export default Nutritions;
