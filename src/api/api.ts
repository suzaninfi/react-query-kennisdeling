import { EpisodeResponse } from "./dtos";

const url = "https://rickandmortyapi.com/api";

export const fetchEpisodes = async (page = 0): Promise<EpisodeResponse> => {
  const response = await fetch(url + "/episode?page=" + page);
  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  return await response.json();
};
