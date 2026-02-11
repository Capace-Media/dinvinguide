import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import CookieConsent from "@/components/CookieConsent";
import Provider from "@/lib/Provider";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Abril_Fatface, Poppins } from "next/font/google";
import { draftMode } from "next/headers";
import { Suspense } from "react";
import Loading from "./loading";
import DraftModeBanner from "./_components/DraftModeBanner";
import "./styles/global.scss";
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
import ScrollToTopButton from "@/components/scroll-to-top-button";

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-abrilFatface",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export const viewport = {
  themeColor: "#400D12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Lär dig allt om vin och mat hos DinVinguide.se",
  other: {
    developer: "Rick Centerhall",
    "developer-url": "https://www.linkedin.com/in/rickcenterhall/",
    copyright: "© DinVinguide.se - Developed by Rick Centerhall",
    humansTxt: "/humans.txt",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#400D12",
      },
    ],
  },
  description:
    "Genom våra topplistor vill vi hjälpa dig att göra livet godare och bättre. Våra skribenter inspirerar och utbildar dig inom mat och dryck.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  generator: "Next.js",
  applicationName: "DinVinguide.se",
  keywords: ["Vin", "Vinguide", "Recept", "Bubbel", "Mat", "Vin resensioner"],
  authors: [{ url: "/humans.txt" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="sv" className={cn(poppins.variable, abrilFatface.variable)}>
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string}
      />
      <body>
        <div className="relative">

          <Header />
          <main className="">
            <Provider>{children}</Provider>
            <DraftModeBanner isEnabled={isEnabled} />
          </main>
          <Footer />
        </div>
        <>
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
        </>
        <CookieConsent />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
