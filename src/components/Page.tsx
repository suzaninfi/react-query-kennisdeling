import React from "react";
import styled from "styled-components";
import { Nav } from "./Nav";
import { Link } from "react-router-dom";

export const Page: React.FC = ({ children }) => {
  return (
    <PageStyled>
      <Link to="/">
        <Title>React Query</Title>
      </Link>
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
