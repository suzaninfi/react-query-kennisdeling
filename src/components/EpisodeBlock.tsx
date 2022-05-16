import React from "react";
import styled from "styled-components";
import { Colors } from "../GlobalStyle";

export interface EpisodeBlock {
  episodeId: number;
  name: string;
  airDate: string;
}

export const EpisodeBlock: React.FC<EpisodeBlock> = ({
  episodeId,
  name,
  airDate,
}) => {
  return (
    <Block>
      <h3>{name}</h3>
      <p>
        {episodeId} - {airDate}
      </p>
    </Block>
  );
};

const Block = styled.div`
  width: 15rem;
  height: 8rem;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${Colors.lightGray};
`;
