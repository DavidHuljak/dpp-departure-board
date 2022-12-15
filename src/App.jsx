import React, { useState, useEffect } from "react";
import styled from "styled-components";

//Adjust this number to match your stop. CisIds can be found here: https://data.pid.cz/stops/json/stops.json
const cisIds = "58791"; // => I. P. Pavlova

function App() {
  const [result, setResult] = useState([]);
  const [stop, setStop] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      let response = await fetch(
        `https://dpp-departure-board-backend.onrender.com/?cisIds=${cisIds}&limit=5`
      );
      response = await response.json();
      setResult(response[0]);
      setStop(response[1].features[0].properties.stop_name);
      console.log(response[0]);
      console.log("Data updated.");
      setLoading(false);
    }
    fetchAPI();
    setInterval(fetchAPI, 30000);
  }, []);
  if (loading === false) {
    document.title = stop;
  } else {
    document.title = "Načítání";
  }

  return (
    <MainStyle>
      {loading === true ? (
        <div>
          <h2>Načítání</h2>
          <table>
            <tbody>
              <tr>
                <td className="head">Linka</td>
                <td className="head">Směr</td>
                <td className="head">Odjezd</td>
                <td className="head">Nástupiště</td>
              </tr>

              <tr>
                <td id="line">Načítání</td>
                <td id="terminal">Načítání</td>
                <td id="departure">Načítání</td>
                <td id="platform">Načítání</td>
              </tr>
            </tbody>
          </table>
          <footer>
            Zdroj dat:{" "}
            <a
              href="https://golemioapi.docs.apiary.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Golemio API
            </a>
          </footer>
        </div>
      ) : (
        <div>
          <h2>{stop}</h2>
          <table>
            <tbody>
              <tr>
                <td className="head">Linka</td>
                <td className="head">Směr</td>
                <td className="head">Odjezd</td>
                <td className="head">Nástupiště</td>
              </tr>

              {result.map((data) => {
                let date = new Date();
                let departure = new Date(
                  new Date(data.departure_timestamp.predicted) - date
                );
                return (
                  <tr key={data.trip.id}>
                    <td id="line">{data.route.short_name}</td>
                    <td id="terminal">{data.trip.headsign}</td>
                    <td id="departure">
                      {new Date(data.departure_timestamp.predicted) < date
                        ? "< 1 min"
                        : departure <= 60000
                        ? "< 1 min"
                        : departure.toISOString().slice(11, 13) === "00"
                        ? parseInt(departure.toISOString().slice(14, 16), 10) +
                          " min"
                        : parseInt(departure.toISOString().slice(11, 13), 10) +
                          " hod " +
                          parseInt(departure.toISOString().slice(14, 16), 10) +
                          " min"}
                    </td>
                    <td id="platform">{data.stop.platform_code}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <footer>
            Zdroj dat:{" "}
            <a
              href="https://golemioapi.docs.apiary.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Golemio API
            </a>
          </footer>
        </div>
      )}
    </MainStyle>
  );
}

const MainStyle = styled.div`
  font-size: 2.5rem;
  color: red;
  h2 {
    text-align: center;
    font-size: 3rem;
  }
  td,
  tr {
    color: red;
    margin: 3px;
  }
  table {
    width: 60%;
    margin: 0 auto;
  }
  .head {
    font-weight: bold;
  }
  footer {
    font-size: 2rem;
    text-align: center;
    margin: 2rem;
    a {
      color: inherit;
    }
  }
  @media (max-width: 1200px) {
    font-size: 2rem;
    h2 {
      font-size: 2.5rem;
    }
    footer {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 950px) {
    font-size: 1.5rem;
    h2 {
      font-size: 2rem;
    }
    footer {
      font-size: 1rem;
    }
  }

  @media (max-width: 700px) {
    font-size: 1rem;
    h2 {
      font-size: 1.5rem;
    }
    footer {
      font-size: 0.7rem;
    }
  }
`;

export default App;
