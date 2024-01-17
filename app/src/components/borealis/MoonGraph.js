import Graph from "../Graph.js";

export function MoonGraph({ latitude, longitude, title, color }) {
  const placeholderData = [
    {
      name: 1,
      moonCover: 0.2,
    },
    {
      name: 2,
      moonCover: 0.3,
    },
    {
      name: 3,
      moonCover: 0.4,
    },
    {
      name: 4,
      moonCover: 0.2,
    },
  ];
  const graphHeight = "100%";
  const graphWidth = "100%";
  const graphMargins = { top: 20, right: 30, left: 35, bottom: 0 };
  return (
    <Graph
      graphHeight={graphHeight}
      graphWidth={graphWidth}
      graphMargins={graphMargins}
      yLabel={"moon cycle "}
      data={placeholderData}
      dataName="moonCover"
      color={color}
    />
  );
}
