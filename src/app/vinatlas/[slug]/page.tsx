import PostTemplate from "@/components/Templates/PostTemplate";
import { getWineAtlasPage } from "@/lib/queries/getWineAtlasPage";
import MorePosts from "./MorePost";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const SingleWineAtlas = async ({ params, searchParams }: Props) => {
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
