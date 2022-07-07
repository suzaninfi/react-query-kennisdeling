import React, { useState } from "react";
import { useQuery } from "react-query";
import { EpisodeDto, EpisodesResponse } from "../api/dtos";
import { fetchEpisodes } from "../api/api";
import { EpisodeBlock } from "../components/EpisodeBlock";
import styled from "styled-components";

export const PaginatedPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { isLoading, isError, isIdle, data, error, isFetching } = useQuery<
    EpisodesResponse,
    Error
  >(["episodes", pageNumber], () => fetchEpisodes(pageNumber), {
    refetchOnWindowFocus: true,
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
      <PaginationButtons>
        <button
          disabled={pageNumber === 0}
          onClick={() => setPageNumber((prevPage) => prevPage - 1)}
        >
          Prev
        </button>
        <button
          disabled={pageNumber === data.info.pages}
          onClick={() => setPageNumber((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </PaginationButtons>
      <Refetch>{isFetching && <p>refetching...</p>}</Refetch>

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

const PaginationButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 10rem;
`;

const Refetch = styled.div`
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
