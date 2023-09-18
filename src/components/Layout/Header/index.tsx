import Script from "next/script";
import { Fragment } from "react";
import Nav from "./nav";
import TopNav from "./topnav";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <Fragment>
      <Script
        strategy="lazyOnload"
        type="text/javascript"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
      <Script
        strategy="lazyOnload"
        id="google-translate"
        type="text/javascript"
      >
        {`function googleTranslateElementInit() {
            new google.translate.TranslateElement({pageLanguage: 'sv'}, 'google_translate_element');
          }`}
      </Script>
      <header className="">
        <TopNav />
        <Nav />
      </header>
    </Fragment>
  );
};

export default Header;
