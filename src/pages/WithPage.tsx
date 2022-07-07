import React from "react";
import { EpisodeDto, EpisodesResponse } from "../api/dtos";
import { EpisodeBlock } from "../components/EpisodeBlock";
import styled from "styled-components";
import { fetchEpisodes } from "../api/api";
import { useQuery } from "react-query";

export const WithPage = () => {
  const { data, isLoading, isIdle, error } = useQuery<EpisodesResponse, Error>(
    "episodes",
    () => fetchEpisodes(1)
  );

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isIdle) {
    return <></>;
  }

  return (
    <>
      <Episodes>
        {data.results.map((result: EpisodeDto) => (
          <EpisodeBlock
            key={result.id}
            episodeId={result.id}
            name={result.name}
            airDate={result.air_date}
          />
        ))}
      </Episodes>
    </>
  );
};

const Episodes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 51.2rem;
`;
