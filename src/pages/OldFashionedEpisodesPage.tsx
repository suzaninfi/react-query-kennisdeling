import React, { useState } from "react";
import { EpisodeDto } from "../api/dtos";
import { EpisodeBlock } from "../components/EpisodeBlock";
import styled from "styled-components";
import { Colors } from "../GlobalStyle";

export const OldFashionedEpisodesPage = () => {
  const [page, setPage] = useState<number>(1);

  const episodesResponse = {
    info: {
      count: 0,
      pages: 4,
      next: 1,
      prev: null,
    },
    results: [],
  };

  return (
    <>
      <Episodes>
        {episodesResponse.results.map((result: EpisodeDto) => (
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
          disabled={page === episodesResponse.info.pages}
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
