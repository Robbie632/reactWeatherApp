import './App.css';
import WeatherDisplay from "./components/WeatherDisplay";
import Planets from './components/Planets.js';
import config from './config.js';
import React, { useState, useEffect } from "react";

const dashboards = ["planets", "weather"]

function App() {

  const [displayIndex, setDisplayIndex] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.sensorServerURL);
        const data = await response.json();
        const inRange = data.inRange;
        if (inRange === 1) { 
          setDisplayIndex((prev) => prev === dashboards.length-1 ? 0 : 1);
        }        
      } catch {
        console.log("error getting sensor data");
      }
    }
    setInterval(() => fetchData(), config.fetchSensorInterval);
  }, [])
  
  return (
    <div className="App">
      {
          dashboards[displayIndex] === "weather" ? <WeatherDisplay /> :
          dashboards[displayIndex] === "planets" ? <Planets /> :
        "other"}
    </div>
  );
}

export default App;
