import Graph from "../Graph.js";
import { useEffect, useState } from "react";

export function MoonGraph({ latitude, longitude, color }) {
  
  const [moonData, setMoonData] = useState([]);

  useEffect(() => {
    const fetchData = async (latitude, longitude) => {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C%20${longitude}?unitGroup=metric&elements=moonphase&include=days&key=6CD6FEE4QN2BL6YV8YNZG5V4S&contentType=json`);
      const data = await response.json();
      let { days } = data;
      days = days.slice(0, 7);
      const newMoonData = days.map(({ moonphase}, index) => {
        return (
          {
            name: index,
            moonCover:moonphase
          }
        )
      }) 
      setMoonData((prev) => setMoonData(newMoonData))
    }
    fetchData(latitude, longitude);
  }, [])
  // TODO call below and parse data into same format as placeholderData
  
  
  const graphHeight = "100%";
  const graphWidth = "100%";
  const graphMargins = { top: 20, right: 30, left: 35, bottom: 0 };
  return (
    <Graph
      graphHeight={graphHeight}
      graphWidth={graphWidth}
      graphMargins={graphMargins}
      yLabel={"moon cycle "}
      data={moonData}
      dataName="moonCover"
      color={color}
    />
  );
}
