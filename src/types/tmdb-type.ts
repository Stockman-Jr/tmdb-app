export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  vote_average: number;
  release_date?: string | undefined;
  first_air_date?: string | undefined;
  poster_path: string | null;
  backdrop_path: string | null;
}