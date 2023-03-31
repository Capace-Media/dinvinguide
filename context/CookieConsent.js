import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import CookiePopup from "../components/gdpr/CookiePopup";

const COOKIE_NAME = "consent";

const CookieConsentStateContext = createContext(null);
const CookieConsentDispatchContext = createContext(undefined);

function getCookie() {
  const regex = new RegExp(
    `(?:(?:^|.*;\\s*)${COOKIE_NAME}\\s*\\=\\s*([^;]*).*$)|^.*$`
  );
  if (process.browser) {
    const cookie = document?.cookie?.replace(regex, "$1");
    return cookie.length ? JSON.parse(cookie) : undefined;
  }
}

let initialCookieValue = getCookie() || {
  isSet: 0,
  marketing: 1,
  ga: 1,
  cookie: 1,
};

const removeGA = () => {
  document.cookie =
    "_ga=; path=/; domain=" +
    process.env.NEXT_PUBLIC_DOMAIN +
    "; expires=" +
    new Date(0).toUTCString();
  document.cookie =
    "_gid=; path=/; domain=" +
    process.env.NEXT_PUBLIC_DOMAIN +
    "; expires=" +
    new Date(0).toUTCString();
};

const CookieConsentProvider = ({ children }) => {
  const [popupIsOpen, setPopupIsOpen] = useState(!initialCookieValue.isSet);

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "acceptCurrent":
        setPopupIsOpen(false);
        return {
          ...state,
          isSet: 1,
        };
      case "acceptOnlyGoogle":
        setPopupIsOpen(false);
        return {
          isSet: 1,
          marketing: 0,
          ga: 1,
          cookie: 0,
        };
      case "acceptOnlyCookie":
        setPopupIsOpen(false);
        removeGA();
        return {
          isSet: 1,
          marketing: 0,
          ga: 0,
          cookie: 1,
        };
      case "declineAll":
        setPopupIsOpen(false);
        removeGA();
        return {
          isSet: 1,
          marketing: 0,
          ga: 0,
          cookie: 0,
        };
      case "showCookiePopup":
        setPopupIsOpen(true);
        return state;
      default:
        throw new Error();
    }
  }, initialCookieValue);
  useEffect(() => {
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 10); // Set the expiration date to 10 days from now
    document.cookie = `${COOKIE_NAME}=${JSON.stringify(
      state
    )};expires=${expirationTime.toUTCString()};path=/`;
  }, [state]);

  return (
    <CookieConsentStateContext.Provider value={state}>
      <CookieConsentDispatchContext.Provider value={dispatch}>
        {popupIsOpen && <CookiePopup dispatch={dispatch} />}
        <div>{children}</div>
      </CookieConsentDispatchContext.Provider>
    </CookieConsentStateContext.Provider>
  );
};

function useCookieConsentState() {
  const context = useContext(CookieConsentStateContext);
  if (context === undefined) {
    throw new Error("useCookieConsentState must be used within CookieProvider");
  }
  return context;
}

function useCookieConsentDispatch() {
  const context = useContext(CookieConsentDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsentDispatch must be used within CookieProvider"
    );
  }
  return context;
}

export {
  CookieConsentProvider,
  useCookieConsentState,
  useCookieConsentDispatch,
};
