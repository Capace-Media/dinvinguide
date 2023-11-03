"use client";

import { SubmitArrow } from "@/components/icons";

import { useState } from "react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [bot, setBot] = useState("");
  const [ageChecked, setAgeChecked] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const hiddenInput = e?.target[2]?.value;

    if (hiddenInput) {
      alert("Var vänlig bekräfta att du är en människa och inte en robot");
      return;
    }
    if (!email) {
      alert("E-postadress saknas");
      return;
    }

    if (!ageChecked) {
      alert("Var vänlig bekräfta att du är över 25 år gammal");
      return;
    }

    // Only submit the form if ageChecked is true
    e.target.submit();
  };

  const handleCheckboxChange = (e: any) => {
    setAgeChecked(e.target.checked);
  };
  return (
    <div>
      <div className="text-[#333]">
        <h2 className="font-main text-[19px]">Nyhetsbrev</h2>
        <h3 className=" font-sub text-[32px] lg:text-[38px] xl:text-[42px]">
          Registrera dig för vårt <br /> inspirerande nyhetsbrev
        </h3>

        <p className="text-[#999999] text-main text-[14px] py-4">
          och få information om inspirerande artiklar, exklusiva viner,
          erbjudanden samt innehåll om alkoholhaltiga drycker. (Du kan när som
          helst avregistrera dig).
        </p>
      </div>
      <form
        action={"https://app.mailerlite.com/webforms/submit/g6z4j7"}
        data-code="g6z4j7"
        method="POST"
        target="_blank"
        className=""
        onSubmit={handleSubmit}
      >
        <div className="w-full bg-white relative mb-4">
          <input
            type="email"
            name="fields[email]"
            id="email"
            placeholder="Skriv din e-post här"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 pl-2 w-full focus:outline-none"
          />

          <button
            type="submit"
            className=" bg-brand-secondary p-2 absolute right-2 center-y"
          >
            <SubmitArrow />
          </button>
        </div>

        <input
          id="error"
          name="error"
          placeholder=""
          type="hidden"
          autoComplete="off"
          value={bot}
          onChange={(e) => setBot(e.target.value)}
        />
        <input type="hidden" name="ml-submit" value={email === "" ? "1" : ""} />

        <div className=" flex items-center gap-2">
          <input
            type="checkbox"
            name="checkbox"
            checked={ageChecked}
            onChange={handleCheckboxChange}
          />
          <label className="text-[12px] text-[#4d4d4d]">
            Jag är över 25 år och accepterar mailutskick
          </label>
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;
