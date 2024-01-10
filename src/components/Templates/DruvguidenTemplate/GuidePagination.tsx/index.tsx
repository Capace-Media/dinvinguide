import { getGapesByType } from "@/lib/queries/getGapesByType";

type DataArgs = {
  after?: string;
  before?: string;
  id?: string | null;
  search?: string;
  first?: number;
  last?: number | null;
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};
async function getGrapes(args: DataArgs) {
  const { after, before, id, search = "", first, last } = args;
  const data = await getGapesByType(id, after, before, first, last, search);

  return data;
}

interface GuidePaginationProps {}

const GuidePagination = async ({ params, searchParams }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 16;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);

  const promise = await getGrapes({
    after: searchParams?.nextCursor,
    before: searchParams?.previousCursor,
    id: "bla-druvsorter",
    search: "",
    first: startFirst,
    last: endLast,
  });

  return (
    <div className="">
      <h2 className="">Hello GuidePagination</h2>
    </div>
  );
};

export default GuidePagination;
