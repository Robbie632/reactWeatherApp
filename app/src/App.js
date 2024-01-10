import './App.css';
import WeatherDisplay from "./components/WeatherDisplay";
import ScreenSaver from './components/ScreenSaver';
import config from './config.js';
import React, { useState, useEffect } from "react";

const dashboards = ["screensaver", "weather"]

function App() {
  // what dashboard to display


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
        dashboards[displayIndex] === "screensaver" ? <ScreenSaver /> :
        dashboards[displayIndex] === "weather" ? <WeatherDisplay /> :
        "other"}
    </div>
  );
}

export default App;
