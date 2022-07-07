import React from "react";
import { EpisodeDto, EpisodesResponse } from "../api/dtos";
import { EpisodeBlock } from "../components/EpisodeBlock";
import styled from "styled-components";
import { fetchEpisodes } from "../api/api";
import { useQuery } from "react-query";

export const WithPage = () => {
  const { data, isLoading, isError, isIdle, error } = useQuery<
    EpisodesResponse,
    Error
  >("episodes", () => fetchEpisodes(1), {
    // default: refetch every time window gets focussed
    refetchOnWindowFocus: true,
    retry: 3,
    staleTime: 1000 * 10,
    cacheTime: 1000 * 5,
    keepPreviousData: true,
  });

  // only the case when there is no cached data and the query is currently fetching
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>An error occurred: {error.message}</span>;
  }
  // should not occur, because enabled is not set to false in the options
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
