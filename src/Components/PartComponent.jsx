import React from "react";
import styled from "styled-components";

const PartComponent = ({ line, terminal, arrival, platform }) => {
  return (
    <Part>
      <h1 id="line">{line}</h1>
      <h1 id="terminal">{terminal}</h1>
      <h1 id="arrival">{arrival}</h1>
      <h1 id="platform">{platform}</h1>
    </Part>
  );
};

const Part = styled.div`
  color: red;
  display: flex;
  justify-content: space-between;
  border: 0.3rem solid black;
  padding: 4px;
  margin: 3px;
  text-align: left;
  @media (max-width: 600px) {
    font-size: 0.55rem;
  }
`;

export default PartComponent;
