import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Barlow', sans-serif;
    font-family: 'Roboto Condensed', sans-serif;  
    background: #303030;
  }

  #line {
    min-width: 10%;
    margin-left: 5px;
  }
  #terminal {
    min-width: 35%;
  }
  #arrival {
    min-width: 15%;
  }
  #platform {
    min-width: 10%;
  }
`;

export default GlobalStyle;
