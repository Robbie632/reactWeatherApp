import "./App.css";
import WeatherDisplay from "./components/WeatherDisplay";
import Planets from "./components/Planets.js";
import { Borealis } from "./components/borealis/Borealis.js";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const dashboards = ["weather", "planets", "borealis"];

function App() {
  const [displayIndex, setDisplayIndex] = useState(2);
  const arrowStyle = {
    flex: 0.05,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3em",
    color:"white"
  };
  const onClickRight = () => {
    setDisplayIndex((prev) => prev === dashboards.length-1 ? 0 : prev+1)

  }
  const onClickLeft = () => {
    setDisplayIndex((prev) => prev === 0 ? dashboards.length-1 : prev-1)

  }
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <div style={arrowStyle} onClick={onClickLeft}>
        <span>&#60;</span>
      </div>
      <div style={{ flex: 1 }} className="App">
        {dashboards[displayIndex] === "weather" ? (
          <WeatherDisplay />
        ) : dashboards[displayIndex] === "planets" ? (
          <Planets />
        ) : dashboards[displayIndex] === "borealis" ? (
          <Borealis />
        ) : (
          "other"
        )}
      </div>
      <div style={arrowStyle} onClick={onClickRight}>
        <span>&#62;</span>
      </div>
    </div>
  );
}

export default App;
