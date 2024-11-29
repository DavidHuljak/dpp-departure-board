import { useEffect, useState } from "react";
import axios from "axios";

interface IDepartureData {
  route: { short_name: string };
  trip: {
    headsign: string;
    is_air_conditioned: boolean;
    is_wheelchair_accessible: boolean;
  };
  arrival_timestamp: { predicted: string };
  departure_timestamp: { predicted: string; minutes: string };
  stop: { platform_code: string };
}

const apiEndpoint = "https://api.huljak.cz/";

const App = () => {
  const [departures, setDepartures] = useState<IDepartureData[]>([]);
  const [stop, setStop] = useState<string>("");
  const cisIds = "58791";

  useEffect(() => {
    const refresh = () => {
      axios
        .get(apiEndpoint + "pid/departures?cisIds=" + cisIds + "&limit=5")
        .then((response) => {
          setDepartures(response.data.departures);
          setStop(response.data.stops[0].stop_name);
          document.title = response.data.stops[0].stop_name;
        });
    };
    refresh();
    setInterval(refresh, 30000);
  }, []);

  if (!departures.length)
    return (
      <div className="departure-component">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="departure-component">
      <h1 id="stop">{stop}</h1>
      <div className="head">
        <h1 id="line">Linka</h1>
        <h1 id="terminal">Směr</h1>
        <h1 id="arrival">Příjezd</h1>
        <h1 id="platform">Nástupiště</h1>
        <h1 id="parameters">Poznámky</h1>
      </div>

      {departures.map((data, index) => (
        <div className="departure-card" key={index}>
          <h1 id="line">{data.route.short_name}</h1>
          <h1 id="terminal">{data.trip.headsign}</h1>
          <h1 id="arrival">{data.departure_timestamp.minutes} min</h1>
          <h1 id="platform">{data.stop.platform_code}</h1>
          <h1 id="parameters">
            {data.trip.is_air_conditioned ? "❄️" : ""}
            {data.trip.is_wheelchair_accessible ? "♿" : ""}
          </h1>
        </div>
      ))}
      <footer>
        {" "}
        <a
          href="https://golemioapi.docs.apiary.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zdroj dat: Golemio
        </a>
      </footer>
    </div>
  );
};

export default App;
