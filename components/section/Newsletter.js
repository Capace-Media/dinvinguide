import Image from "next/image";
import { useState } from "react";
import ImageOne from "../../public/images/static-newsletter/newNewsletter.jpg";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [ageChecked, setAgeChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hiddenInput = e?.target?.name["error"];
    if (hiddenInput?.value === "" && ageChecked) {
      e.target.submit();
    } else {
      alert("Please check the age box and try again.");
    }
  };

  const handleCheckboxChange = (e) => {
    setAgeChecked(e.target.checked);
  };
  return (
    <div className="font-body">
      <div className="overlay-sm md:overlay-md relative h-[80vh] transform -scale-x-100">
        <Image
          src={ImageOne}
          layout="fill"
          objectFit="cover"
          alt="DinVinguides nyhetsbrev"
          objectPosition="left top"
        />
        <div className="z-10 text-white absolute right-0 lg:right-[5.24rem] xl:right-[50%] xl:translate-x-[50%] w-[100%] xl:w-[1536px] h-full md:w-[70%] lg:w-[50%] flex flex-col justify-center space-y-10 px-4 xl:px-0 transform -scale-x-100">
          <div className="xl:w-[50%] xl:ml-32">
            <div className="">
              <p className="flex flex-col font-extrabold">
                <span className="text-[14px]">NYHETSBREV</span>
                <span className="text-[24px] font-display">
                  Registrera dig för vårt <br />
                  inspirerande nyhetsbrev
                </span>
              </p>
              <p className="text-[14px]">
                och få information om inspirerande artiklar, exklusiva viner,
                erbjudanden samt innehåll om alkoholhaltiga drycker. (Du kan när
                som helst avregistrera dig).
              </p>
            </div>
            <form
              action={"https://app.mailerlite.com/webforms/submit/g6z4j7"}
              data-code="g6z4j7"
              method="POST"
              target="_blank"
              onSubmit={handleSubmit}
              className="flex flex-col mt-5 text-white"
            >
              <input
                type="text"
                name="fields[email]"
                id="email"
                placeholder="E-postadress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 px-5 mb-4 text-black placeholder-[#000000] bg-[#D9D9D9] border-b-2"
              />
              <input type="hidden" name="ml-submit" value="1" />
              <input type="hidden" name="error" value="" />
              <input
                type="hidden"
                name="ml-submit"
                value={email === "" ? "1" : ""}
              />

              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={ageChecked}
                  onChange={handleCheckboxChange}
                />
                <label className="text-[12px]">
                  Jag är över 25 år och accepterar mailutskick
                </label>
              </div>

              <button
                type="submit"
                className="btn"
                onClick={(e) => handleSubmit(e)}
              >
                PRENUMERERA
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
