import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET_TOKEN) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Invalid token",
      status: 404,
    });
  }

  if (path === "/front-page") {
    revalidatePath("/");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
    status: 404,
  });
}
