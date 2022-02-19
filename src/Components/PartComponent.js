import React from "react";
import styled from "styled-components";

const SyselComponent = ({ line, terminal, arrival, platform }) => {
  return (
    <Sysel>
      <h1 id="line">{line}</h1>
      <h1 id="terminal">{terminal}</h1>
      <h1 id="arrival">
        {arrival} - {platform}
      </h1>
    </Sysel>
  );
};

const Sysel = styled.div`
  color: red;
  display: flex;
  justify-content: space-between;
  border: 0.3rem solid black;
  padding: 4px;
  margin: 3px;
  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

export default SyselComponent;
