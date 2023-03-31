import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookieConsentState } from "../../context/CookieConsent";

const CookiePopup = ({ dispatch }) => {
  const [isChecked, setChecked] = useState({
    google: 1,
    cookies: 1,
  });
  const cookieConsentState = useCookieConsentState();
  const [dispatchValue, setDispatchValue] = useState("acceptAll");

  const [showPopup, setPopup] = useState(false);

  useEffect(() => {
    if (!cookieConsentState?.isSet && showPopup !== undefined) {
      setPopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopup]);

  useEffect(() => {
    if (isChecked?.google === 1 && isChecked?.cookies === 1) {
      setDispatchValue("acceptCurrent");
    } else if (isChecked?.google === 1 && isChecked?.cookies === 0) {
      setDispatchValue("acceptOnlyGoogle");
    } else if (isChecked?.google === 0 && isChecked?.cookies === 1) {
      setDispatchValue("acceptOnlyCookie");
    } else {
      setDispatchValue("declineAll");
    }
    return () => {
      setDispatchValue("acceptAll");
    };
  }, [isChecked]);

  if (!showPopup) {
    return null;
  }
  return (
    <section
      id="gdpr"
      key="gdpr"
      className="light_box fixed top-0 left-0 z-50 h-full w-full"
    >
      <div className="absolute top-2/4 left-2/4 z-50 flex w-[94vw] -translate-y-2/4 -translate-x-2/4 flex-col gap-5 rounded bg-white p-10 md:w-[80vw]">
        <div>
          <p className="text-2xl">Hej!</p>
          <p className="text-sm">
            Vi använder cookies för att förbättra din upplevelse på vår
            webbplats. Cookies är små textfiler som lagras på din enhet när du
            besöker vår webbplats. De hjälper oss att förstå hur du använder vår
            webbplats och ger oss möjlighet att skräddarsy innehållet för dig.
            Vi vill gärna erbjuda dig möjligheten att anpassa dina
            cookie-inställningar.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="google" className="flex flex-wrap gap-3">
            <input
              type="checkbox"
              id="google"
              defaultChecked
              value={isChecked.google}
              onChange={() =>
                setChecked({
                  ...isChecked,
                  google: isChecked.google === 1 ? 0 : 1,
                })
              }
              className="relative h-6 w-12 cursor-pointer appearance-none rounded-full border-2 border-black bg-white bg-opacity-5 transition duration-200 checked:bg-gray-200"
            />
            <div
              className={`${
                isChecked.google ? "" : "line-through"
              } max-w-[90%]`}
            >
              <p>Statistikinställning:</p>
              <p className="text-xs text-brand-light-500">
                Genom att tillåta statistikcookies hjälper du oss att förbättra
                vår webbplats genom att samla in information om hur den används.
                Dessa cookies samlar in anonymiserade data om hur många besökare
                vi har på vår webbplats, vilka sidor som är mest populära och
                hur länge besökarna stannar på vår webbplats. Denna information
                hjälper oss att förstå vilka delar av vår webbplats som behöver
                förbättras och hur vi kan förbättra användarupplevelsen. Du kan
                när som helst stänga av dessa cookies genom att ändra dina
                cookie-inställningar.
              </p>
            </div>
          </label>
          <label htmlFor="cookies" className="flex flex-wrap gap-3">
            <input
              type="checkbox"
              id="cookies"
              defaultChecked
              value={isChecked.cookies}
              onChange={() =>
                setChecked({
                  ...isChecked,
                  cookies: isChecked.cookies === 1 ? 0 : 1,
                })
              }
              className="relative h-6 w-12 cursor-pointer appearance-none rounded-full border-2 border-black bg-white bg-opacity-5 transition duration-200 checked:bg-gray-200"
            />
            <div
              className={`${
                isChecked.cookies ? "" : "line-through"
              } max-w-[90%]`}
            >
              <p>Användarvänlighetsinställning:</p>
              <p className="text-xs text-brand-light-500">
                Genom att tillåta cookies för användarvänlighet hjälper du oss
                att förbättra din upplevelse på vår webbplats. Dessa cookies
                tillåter oss att komma ihåg dina preferenser och inställningar,
                såsom språk och val av enhet, så att du inte behöver göra samma
                val varje gång du besöker vår webbplats. De kan också användas
                för att förbättra webbplatsens funktionalitet. Du kan när som
                helst stänga av dessa cookies genom att ändra dina
                cookie-inställningar.
              </p>
            </div>
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            className="inline-block rounded-[4px] bg-gray-700 py-[11px] px-[44px] text-[14px] text-white duration-200 ease-in-out hover:scale-105"
            onClick={() => dispatch({ type: "acceptCurrent" })}
          >
            Tillåt alla cookies
          </button>
          <button
            className="bg-brand-dark-500 inline-block rounded-[4px] border-2 py-[11px] px-[33px] text-[14px] text-brand-light-300 duration-200 ease-in-out hover:scale-105"
            onClick={() => dispatch({ type: dispatchValue })}
          >
            Tillåt endast valda cookies
          </button>
          <button
            className="bg-brand-dark-500 inline-block rounded-[4px] border-2  py-[11px] px-[33px] text-[14px] text-brand-light-300 duration-200 ease-in-out hover:scale-105"
            onClick={() => dispatch({ type: "declineAll" })}
          >
            Neka alla cookies
          </button>
        </div>
        {/* <Link href="/privacy-policy">
          <a className="text-sm text-brand-light-500 hover:underline">
            Privacy Policy
          </a>
        </Link> */}
      </div>
    </section>
  );
};

export default CookiePopup;
