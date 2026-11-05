import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { isValidSecret } from "@/lib/auth/secret";
import { type DraftType, parseDraftParams } from "@/lib/draft/draft-params";

interface PagePathParams {
  parent1?: string;
  parent2?: string;
  parent3?: string;
  pid: string;
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  // Check the secret before anything else, so a caller without it learns
  // nothing about which parameters the route expects.
  if (!isValidSecret(searchParams.get("secret"), process.env.PREVIEW_TOKEN)) {
    return new Response("Invalid token", { status: 401 });
  }

  const params = parseDraftParams(Object.fromEntries(searchParams));
  if (!params.success) {
    return new Response("Invalid parameters", { status: 400 });
  }
  const { type, pid, author, parent1, parent2, parent3 } = params.data;

  (await draftMode()).enable();

  const basePathMapping: Record<DraftType, () => string | undefined> = {
    post: () => (author ? `/skribenter/${author}/${pid}` : undefined),
    recipe: () => `/recept/${pid}`,
    dryck: () => `/drycker/${pid}`,
    druva: () => `/druvor/${pid}`,
    dryckestips: () => `/dryckestips/${pid}`,
    page: () => getPagePath({ parent1, parent2, parent3, pid }),
  };

  const basePath = basePathMapping[type]();
  if (basePath) {
    redirect(basePath);
  }

  // A post preview without an author has no path to go to
  return new Response("Missing information for this type", {
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
