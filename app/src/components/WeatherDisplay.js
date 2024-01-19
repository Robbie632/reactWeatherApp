import { Component } from "react";
import "../style/display.css";
import "../style/weatherdisplay.css";
import { fetchWeatherApi } from "openmeteo";
import weatherCodes from "../configs/weatherCodes.js";
import { thresholds } from "../configs/weatherColorThresholds.js"; 
import { getTileColor } from "../utils/weather.js";
import Tile from "./Tile.js";
import Graph from "./Graph.js";
import { WiStrongWind } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiRain } from "react-icons/wi";
import { PiTree } from "react-icons/pi";
import { GiHighGrass } from "react-icons/gi";
import { IoInformationCircleOutline } from "react-icons/io5";

class WeatherDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "loading...",
      wind: "loading...",
      rain: "loading...",
      weatherCode: "loading...",
      treePollen: "loading...",
      grassPollen: "loading...",
      daily: [],
    };
    const { REACT_APP_LATITUDE_1 } = process.env;
    const { REACT_APP_LONGITUDE_1 } = process.env;

    const timezone = "GMT";

    this.api_params = {
      latitude: REACT_APP_LATITUDE_1,
      longitude: REACT_APP_LONGITUDE_1,
      current: [
        "temperature_2m",
        "precipitation_probability",
        "wind_speed_10m",
        "weather_code",
      ],
      daily: [
        "temperature_2m_max",
        "precipitation_probability_max",
        "wind_speed_10m_max",
      ],
      timezone: timezone,
    };
    this.airQualityAPIParams = {
      latitude: REACT_APP_LATITUDE_1,
      longitude: REACT_APP_LONGITUDE_1,
      current: ["birch_pollen", "alder_pollen", "grass_pollen"],
    };

    this.url = "https://api.open-meteo.com/v1/forecast";
    this.airQualityURL =
      "https://air-quality-api.open-meteo.com/v1/air-quality";
  }

  setTemp = (newValue) => {
    this.setState((prev) => ({ ...prev, temp: newValue }));
  };
  setDaily = (newValue) => {
    this.setState((prev) => ({ ...prev, daily: newValue }));
  };
  setWind = (newValue) => {
    this.setState((prev) => ({ ...prev, wind: newValue }));
  };
  setRain = (newValue) => {
    this.setState((prev) => ({ ...prev, rain: newValue }));
  };
  setWeatherCode = (newValue) => {
    this.setState((prev) => ({ ...prev, weatherCode: newValue }));
  };
  setTreePollen = (newValue) => {
    this.setState((prev) => ({ ...prev, treePollen: newValue }));
  };
  setGrassPollen = (newValue) => {
    this.setState((prev) => ({ ...prev, grassPollen: newValue }));
  };
  range = (start, stop, step) => {
    return Array.from(
      { length: (stop - start) / step },
      (_, i) => start + i * step
    );
  };
  getPollen = async () => {
    try {
      const responses = await fetchWeatherApi(
        this.airQualityURL,
        this.airQualityAPIParams
      );
      const response = responses[0];
      const current = response.current();
      const treePollen =
        (current.variables(0).value() + current.variables(1).value()) / 2;
      this.setTreePollen(treePollen);
      this.setGrassPollen(current.variables(2).value());
    } catch (error) {
      console.log(`error getting pollen: ${error}`);
    }
  };

  getWeather = async () => {
    // call api
    try {
      const responses = await fetchWeatherApi(this.url, this.api_params);
      const response = responses[0];
      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current();
      const daily = response.daily();

      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          rain: current.variables(1).value(),
          windSpeed10m: current.variables(2).value(),
          temperature2m: current.variables(0).value(),
          weatherCode: daily.variables(3).value(),
        },
        daily: {
          time: this.range(
            Number(daily.time()),
            Number(daily.timeEnd()),
            daily.interval()
          ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
          temperature2mMax: Array.from(daily.variables(0).valuesArray()),
          precipitationProbabilityMax: Array.from(
            daily.variables(1).valuesArray()
          ),
          windSpeed10mMax: daily.variables(2).valuesArray(),
        },
      };

      const dailyParsed = [];
      for (let index = 0; index < weatherData.daily.time.length; index++) {
        const time = weatherData.daily.time[index].toLocaleDateString("en-GB", {
          weekday: "short",
        });
        const temperature2mMax = weatherData.daily.temperature2mMax[index];
        const precipitationProbabilityMax =
          weatherData.daily.precipitationProbabilityMax[index];
        const windSpeed10mMax = weatherData.daily.windSpeed10mMax[index];
        dailyParsed.push({
          time: time,
          temperature2mMax: temperature2mMax,
          precipitationProbabilityMax: precipitationProbabilityMax,
          windSpeed10mMax: windSpeed10mMax,
        });
      }
      this.setRain(weatherData.current.rain);
      this.setTemp(weatherData.current.temperature2m);
      this.setWind(weatherData.current.windSpeed10m);
      this.setWeatherCode(weatherData.current.weatherCode);
      this.setDaily(dailyParsed);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    setTimeout(this.getPollen, 2000);
    setTimeout(this.getWeather, 2000);
  }

  render() {
    const graphHeight = "90%";
    const graphWidth = "80%";
    const graphMargins = { top: 20, right: 30, left: 35, bottom: 0 };

    return (
      <div id="first-container">
        <div className="container-0">
          <div className="column" id="column-1">
            <Tile
              icon={<IoInformationCircleOutline />}
              value={
                weatherCodes[this.state.weatherCode] === undefined
                  ? this.state.weatherCode
                  : weatherCodes[this.state.weatherCode]
              }
            />
            <Tile
              icon={<WiThermometer />}
              value={
                typeof this.state.temp == "string"
                  ? this.state.temp
                  : Math.round(this.state.temp)
              }
              unit={<span>&#8451;</span>}
            />
            <Tile
              icon={<WiRain />}
              value={
                typeof this.state.rain == "string"
                  ? this.state.rain
                  : Math.round(this.state.rain)
              }
              color={typeof this.state.rain == "string"? undefined : getTileColor(thresholds.rain.thresholds, Math.round(this.state.rain))}
              unit={"%"}
            />
            <Tile
              icon={<WiStrongWind />}
              value={
                typeof this.state.rain == "string"
                  ? this.state.rain
                  : Math.round(this.state.rain)
              }
              unit={"kph"}
            />
            <div id="container-2">
              <Tile
                icon={<PiTree />}
                value={
                  typeof this.state.treePollen == "string"
                    ? this.state.treePollen
                    : Math.round(this.state.treePollen)
                }
                unit={""}
              />
              <Tile
                icon={<GiHighGrass />}
                value={
                  typeof this.state.grassPollen == "string"
                    ? this.state.grassPollen
                    : Math.round(this.state.grassPollen)
                }
                unit={""}
                iconSize="3.2em"
              />
            </div>
          </div>
          <div className="column" id="column-2">
            <Graph
              graphHeight={graphHeight}
              graphWidth={graphWidth}
              graphMargins={graphMargins}
              yLabel={"temp (C)"}
              data={this.state.daily.map(({ time, temperature2mMax }) => ({
                name: time,
                temp: temperature2mMax,
              }))}
              dataName="temp"
            />
            <Graph
              graphHeight={graphHeight}
              graphWidth={graphWidth}
              graphMargins={graphMargins}
              yLabel={"max prob. rain"}
              data={this.state.daily.map(
                ({ time, precipitationProbabilityMax }) => ({
                  name: time,
                  rain: precipitationProbabilityMax,
                })
              )}
              domain={[0, 100]}
              dataName="rain"
            />
            <Graph
              graphHeight={graphHeight}
              graphWidth={graphWidth}
              graphMargins={graphMargins}
              yLabel={"wind (kph)"}
              data={this.state.daily.map(({ time, windSpeed10mMax }) => ({
                name: time,
                wind: windSpeed10mMax,
              }))}
              dataName="wind"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default WeatherDisplay;
