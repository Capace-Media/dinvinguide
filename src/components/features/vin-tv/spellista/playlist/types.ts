import type { PlaylistQuery } from "@/lib/wp/gql/graphql";

export type Playlist = NonNullable<PlaylistQuery["playlist"]>;
export type EpisodeEdge = NonNullable<Playlist["episodes"]>["edges"][number];
export type Episode = EpisodeEdge["node"];
export type VinTvOptions = NonNullable<
  NonNullable<PlaylistQuery["acfOptionsInstallningarTv"]>["tvOptionsPage"]
>;
