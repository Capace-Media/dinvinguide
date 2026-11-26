import {
  getGuideList,
  type GuideListPage,
} from "@/lib/api/guides/get-guide-list";
import { parseGuideListParams } from "@/lib/api/guides/guide-list-params";

export type GuideListResponse = { guides: GuideListPage };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params = parseGuideListParams(Object.fromEntries(searchParams));
  if (!params) {
    return Response.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const guides = await getGuideList(params);
  if (!guides) {
    return Response.json({ error: "Failed to fetch" }, { status: 502 });
  }

  return Response.json({ guides } satisfies GuideListResponse);
}
