import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import styled from "styled-components";

export const Nav: React.FC = () => {
  return (
    <Navigation>
      <Link to="/without">Without</Link>
      <Link to="/with">With</Link>
      <Link to="/paginated">Paginated</Link>
      <Link to="/infinite">Infinite</Link>
    </Navigation>
  );
};

const Link: React.FC<{ to: string; $fontSize?: string }> = ({
  to,
  children,
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <LinkStyled to={to} $isActive={!!match}>
      {children}
    </LinkStyled>
  );
};

const Navigation = styled.nav`
  flex-direction: row;
  padding-top: 0.5rem;
  padding-bottom: 0.7rem;
  margin: 1rem;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
`;

const LinkStyled = styled(NavLink)<{ $isActive: boolean }>`
  padding: 0.6rem;
  font-size: 1.3rem;
  text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};
`;
