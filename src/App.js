import React, { useState, useEffect } from "react";
import PartComponent from "./Components/PartComponent";
import styled from "styled-components";

function App() {
  let [result, setResult] = useState([]);

  useEffect(() => {
    async function fetchGolemio() {
      let response = await fetch(
        `https://api.golemio.cz/v2/departureboards/?cisIds=58791&limit=5`,
        {
          method: "GET",
          headers: {
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmlkLmh1bGpha0BnbWFpbC5jb20iLCJpZCI6MzU0LCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJpYXQiOjE2MDcyMDU3MjMsImV4cCI6MTE2MDcyMDU3MjMsImlzcyI6ImdvbGVtaW8iLCJqdGkiOiIxM2NhNWJjOS1hMjIxLTQ2NTMtYTY0NC1iZTVlNTZiMGNiY2YifQ.sKbug2Nt_6Pm4zcU1jyU_1wCPNK6jSkVq1FSk5hAM5E",
          },
        }
      );
      response = await response.json();
      setResult(response);
      console.log(response);
      console.log("reloaded");
    }
    fetchGolemio();
    setInterval(fetchGolemio, 30000);
  }, []);

  return (
    <MainStyle>
      <h2>I. P. Pavlova</h2>
      {result.map((data) => {
        let arrival = new Date(
          new Date(data.arrival_timestamp.predicted) - new Date()
        ).getMinutes();
        return (
          <PartComponent
            key={data.trip.id}
            line={data.route.short_name}
            terminal={"➜ " + data.trip.headsign}
            platform={data.stop.platform_code}
            arrival={
              new Date(data.arrival_timestamp.predicted) < new Date()
                ? "> 1 min"
                : arrival <= 0
                ? "> 1 min"
                : arrival + " min"
            }
          />
        );
      })}
    </MainStyle>
  );
}

const MainStyle = styled.div`
  h2 {
    text-align: center;
    color: red;
    font-size: 3rem;
  }
`;

export default App;
