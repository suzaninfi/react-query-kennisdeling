import { createGlobalStyle } from "styled-components";

export const Colors = {
  darkGrey: "#2e3232",
  mediumGrey: "#454B4B",
  lightGray: "#535959",
  brightGrey: "#818888",
  boxShadowGrey: "#383d3c",
} as const;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
    overflow-y: scroll;
    font-size: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    background-color: ${Colors.darkGrey};
    color: white;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  #root {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    color: black;
    padding: 2px;
    font-family: inherit;
    font-size: inherit;
  }
`;
