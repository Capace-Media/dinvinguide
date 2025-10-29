import Ads from "@/app/_components/ads";
import handleParseClient from "@/lib/utils/handle-parse-client";
import handleParse from "@/lib/utils/handleParse";

interface InstructionComponentProps {
  process: any;
  stepByStep: any;
}

const InstructionComponent = ({
  stepByStep,
  process,
}: InstructionComponentProps) => {
  return (
    <section className="bg-[#F5F5F5] md:bg-white p-4 md:p-0 rounded-[8px]">
      <div className="flex justify-between items-center pb-10">
        <h2 className="text-[32px]">Instruktioner</h2>
      </div>
      {!stepByStep && (
        <div className="parsed">{handleParseClient(process)}</div>
      )}

      {stepByStep && (
        <>
          <ul>
            {stepByStep &&
              stepByStep.map((step: any) => {
                return (
                  <li key={step.instruktion} className="parsed">
                    {handleParseClient(step.instruktion)}
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </section>
  );
};

export default InstructionComponent;
