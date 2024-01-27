import Analytics from "@/components/Analytics";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Provider from "@/lib/Provider";
import type { Metadata } from "next";
import { Abril_Fatface, Poppins } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import "./styles/global.scss";
import "./styles/globals.css";

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-abrilFatface",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});
export const viewport = {
  themeColor: "#400D12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s | DinVinguide.se",
    default: "DinVinguide.se", // a default is required when creating a template
  },
  other: {
    developer: [
      "Developed by Rick Centerhall - https://www.linkedin.com/in/rickcenterhall/",
    ],
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
  verification: {
    google: "",
    yandex: "",
    yahoo: "",
    other: {
      me: ["", ""],
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: {
      template: "%s | DinVinguide.se",
      default: "DinVinguide.se", // a default is required when creating a template
    },
    description:
      "Genom våra topplistor vill vi hjälpa dig att göra livet godare och bättre. Våra skribenter inspirerar och utbildar dig inom mat och dryck.",
    url: "/",
    siteName: "DinVinguide.se",
    images: [
      {
        url: "/images/seo-image.jpg",
        width: 800,
        height: 600,
        alt: "Bild från DinVinguide.se",
      },
      {
        url: "/images/seo-image.jpg",
        width: 1800,
        height: 1600,
        alt: "Bild från DinVinguide.se",
      },
    ],
    locale: "sv",
    type: "website",
  },
  generator: "Next.js",
  applicationName: "DinVinguide.se",
  keywords: ["Vin", "Vinguide", "Recept", "Bubbel", "Mat", "Vin resensioner"],
  authors: [
    { name: "DinVinguide.se" },
    { name: "Capace Media AB", url: "https://capace.se/" },
  ],
  creator: "DinVinguide.se Team",
  publisher: "DinVinguide.se",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();

  return (
    <html lang="sv">
      <body
        className={`${poppins.variable} ${abrilFatface.variable} font-main`}
      >
        <Provider>
          <Header />
          <Suspense fallback={<Loading />}>
            <main className="">
              {children}
              {isEnabled && (
                <div className="fixed bottom-0 z-10 bg-white gap-3 py-4 left-0 w-full flex justify-center items-center">
                  <p>Förhandsgranskning</p>
                  <Link href="/api/disable-draft" className="btn">
                    Lämna
                  </Link>
                </div>
              )}
            </main>
            <Analytics />
          </Suspense>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
