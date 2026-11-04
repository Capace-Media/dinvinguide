import { bearerToken, isValidSecret } from "@/lib/auth/secret";
import { refreshSearchSnapshot } from "@/lib/search/search-service";

// Called by the daily Vercel cron (`vercel.json`), which sends `CRON_SECRET`
// as a bearer token. Without a stored snapshot this walks all of WordPress.
export const maxDuration = 300;

export async function GET(request: Request) {
  const token = bearerToken(request.headers.get("authorization"));
  if (!isValidSecret(token, process.env.CRON_SECRET)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return Response.json(await refreshSearchSnapshot());
  } catch (error) {
    console.error("Search snapshot refresh failed:", error);
    return Response.json({ error: "Refresh failed" }, { status: 500 });
  }
}
