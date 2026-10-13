import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/sok"],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/skribenter/sitemap.xml`,
      `${baseUrl}/topplistor/sitemap.xml`,
      `${baseUrl}/vinskolan/sitemap.xml`,
      `${baseUrl}/druvor/sitemap.xml`,
      `${baseUrl}/drycker/sitemap.xml`,
      `${baseUrl}/ordlistan/sitemap.xml`,
      `${baseUrl}/recept/sitemap.xml`,
      `${baseUrl}/vin-tv/sitemap.xml`,
      `${baseUrl}/vinatlas/sitemap.xml`,
      `${baseUrl}/dryckestips/sitemap.xml`,
    ],
  };
}
