import PostTemplate from "@/components/Templates/PostTemplate";
import { getWineAtlasPage } from "@/lib/queries/getWineAtlasPage";
import MorePosts from "./MorePost";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
};

const SingleWineAtlas = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getWineAtlasPage(`/vinguide/vinatlas/${params.slug}`);
  return (
    <article className="layout bg-white">
      <PostTemplate post={data} />

      <div>
        <MorePosts
          params={params}
          searchParams={searchParams}
          pageId={data?.id}
          title={data?.title}
        />
      </div>
    </article>
  );
};

export default SingleWineAtlas;
