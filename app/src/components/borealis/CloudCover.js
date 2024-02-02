import Graph from "../Graph.js";
import React, { useEffect, useState } from "react";
const { groupData, aggregatedata } = require("../../utils/weather");

export function CloudCover({ title, latitude, longitude, color }) {
  const [cloudData, setCloudData] = useState([]);

  useEffect(() => {
    const fetchData = async (latitude, longitude) => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily&hourly=cloud_cover`
      );
      const data = await response.json();
      const parsedData = [];
      for (let i = 0; i < data.hourly.time.length; i++) {
        parsedData.push({
          date: data.hourly.time[i],
          cloudCover: data.hourly.cloud_cover[i],
        });
      }
      const grouped = groupData(parsedData);
      const aggregatedData = aggregatedata(grouped);

      const renamedData = aggregatedData.map(({ dayMonthYear, average }) => {
        const dataForPlot = {
          name: dayMonthYear.split("-")[0],
          cloudCover: average,
        };
        return dataForPlot;
      });
      setCloudData((prev) => renamedData);
    };
    fetchData(latitude, longitude);
  }, []);

  const graphHeight = "100%";
  const graphWidth = "100%";
  const graphMargins = { top: 10, right: 10, left: -35, bottom: 0 };
  return (
    <Graph
      title={title}
      graphHeight={graphHeight}
      graphWidth={graphWidth}
      graphMargins={graphMargins}
      yLabel={"cloud cover %"}
      data={cloudData}
      dataName="cloudCover"
      color={color}
    />
  );
}
