import Graph from "../Graph.js";
import { useState, useEffect } from "react";

export function KpGraph({ title, latitude, longitude, color }) {
  const [kpData, setKpData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://services.swpc.noaa.gov/text/daily-geomagnetic-indices.txt"
      );
      const data = await response.text();
      const lines = data.split("\n");
      const tail = lines.slice(lines.length - 8, lines.length);
      const kps = tail.map((v) => {
        const splitted = v.split(/[\s]+/);
        const kps = splitted.slice(splitted.length - 8, splitted.length);
        const day = splitted[2];
        const kpsSum = kps.reduce((x, y) => x + Number(y), 0);
        const averageKp = kpsSum / kps.length;
        return { name: day, kp: averageKp };
      });
      setKpData((prev) => kps)
    };
    fetchData();
  }, []);

  const graphHeight = "80%";
  const graphWidth = "100%";
  const graphMargins = { top: 10, right: 10, left: -30, bottom: 0 };
  return (
    <Graph
      title={title}
      graphHeight={graphHeight}
      graphWidth={graphWidth}
      graphMargins={graphMargins}
      yLabel={"kp"}
      data={kpData}
      dataName="kp"
      color={color}
    />
  );
}
