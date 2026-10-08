import { getPage } from "@/lib/api/pages/get-pages";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";
import AuthorsHero from "./components/AuthorsHero";
import AllAuthors from "./components/authors";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPage("skribenter");
  const seo = data?.seo;

  return {
    title: seo?.title ? seo?.title : "Skribenter | Din Vinguide",
    description: seo?.metaDesc
      ? seo.metaDesc
      : "Möt våra skribenter och vinexperter på Din Vinguide.",
    openGraph: {
      title: seo?.opengraphTitle || seo?.title || "Skribenter | Din Vinguide",
      description:
        seo?.opengraphDescription ||
        seo?.metaDesc ||
        "Möt våra skribenter och vinexperter på Din Vinguide.",
      url: `https://dinvinguide.se/skribenter`,
      images: [
        {
          url: seo?.opengraphImage?.mediaItemUrl
            ? seo.opengraphImage.mediaItemUrl
            : "",
          alt: seo?.opengraphImage?.altText ? seo.opengraphImage.altText : "",
        },
      ],
    },
    alternates: {
      canonical: `https://dinvinguide.se/skribenter`,
    },
  };
}

export default async function Authors() {
  const pageData = await getPage("skribenter");

  return (
    <>
      <AuthorsHero promise={pageData} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <AllAuthors />
      </Suspense>
    </>
  );
}
