import React from "react";
import styled from "styled-components";
import { Nav } from "./Nav";

export const Page: React.FC = ({ children }) => {
  return (
    <PageStyled>
      <Title>React Query</Title>
      <SubTitle>Kennisdeling</SubTitle>
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

const Title = styled.h1`
  color: #f67905;
`;

const SubTitle = styled.h2`
  color: white;
`;
