import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { getDrinkTip } from "@/lib/api/drink-tips/get-drink-tips";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import DlTop from "@/shared/components/ads/dl/top";
import DlMid from "@/shared/components/ads/dl/mid";
import { Suspense } from "react";
import Line from "@/components/graphic/Line";
import DrinkTipDetails from "@/components/features/dryckestips/drink-tip/drink-tip-details";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const page = await getDrinkTip(`/dryckestips/${params.slug}`);

  const seo: any = page?.seo;

  const uri = `/dryckestips/${page?.slug}`;

  const img = {
    url: seo?.opengraphImage?.mediaItemUrl
      ? seo.opengraphImage.mediaItemUrl
      : "",
    alt: seo?.opengraphImage?.altText ? seo.opengraphImage.altText : "",
  };

  const previousMeta: MetaInfo = (await parent) as unknown as MetaInfo;

  const data = await dynamicSeo({ seo, previousMeta, uri, img });

  return data;
}

const DrinkTipsPage = async (props: Props) => {
  const params = await props.params;
  const drinkTip = await getDrinkTip(`/dryckestips/${params.slug}`);

  if (!drinkTip) {
    notFound();
  }

  return (
    <>
      <div className="layout bg-white pt-28">
        <Line />
      </div>
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlTop />
      </Suspense>
      <DrinkTipDetails drinkTip={drinkTip} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlMid />
      </Suspense>
      <Newsletter />
    </>
  );
};

export default DrinkTipsPage;
