import { getDrinks } from "@/lib/queries/getDrinks";

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

  const data = await getDrinks(after, before, first, last);

  const { edges, pageInfo } = data;

  return (
    <div className="">
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
