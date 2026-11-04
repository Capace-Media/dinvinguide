import handleParseClient from "@/lib/utils/handle-parse-client";
import type { AcfRecipe } from "./types";

interface InstructionsProps {
  process: AcfRecipe["processen"] | undefined;
  stepByStep: AcfRecipe["beskrivningStegForSteg"] | undefined;
}

const Instructions = ({ stepByStep, process }: InstructionsProps) => {
  return (
    <section className="rounded-[8px] bg-[#F5F5F5] p-4 md:bg-white md:p-0">
      <div className="flex items-center justify-between pb-10">
        <h2 className="text-[32px]">Instruktioner</h2>
      </div>
      {!stepByStep && (
        <div className="parsed">{handleParseClient(process ?? "")}</div>
      )}

      {stepByStep && (
        <ul>
          {stepByStep.map((step) => (
            <li key={step?.instruktion} className="parsed">
              {handleParseClient(step?.instruktion ?? "")}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Instructions;
