import React, { useEffect, useState } from "react";
import { EpisodeDto, EpisodeResponse } from "../api/dtos";
import { EpisodeBlock } from "../components/EpisodeBlock";
import styled from "styled-components";
import { Colors } from "../GlobalStyle";
import { fetchEpisodes } from "../api/api";

export const OldFashionedEpisodesPage = () => {
  const [page, setPage] = useState<number>(1);
  const [episodes, setEpisodes] = useState<EpisodeResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    fetchEpisodes(page)
      .then((episodes) => {
        setEpisodes(episodes);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>An error occurred: {error.message}</span>;
  }
  if (!episodes) {
    return <span>Could not find episodes...</span>;
  }
  return (
    <>
      <Episodes>
        {episodes.results.map((result: EpisodeDto) => (
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
          disabled={page === episodes.info.pages}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </PaginationButtons>
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
