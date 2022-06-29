interface BaseResponse<T> {
  info: {
    count: number | null;
    pages: number;
    next: string;
    prev: number | null;
  };
  results: T[];
}

export interface EpisodeDto {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export type EpisodesResponse = BaseResponse<EpisodeDto>;
