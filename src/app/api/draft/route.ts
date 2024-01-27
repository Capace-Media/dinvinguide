// route handler with secret and slug
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const pid = searchParams.get("pid");
  const type = searchParams.get("type");

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.PREVIEW_TOKEN || !slug) {
    return new Response("Invalid token", { status: 401 });
  }

  return new Response(`type: ${type}, slug: ${slug}, pid: ${pid}`, {
    status: 200,
  });
  // Enable Draft Mode by setting the cookie
  //draftMode().enable();

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  //redirect(post.slug);
}
