import PostTemplate from "@/components/Templates/PostTemplate";
import { getWineAtlasPage } from "@/lib/queries/getWineAtlasPage";

type SingleWineAtlasIdProps = {
  params: { slug: string; id: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const SingleWineAtlasId = async ({
  params,
  searchParams,
}: SingleWineAtlasIdProps) => {
  const data = await getWineAtlasPage(
    `/vinguide/vinatlas/${params.slug}/${params.id}`
  );

  return (
    <article className="layout bg-white">
      <PostTemplate post={data} />
    </article>
  );
};

export default SingleWineAtlasId;
