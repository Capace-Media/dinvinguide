import { getDrinks } from "@/lib/api/drinks/get-drinks";

import WineExplorerController from "./WineExplorerController";
import WineExplorerList from "./WineExplorerList";

const WineExplorer = async ({
  searchParams,
}: {
  [key: string]: string | string[] | any | undefined;
}) => {
  const postsPerPage: number = 16;

  const first: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const last: number = parseInt(searchParams?.last);
  const after = searchParams?.after;
  const before = searchParams?.before;

  const data = await getDrinks({ after, before, first, last });
  const edges = data?.edges ?? [];
  const pageInfo = data?.pageInfo;

  return (
    <div className="dl-layout relative z-10">
      <h2 className="pb-10 md:pb-20 text-center">
        Utforska de viner som redaktionen har testat
      </h2>
      <WineExplorerList data={edges} />

      <WineExplorerController
        pageInfo={pageInfo}
        after={after}
        before={before}
      />
    </div>
  );
};

export default WineExplorer;
