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
    revalidateTag("ads", "max");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }

  if (path === "page") {
    revalidateTag("page", "max");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }

  if (path === "post") {
    revalidateTag("post", "max");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }
  if (path === "drink") {
    revalidateTag("drink", "max");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }
  if (path === "grape") {
    revalidateTag("grape", "max");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }

  if (path === "wine") {
    revalidateTag("wine", "max");
    return Response.json({ revalidated: true, now: Date.now(), status: 200 });
  }
  if (path === "supplier") {
    revalidateTag("supplier", "max");
    revalidatePath("/importorer");
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
