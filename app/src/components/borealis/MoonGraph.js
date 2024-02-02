import Graph from "../Graph.js";
import { useEffect, useState } from "react";

export function MoonGraph({ title, latitude, longitude, color }) {
  
  const [moonData, setMoonData] = useState([]);

  const { REACT_APP_VISUAL_CROSSING_KEY } = process.env;

  useEffect(() => {
    const fetchData = async (latitude, longitude) => {
  
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C%20${longitude}?unitGroup=metric&elements=moonphase&include=days&key=${REACT_APP_VISUAL_CROSSING_KEY}&contentType=json`);
      const data = await response.json();
      let { days } = data;
      days = days.slice(0, 7);
      const  now = new Date(Date.now());
      const newMoonData = days.map(({ moonphase}, index) => {
        return (
          {
            name: index + now.getDate(),
            moonCover:moonphase
          }
        )
      }) 
      setMoonData((prev) => newMoonData)
    }
    fetchData(latitude, longitude);
  }, [])
  // TODO call below and parse data into same format as placeholderData
  
  
  const graphHeight = "100%";
  const graphWidth = "100%";
  const graphMargins = { top: 10, right: 10, left: -35, bottom: 0 };
  return (
    <Graph
      title={title}
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
