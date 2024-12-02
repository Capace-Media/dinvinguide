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
