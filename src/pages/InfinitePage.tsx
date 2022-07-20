import React from "react";
import { useInfiniteQuery } from "react-query";
import { EpisodeDto, EpisodesResponse } from "../api/dtos";
import { fetchEpisodes } from "../api/api";
import styled from "styled-components";
import { EpisodeBlock } from "../components/EpisodeBlock";

export const InfinitePage = () => {
  const initialPageParam = 1;
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
  } = useInfiniteQuery<EpisodesResponse, Error>(
    "infinite-episodes",
    (data) => fetchEpisodes(data.pageParam || initialPageParam),
    {
      getNextPageParam: (lastPage) => {
        const nextUrl = lastPage.info.next;
        if (nextUrl === null) {
          return undefined;
        }
        return parseInt(
          nextUrl.replace("https://rickandmortyapi.com/api/episode?page=", "")
        );
      },
    }
  );

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
      <Refetch>{isFetching && <p>refetching...</p>}</Refetch>
    </>
  );
};

const PaginationButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 10rem;
  margin-bottom: 20rem;
`;

const Refetch = styled.div`
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
