import "dayjs/locale/sv";

import dayjs from "dayjs";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import ClientAd from "../ads/ClientAd";
import BreadCrumbs from "../common/BreadCrumbs/Breadcrumbs";
import ExplorerLinks from "../common/explorer/explorerLinks";
import SEO from "../common/SEO";

const DrinkPageTemplateOld = ({ data }) => {
  const { page: drink } = data;
  const details = [
    // {
    //   label: 'Ekologiskt',
    //   value: drink?.acf_drinks?.ekologiskt ? 'Ja' : 'Nej',
    // },
    // { label: 'Veganvin', value: drink?.acf_drinks?.vagn ? 'Ja' : 'Nej' },
    {
      label: "Publiceringsdatum",
      value: dayjs(drink?.date).locale("sv").format("D MMMM, YYYY"),
    },
  ];

  return (
    <>
      <SEO
        title={drink?.seo?.title}
        description={drink?.seo?.metaDesc}
        image={drink?.featuredImage?.node}
      />
      <BreadCrumbs
        crumbs={[
          { text: "Drycker", href: "/dryckesutforskaren" },
          { text: drink.title, href: drink.uri, current: true },
        ]}
      />
      <div className="row">
        <ClientAd position="top" />
      </div>

      <div className="grid gap-10 lg:grid-cols-3 contain-md row">
        <div className="relative">
          <figure className="aspect-w-1 aspect-h-1">
            <div className="absolute top-0 left-0 w-full h-full scale-90 translate-y-5 rounded-full bg-brand-red" />
            {drink?.featuredImage?.node?.mediaItemUrl && (
              <Image
                src={drink.featuredImage.node.mediaItemUrl}
                layout="fill"
                objectFit="contain"
                priority
                alt={
                  drink.featuredImage.node.altText
                    ? drink.featuredImage.node.altText
                    : drink.seo.title
                }
              />
            )}
          </figure>
        </div>
        <div className="lg:col-span-2">
          <h1 className="normal-case text-brand-red">{drink.title}</h1>
          <p className="mt-3 space-x-1">
            {drink?.acf_drinks?.land && <span>{drink.acf_drinks.land}</span>}
            {drink?.acf_drinks?.argang && (
              <span>{drink.acf_drinks.argang},</span>
            )}
            {drink?.acf_drinks?.dryckestyper?.name && (
              <span>{drink.acf_drinks.dryckestyper.name},</span>
            )}
            {drink?.acf_drinks?.forpackningar?.name && (
              <span>{drink.acf_drinks.forpackningar.name}</span>
            )}
          </p>
          {drink.acf_drinks?.pris && (
            <p className="mt-6 text-3xl">{drink.acf_drinks.pris}:-</p>
          )}

          {drink.acf_drinks?.beskrivning && (
            <div className="mt-5">
              <strong className="block font-semibold">Beskrivning</strong>
              {parse(drink.acf_drinks.beskrivning)}
            </div>
          )}
          {drink.acf_drinks?.recension && (
            <div className="mt-5 ">
              <strong className="block font-semibold">Recension</strong>
              {parse(drink.acf_drinks.recension)}
            </div>
          )}
          <ul className="space-y-2 mt-7">
            {details.map((item, index) => {
              if (item.value) {
                return (
                  <li
                    key={item.label + index}
                    className="grid grid-cols-2 gap-5"
                  >
                    <strong className="font-semibold">{item.label}</strong>
                    <span>{item.value}</span>
                  </li>
                );
              }
            })}
          </ul>

          <div className="flex items-center row">
            {drink?.acf_drinks?.knappUrl && (
              <a
                href={drink?.acf_drinks?.knappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-white bg-brand-red"
              >
                Kan beställas här
              </a>
            )}
            {drink?.acf_drinks?.bolagetAdress && (
              <a
                href={drink.acf_drinks.bolagetAdress}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-white bg-brand-red"
              >
                Beställ på Systembolaget
              </a>
            )}
          </div>
          {drink?.acf_drinks?.passarTillRecept &&
            drink?.acf_drinks?.passarTillRecept?.length > 0 && (
              <>
                <Link href={drink?.acf_drinks?.passarTillRecept[0]?.uri || "/"}>
                  <a className="relative block group">
                    <div className="mt-5 overflow-hidden bg-black">
                      <figure className="relative transition-all aspect-w-16 aspect-h-8 opacity-70 group-hover:scale-110">
                        <Image
                          src={
                            drink.acf_drinks?.passarTillRecept[0]?.featuredImage
                              ?.node?.mediaItemUrl
                              ? drink.acf_drinks.passarTillRecept[0]
                                  .featuredImage.node.mediaItemUrl
                              : "/images/recipe-placeholder.jpg"
                          }
                          layout="fill"
                          objectFit="cover"
                          alt={
                            drink.acf_drinks.passarTillRecept[0].featuredImage
                              ?.node.altText
                              ? drink.acf_drinks.passarTillRecept[0]
                                  .featuredImage.node.altText
                              : drink.acf_drinks.passarTillRecept[0].title
                          }
                        />
                      </figure>
                      <div className="absolute top-0 left-0 p-3 text-white">
                        <p>Passar med</p>
                        <strong className="block">
                          {drink?.acf_drinks?.passarTillRecept[0]?.title}
                        </strong>
                      </div>
                    </div>
                  </a>
                </Link>
              </>
            )}
        </div>
      </div>
      <ExplorerLinks />
    </>
  );
};

export default DrinkPageTemplateOld;
