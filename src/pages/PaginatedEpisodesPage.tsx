import React, { useState } from "react";
import { useQuery } from "react-query";
import { EpisodeDto, EpisodeResponse } from "../api/dtos";
import { fetchEpisodes } from "../api/api";
import { EpisodeBlock } from "../components/EpisodeBlock";
import styled from "styled-components";
import { Colors } from "../GlobalStyle";

export const PaginatedEpisodesPage = () => {
  const [page, setPage] = useState<number>(1);

  const { isLoading, isIdle, isError, isFetching, refetch, data, error } =
    useQuery<EpisodeResponse, Error>(
      ["episodes", page],
      () => fetchEpisodes(page),
      {
        refetchOnWindowFocus: true,
        enabled: true,
        retry: 3,
        keepPreviousData: true,
      }
    );

  const displayData = () => {
    if (isLoading || isIdle) {
      return <span>Loading...</span>;
    }
    if (isError) {
      return <span>An error occurred: {error.message}</span>;
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

        <PaginationButtons>
          <button
            disabled={page === 0}
            onClick={() => setPage((prevPage) => prevPage - 1)}
          >
            Prev
          </button>
          <button
            disabled={page === data.info.pages}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Next
          </button>
        </PaginationButtons>
      </>
    );
  };

  return (
    <>
      {isFetching && <div>...fetching!</div>}
      <button onClick={() => refetch()}>Fetch</button>
      {displayData()}
    </>
  );
};

const Episodes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 51.2rem;
  //border: 1px solid ${Colors.lightGray};
`;

const PaginationButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 10rem;
`;
