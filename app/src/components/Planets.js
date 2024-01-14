import "../style/planets.css";
import "../style/display.css";
import planetsConfig from "../configs/planetsConfig";
import { Planet } from "./planet";
import { PlanetName } from "./Planetname";
import { CardinalPoint } from "./CardinalPoint";
import {
  degreesToRadians,
  polarToCartesian,
  getRandomInt,
} from "../utils/planetEquations";

import React, { useState, useEffect } from "react";

function Planets() {
  const lat = 51.454514;
  const long = -2.58791;
  const mapRadius = 310;

  const [planets, setPlanets] = useState([{}]);

  useEffect(() => {
    const url = `https://api.visibleplanets.dev/v3?latitude=${lat}&longitude=${long}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        const parsedPlanets = data["data"].map(
          ({ name, altitude, azimuth, nakedEyeObject }) => {
            return {
              planetName: name.toLowerCase(),
              altitude: altitude,
              azimuth: azimuth,
              visible: nakedEyeObject,
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
    ({ planetName, altitude, azimuth, visible }) => {
      if (planetsConfig[planetName] === undefined || !visible) {
        return;
      }
      const { x, y } = polarToCartesian(
        mapRadius,
        degreesToRadians(azimuth)
      );

      return (
        <Planet
          mapRadius={mapRadius}
          planetRadius={planetsConfig[planetName].radius}
          x={x}
          y={y}
          color={planetsConfig[planetName].color}
          opacity={ visible ? 0.8 : 0.3}
        />
      );
    }
  );

  const planetNames = planets.map(({ planetName, altitude, azimuth, visible }) => {
    if (planetsConfig[planetName] === undefined || !visible) {
      return;
    }
    const { x, y } = polarToCartesian(
      mapRadius + 50,
      degreesToRadians(azimuth)
    );

    return (
      <PlanetName
        mapRadius={mapRadius}
        x={x}
        y={y}
        planetName={planetName}
        opacity={0.8}
      />
    );
  });

  const cardinalPoints = [
    { name: "N", angle: 0 },
    { name: "E", angle: 90 },
    { name: "S", angle: 180 },
    { name: "W", angle: 270 },
  ];
  const cardinalPointElements = cardinalPoints.map(({ name, angle }) => {
    const { x, y } = polarToCartesian(mapRadius +20, degreesToRadians(angle));
    return <CardinalPoint mapRadius={mapRadius} x={x} y={y} name={name} />;
  });

  return (
    <div id="map-container">
      <div id="planets-map">
        {planetElements}
        {planetNames}
        {cardinalPointElements}
      </div>
    </div>
  );
}

export default Planets;
