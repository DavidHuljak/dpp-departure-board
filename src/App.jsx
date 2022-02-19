import React, { useState, useEffect } from "react";
import PartComponent from "./Components/PartComponent";
import styled from "styled-components";

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmlkLmh1bGpha0BnbWFpbC5jb20iLCJpZCI6MzU0LCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJpYXQiOjE2MDcyMDU3MjMsImV4cCI6MTE2MDcyMDU3MjMsImlzcyI6ImdvbGVtaW8iLCJqdGkiOiIxM2NhNWJjOS1hMjIxLTQ2NTMtYTY0NC1iZTVlNTZiMGNiY2YifQ.sKbug2Nt_6Pm4zcU1jyU_1wCPNK6jSkVq1FSk5hAM5E";
//Adjust this number to match your stop. CisIds can be found here: https://data.pid.cz/stops/json/stops.json
const cisIds = "58791"; // => I. P. Pavlova

function App() {
  const [result, setResult] = useState([]);
  const [stop, setStop] = useState("");

  useEffect(() => {
    async function fetchGolemio() {
      let response = await fetch(
        `https://api.golemio.cz/v2/departureboards/?cisIds=${cisIds}&limit=5`,
        {
          method: "GET",
          headers: {
            "x-access-token": apiKey,
          },
        }
      );
      response = await response.json();
      setResult(response);
      setStop(response[0].stop.name);
      console.log(response);
      console.log("reloaded");
    }
    fetchGolemio();
    setInterval(fetchGolemio, 30000);
  }, []);
  document.title = stop;
  return (
    <MainStyle>
      <h2>{stop}</h2>
      <div className="head">
        <h1 id="line">Linka</h1>
        <h1 id="terminal">Směr</h1>
        <h1 id="arrival">Příjezd</h1>
        <h1 id="platform">Nástupiště</h1>
      </div>

      {result.map((data) => {
        let date = new Date();
        let arrival = new Date(
          new Date(data.arrival_timestamp.predicted) - date
        );
        return (
          <PartComponent
            key={data.trip.id}
            line={data.route.short_name}
            terminal={"➜ " + data.trip.headsign}
            platform={data.stop.platform_code}
            arrival={
              new Date(data.arrival_timestamp.predicted) < date
                ? "< 1 min"
                : arrival <= 60000
                ? "< 1 min"
                : arrival.toISOString().slice(11, 13) === "00"
                ? parseInt(arrival.toISOString().slice(14, 16), 10) + " min"
                : parseInt(arrival.toISOString().slice(11, 13), 10) +
                  " hod " +
                  parseInt(arrival.toISOString().slice(14, 16), 10) +
                  " min"
            }
          />
        );
      })}
    </MainStyle>
  );
}

const MainStyle = styled.div`
  color: red;
  h2 {
    text-align: center;
    font-size: 3rem;
  }
  .head {
    color: red;
    display: flex;
    justify-content: space-between;
    margin: 3px;
    @media (max-width: 600px) {
      font-size: 0.6rem;
    }
  }
`;

export default App;
