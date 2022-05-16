import React from "react";
import styled from "styled-components";
import { Nav } from "./Nav";

export const Page: React.FC = ({ children }) => {
  return (
    <PageStyled>
      <h1>React Query Project</h1>
      <Nav />
      {children}
    </PageStyled>
  );
};

const PageStyled = styled.div`
  padding: 2rem;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
