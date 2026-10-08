import PostTemplate from "@/components/Templates/PostTemplate";
import { getWineAtlasPage } from "@/lib/api/pages/get-pages";

type SingleWineAtlasIdProps = {
  params: Promise<{ slug: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
};

const SingleWineAtlasId = async (props: SingleWineAtlasIdProps) => {
  const params = await props.params;
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
