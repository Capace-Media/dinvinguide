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
          <p className="text-2xl">We use cookies!</p>
          <p className="text-sm">
            We use cookies to gather valuable information that helps us improve
            our website and our business.
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
              <p>
                Manage data that Google Analytics collects on websites you visit
              </p>
              <p className="text-xs text-brand-light-500">
                Website owners improve their website using data collected in
                Google Analytics
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
              <p>
                Accept general cookies for performance and user accessibility{" "}
              </p>
              <p className="text-xs text-brand-light-500">
                Website owners improve their website using cookies for
                performance and user accessibility
              </p>
            </div>
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            className="inline-block rounded-[4px] bg-gray-700 py-[11px] px-[44px] text-[14px] text-white duration-200 ease-in-out hover:scale-105"
            onClick={() => dispatch({ type: "acceptCurrent" })}
          >
            Allow all
          </button>
          <button
            className="bg-brand-dark-500 inline-block rounded-[4px] border-2 py-[11px] px-[33px] text-[14px] text-brand-light-300 duration-200 ease-in-out hover:scale-105"
            onClick={() => dispatch({ type: dispatchValue })}
          >
            Allow Selection
          </button>
          <button
            className="bg-brand-dark-500 inline-block rounded-[4px] border-2  py-[11px] px-[33px] text-[14px] text-brand-light-300 duration-200 ease-in-out hover:scale-105"
            onClick={() => dispatch({ type: "declineAll" })}
          >
            Deny
          </button>
        </div>
        <Link href="/privacy-policy">
          <a className="text-sm text-brand-light-500 hover:underline">
            Privacy Policy
          </a>
        </Link>
      </div>
    </section>
  );
};

export default CookiePopup;
