import "../style/planets.css";
import "../style/display.css";
import planetsConfig from "../configs/planetsConfig";
import { degreesToRadians, polarToCartesian } from "../utils/planetEquations";

import React, { useState, useEffect } from "react";

function Planet({ mapRadius, planetRadius, x, y, color }) {
  return (
    <div
      className="planet"
      style={{
        height: 2 * planetRadius,
        width: 2 * planetRadius,
        borderRadius: planetRadius,
        backgroundColor: color,
        zIndex: 1,
        bottom: mapRadius - planetRadius + x,
        left: mapRadius - planetRadius + y,
        opacity: 0.8,
      }}
    ></div>
  );
}

function PlanetName({ mapRadius, x, y, color, planetName }) {
  const height = 40;
  const width = 100;

  return (
    <div
      className="planet"
      style={{
        height: height,
        width: width,
        backgroundColor: color,
        borderRadius: 8,
        zIndex: 1,
        bottom: mapRadius - (height/2) + x,
        left: mapRadius - (width/2) + y,
        opacity: 0.8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div>
      {planetName}
      </div>
      
    </div>
  );
}

function Planets() {
  const lat = 51.454514;
  const long = -2.58791;
  const mapRadius = 320-50;

  const [planets, setPlanets] = useState([{}]);

  useEffect(() => {
    const url = `https://api.visibleplanets.dev/v3?latitude=${lat}&longitude=${long}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const visible = data["data"].filter(({ nakedEyeObject }) => nakedEyeObject);
        const parsedPlanets = visible.map(
          ({ name, altitude, azimuth }) => {
            return {
              planetName: name.toLowerCase(),
              altitude: altitude,
              azimuth: azimuth,
            };
          }
        );
        setPlanets(parsedPlanets);
      } catch (error) {
        console.log("error calling planets api");
      }
    };
    setTimeout(fetchData, 1000);
  }, []);

  
  const planetElements = planets.map(
    ({ planetName, altitude, azimuth }) => {
      if (planetsConfig[planetName] === undefined) {
        return
      }
      const { x, y } = polarToCartesian(mapRadius, degreesToRadians(azimuth));
  
      return (
        <Planet
          mapRadius={350}
          planetRadius={planetsConfig[planetName].radius}
          x={x}
          y={y}
          color={planetsConfig[planetName].color}
        />
      );
    }
  );

  const planetNames= planets.map(
    ({ planetName, altitude, azimuth }) => {
      if (planetsConfig[planetName] === undefined) {
        return
      }
      const { x, y } = polarToCartesian(mapRadius+100, degreesToRadians(azimuth));
  
      return (
        <PlanetName
          mapRadius={350}
          x={x}
          y={y}
          color={planetsConfig[planetName].color}
          planetName={planetName}
        />
      );
    }
  );

  return (
    <div id="map-container">
      <div id="planets-map">{planetElements}{planetNames}</div>
    </div>
  );
}

export default Planets;
