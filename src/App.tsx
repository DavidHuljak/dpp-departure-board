import { useEffect, useState } from "react";

interface DataInterface {
  route: {
    short_name: string;
  };
  trip: {
    headsign: string;
    id: string;
  };
  departure_timestamp: {
    predicted: string;
  };
  stop: {
    platform_code: string;
  };
}

//Adjust this number to match your stop. CisIds can be found here: https://data.pid.cz/stops/json/stops.json
const cisIds = "58791"; // => I. P. Pavlova

function App() {
  const [result, setResult] = useState([]);
  const [stop, setStop] = useState("");
  const [loading, setLoading] = useState(true);

  const formattedTime = (t: string) => {
    const now = Date.now();
    const then = new Date(t).getTime();
    const diffInMs = Math.abs(now - then);
    const diffInMin = Math.floor(diffInMs / (1000 * 60));

    return diffInMin < 1 ? "< 1 min" : `${diffInMin} min`;
  };

  useEffect(() => {
    async function fetchAPI(): Promise<void> {
      try {
        const response = await fetch(
          `https://dpp-departure-board-backend.vercel.app/?cisIds=${cisIds}&limit=5`
        );
        const data = await response.json();

        setResult(data[0]);
        setStop(data[1].features[0].properties.stop_name);
        console.log(data[0]);
        console.log("Data updated.");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
    <div className="wrapper">
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

              {result.map((data: DataInterface) => {
                return (
                  <tr key={data.trip.id}>
                    <td id="line">{data.route.short_name}</td>
                    <td id="terminal">{data.trip.headsign}</td>
                    <td id="departure">
                      {formattedTime(data.departure_timestamp.predicted)}
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
    </div>
  );
}

export default App;
