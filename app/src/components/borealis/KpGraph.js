import Graph from "../Graph.js";
import { useState, useEffect } from "react";

export function KpGraph({ latitude, longitude, title, color }) {
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
  const graphMargins = { top: 20, right: 30, left: 35, bottom: 0 };
  return (
    <Graph
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
