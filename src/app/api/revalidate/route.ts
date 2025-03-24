import { revalidatePath, revalidateTag } from "next/cache";
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

  if (path === "ads") {
    revalidateTag("ads");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }

  if (path === "page") {
    revalidateTag("page");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }

  if (path === "post") {
    revalidateTag("post");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }
  if (path === "drink") {
    revalidateTag("drink");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }
  if (path === "grape") {
    revalidateTag("grape");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }

  if (path === "wine") {
    revalidateTag("wine");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }
  if (path === "supplier") {
    revalidateTag("supplier");
    revalidatePath("/producenter");
    return Response.json({
      revalidated: true,
      now: Date.now(),
      queryKey: "suppliers",
      status: 200,
    });
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
