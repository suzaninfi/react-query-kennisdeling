import React from "react";
import { useInfiniteQuery } from "react-query";
import { EpisodeDto, EpisodeResponse } from "../api/dtos";
import { fetchEpisodes } from "../api/api";
import styled from "styled-components";
import { EpisodeBlock } from "../components/EpisodeBlock";

export const InfiniteEpisodesPage = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isIdle,
    isError,
    refetch,
  } = useInfiniteQuery<EpisodeResponse, Error>(
    "infinite-episodes",
    (data) => fetchEpisodes(data.pageParam),
    {
      getNextPageParam: (lastPage) => {
        const nextUrl = lastPage.info.next;
        if (nextUrl === null) {
          return undefined;
        }
        return nextUrl.replace(
          "https://rickandmortyapi.com/api/episode?page=",
          ""
        );
      },
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
        {data.pages.map((page) => {
          return page.results.map((result: EpisodeDto) => {
            return (
              <EpisodeBlock
                key={result.id}
                episodeId={result.id}
                name={result.name}
                airDate={result.air_date}
              />
            );
          });
        })}

        <PaginationButtons>
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            Load more
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

const PaginationButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 10rem;
`;
