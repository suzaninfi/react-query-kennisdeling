import { EpisodeResponse } from "./dtos";

const url = "https://rickandmortyapi.com/api";

export const fetchEpisodes = async (page = 0): Promise<EpisodeResponse> => {
  await sleep(2000);
  const response = await fetch(url + "/episode?page=" + page);

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  return await response.json();
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
