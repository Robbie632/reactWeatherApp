import Graph from "../Graph.js";

export function CloudCover({ latitude, longitude, title, color }) {
  // fetch this url with fetch() https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily&hourly=cloud_cover
  // loop through times and parse iso8601 dates
  // somehow get average cloud cover for each day
  // convert days into Mon, Tues ...etc for x axis


  const placeholderData = [
    {
      name: 1,
      cloudCover: 20,
    },
    {
      name: 2,
      cloudCover: 30,
    },
    {
      name: 3, cloudCover: 40
    },
    {
      name: 4, cloudCover: 50
    }
  ];
  const graphHeight = "100%";
  const graphWidth = "100%";
  const graphMargins = { top: 20, right: 30, left: 35, bottom: 0 };
  return (
    <Graph
      graphHeight={graphHeight}
      graphWidth={graphWidth}
      graphMargins={graphMargins}
      yLabel={"cloud cover %"}
      data={placeholderData}
      dataName="cloudCover"
      color={color}
  />    
  )

}
