import "../style/planets.css";
import "../style/display.css";
import { bearing, planetsConfig } from "../configs/planetsConfig";
import { Planet } from "./planet";
import { PlanetName } from "./Planetname";
import { CardinalPoint } from "./CardinalPoint";
import {
  degreesToRadians,
  polarToCartesian,
} from "../utils/planetEquations";

import React, { useState, useEffect } from "react";

function Planets() {
  const { REACT_APP_LATITUDE_1 } = process.env;
  const { REACT_APP_LONGITUDE_1 } = process.env;
  const mapRadius = 180;
  const distanceBetweenEarthAndPlanets = 100;

  const [planets, setPlanets] = useState([{}]);

  useEffect(() => {
    const url = `https://api.visibleplanets.dev/v3?latitude=${REACT_APP_LATITUDE_1}&longitude=${REACT_APP_LONGITUDE_1}`;
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
    fetchData();
  }, []);

  const planetElements = planets.map(
    ({ planetName, altitude, azimuth, visible }) => {
      if (planetsConfig[planetName] === undefined || !visible) {
        return;
      }
      const { x, y } = polarToCartesian(
        mapRadius + distanceBetweenEarthAndPlanets,
        degreesToRadians(azimuth - bearing)
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
      mapRadius + distanceBetweenEarthAndPlanets + planetsConfig[planetName].radius,
      degreesToRadians(azimuth - bearing)
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
    const { x, y } = polarToCartesian(mapRadius +20, degreesToRadians(angle - bearing));
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
