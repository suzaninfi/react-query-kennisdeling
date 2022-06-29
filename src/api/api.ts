import { EpisodesResponse } from "./dtos";

const url = "https://rickandmortyapi.com/api";

export const fetchEpisodes = async (page = 0): Promise<EpisodesResponse> => {
  await sleep(1000);
  const response = await fetch(url + "/episode?page=" + page);

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  return await response.json();
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
