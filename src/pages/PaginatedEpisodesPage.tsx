import React, { useState } from "react";
import { useQuery } from "react-query";
import { EpisodeDto, EpisodesResponse } from "../api/dtos";
import { fetchEpisodes } from "../api/api";
import { EpisodeBlock } from "../components/EpisodeBlock";
import styled from "styled-components";
import { Colors } from "../GlobalStyle";

export const PaginatedEpisodesPage = () => {
  const [page, setPage] = useState<number>(1);

  const { isLoading, isError, isIdle, isFetching, refetch, data, error } =
    useQuery<EpisodesResponse, Error>(["episodes", page], () =>
      fetchEpisodes(page)
    );

  const displayData = () => {
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
