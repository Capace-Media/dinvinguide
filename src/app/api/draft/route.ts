// // route handler with secret and slug
// import { draftMode } from "next/headers";
// import { redirect } from "next/navigation";

// export async function GET(request: Request) {
//   // Parse query string parameters
//   const { searchParams } = new URL(request.url);
//   const secret = searchParams.get("secret");
//   const slug = searchParams.get("slug");
//   const pid = searchParams.get("pid");
//   const type = searchParams.get("type");
//   const author = searchParams.get("author");
//   const parent1 = searchParams.get("parent1");
//   const parent2 = searchParams.get("parent2");
//   const parent3 = searchParams.get("parent3");

//   // Check the secret and next parameters
//   // This secret should only be known to this route handler and the CMS
//   if (secret !== process.env.PREVIEW_TOKEN) {
//     return new Response("Invalid token", { status: 401 });
//   }

//   // Enable Draft Mode by setting the cookie
//   draftMode().enable();

//   // Redirect to the path from the fetched post
//   // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
//   if (type === "post") {
//     redirect(`/skribenter/${author}/${pid}`);
//   }

//   if (type === "recipe") {
//     redirect(`/recept/${pid}`);
//   }

//   if (type === "dryck") {
//     redirect(`/drycker/${pid}`);
//   }

//   if (type === "druva") {
//     redirect(`/druvor/${pid}`);
//   }

//   if (type === "dryckestips") {
//     redirect(`/dryckestips/${pid}`);
//   }

//   if (type === "page") {
//     if (parent2 && parent2 === "vinatlas") {
//       if (parent3) {
//         redirect(`/vinatlas/${parent3}/${pid}`);
//       } else {
//         redirect(`/vinatlas/${pid}`);
//       }
//     }

//     if (parent1 && parent1 === "skolor") {
//       redirect(`/vinskolan/${pid}`);
//     }

//     if (!parent1) {
//       redirect(`/${pid}`);
//     }
//   }
// }
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

interface PagePathParams {
  parent1?: string | null;
  parent2?: string | null;
  parent3?: string | null;
  pid: string;
}

export async function GET(request: Request): Promise<Response | void> {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const type = searchParams.get("type");
  const pid = searchParams.get("pid");
  const author = searchParams.get("author");
  const parent1 = searchParams.get("parent1");
  const parent2 = searchParams.get("parent2");
  const parent3 = searchParams.get("parent3");

  // Ensure required parameters are present
  if (!pid || !type) {
    return new Response("Missing required parameters", { status: 400 });
  }

  if (secret !== process.env.PREVIEW_TOKEN) {
    return new Response("Invalid token", { status: 401 });
  }

  draftMode().enable();

  const basePathMapping: { [key: string]: () => string | undefined } = {
    post: () => (author ? `/skribenter/${author}/${pid}` : undefined),
    recipe: () => `/recept/${pid}`,
    dryck: () => `/drycker/${pid}`,
    druva: () => `/druvor/${pid}`,
    dryckestips: () => `/dryckestips/${pid}`,
    page: () => getPagePath({ parent1, parent2, parent3, pid }),
  };

  const basePath = basePathMapping[type]?.();
  if (basePath) {
    redirect(basePath);
  }

  // Handle unsupported types or missing basePath with an appropriate response
  return new Response("Unsupported type or missing information", {
    status: 400,
  });
}

function getPagePath({
  parent1,
  parent2,
  parent3,
  pid,
}: PagePathParams): string | undefined {
  if (parent1 === "skolor") {
    return `/vinskolan/${pid}`;
  }

  if (parent2 === "vinatlas") {
    return parent3 ? `/vinatlas/${parent3}/${pid}` : `/vinatlas/${pid}`;
  }

  return `/${pid}`;
}
