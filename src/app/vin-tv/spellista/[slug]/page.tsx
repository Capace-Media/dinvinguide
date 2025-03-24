import Loading from "@/app/loading";
import PlaylistTemplate from "@/components/Templates/PlaylistTemplate";
import SingleWineSchoolTemplate from "@/components/Templates/SingleWineSchoolTemplate";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
};

const Playlist = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return (
    <Suspense fallback={<Loading />}>
      <PlaylistTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default Playlist;
