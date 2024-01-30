import Loading from "@/app/loading";
import PlaylistTemplate from "@/components/Templates/PlaylistTemplate";
import SingleWineSchoolTemplate from "@/components/Templates/SingleWineSchoolTemplate";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const Playlist = ({ params, searchParams }: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <PlaylistTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default Playlist;
