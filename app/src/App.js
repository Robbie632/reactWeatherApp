import './App.css';
import WeatherDisplay from "./components/WeatherDisplay";
import Planets from './components/Planets.js';
import { Borealis } from './components/borealis/Borealis.js';
import config from './config.js';
import React, { useState, useEffect } from "react";

const dashboards = ["planets", "weather", "borealis"]

function App() {

  const [displayIndex, setDisplayIndex] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.sensorServerURL);
        const data = await response.json();
        const inRange = data.inRange;
        if (inRange === 1) { 
          setDisplayIndex((prev) => prev === dashboards.length-1 ? 0 : prev+1);
        }        
      } catch(e) {
        console.log(`error getting sensor data: ${e}`);
      }
    }
    setInterval(() => fetchData(), config.fetchSensorInterval);
  }, [])
  
  return (
    <div className="App">
      {
          dashboards[displayIndex] === "weather" ? <WeatherDisplay /> :
          dashboards[displayIndex] === "planets" ? <Planets /> :
          dashboards[displayIndex] === "borealis" ? <Borealis /> :
        "other"}
    </div>
  );
}

export default App;
