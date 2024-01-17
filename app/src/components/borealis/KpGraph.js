import Graph from "../Graph.js";

export function KpGraph({ latitude, longitude, title, color }) {

  const placeholderData = [
    {
      name: 1,
      kp: 1,
    },
    {
      name: 2,
      kp: 2,
    },
    {
      name: 3, kp: 3
    },
    {
      name: 4, kp: 5
    },
    {
      name: 5, kp: 4
    }

  ];
  const graphHeight = "80%";
  const graphWidth = "100%";
  const graphMargins = { top: 20, right: 30, left: 35, bottom: 0 };
  return (
    <Graph
    graphHeight={graphHeight}
    graphWidth={graphWidth}
    graphMargins={graphMargins}
    yLabel={"kp"}
    data={placeholderData}
      dataName="kp"
      color={color}
  />    
  )

}
