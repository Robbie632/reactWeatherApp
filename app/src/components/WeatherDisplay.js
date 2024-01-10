import { Component } from "react";
import "../style/display.css";
import "../style/weatherdisplay.css";
import { fetchWeatherApi } from "openmeteo";
import weatherCodes from "../utils/weatherCodes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { WiStrongWind } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { IconContext } from "react-icons";
import { WiRain } from "react-icons/wi";
import { IoInformationCircleOutline } from "react-icons/io5";

class WeatherDisplay extends Component {
  // make this function
  // convert states to single variables usng useState
  // convert api calls to useEffect
  constructor(props) {
    super(props);
    this.state = {
      temp: "loading...",
      wind: "loading...",
      rain: "loading...",
      weatherCode: "loading...",
      daily: [],
    };

    this.api_params = {
      latitude: 51.454514,
      longitude: -2.58791,
      current: [
        "temperature_2m",
        "precipitation_probability",
        "wind_speed_10m",
        "weather_code"
      ],
      daily: [
        "temperature_2m_max",
        "precipitation_probability_max",
        "wind_speed_10m_max"
      ],
      timezone: "GMT",
    };
    this.url = "https://api.open-meteo.com/v1/forecast";
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
  range = (start, stop, step) => {
    return Array.from(
      { length: (stop - start) / step },
      (_, i) => start + i * step
    );
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
          weatherCode: daily.variables(3).value()
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
          windSpeed10mMax: daily.variables(2).valuesArray()
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
      this.setWeatherCode(weatherData.current.weatherCode)
      this.setDaily(dailyParsed);
    } catch (error) {
      console.log(error);
    }
  };


  componentDidMount() {
    setTimeout(this.getWeather, 1000);
  }

  render() {
    const graphHeight = "90%";
    const graphWidth = "80%";
    const graphMargins = { top: 20, right: 30, left: 35, bottom: 0 };

    return (
      <div className="container-0">
        <div className="column" id="column-1">
        <div className="current-tile tile" id="description">
            <IconContext.Provider
              value={{
                size: "4em",
                color: "#3B67EB",
                className: "global-class-name",
              }}
            >
               <IoInformationCircleOutline/>
            </IconContext.Provider>
            <br></br>
            <div>
              {weatherCodes[this.state.weatherCode] == undefined ? this.state.weatherCode : weatherCodes[this.state.weatherCode]}
            </div>
          </div>
          <div className="current-tile tile" id="current-temp">
            <IconContext.Provider
              value={{
                size: "4em",
                color: "#3B67EB",
                className: "global-class-name",
              }}
            >
              <WiThermometer />
            </IconContext.Provider>
            <br></br>
            <div>
              {typeof this.state.temp == "string"
                ? this.state.temp
                : Math.round(this.state.temp)}{" "}
              <span>&#8451;</span>
            </div>
          </div>
          <div className="current-tile tile" id="current-rain">
            <IconContext.Provider
              value={{
                size: "4em",
                color: "#3B67EB",
                className: "global-class-name",
              }}
            >
              <WiRain />
            </IconContext.Provider>
            <br></br>
            <div>
              {typeof this.state.rain == "string"
                ? this.state.rain
                : Math.round(this.state.rain)}{" "}
              %
            </div>
          </div>
          <div className="current-tile tile" id="current-wind">
            <IconContext.Provider
              value={{
                size: "4em",
                color: "#3B67EB",
                className: "global-class-name",
              }}
            >
              <WiStrongWind />
            </IconContext.Provider>
            <br></br>
            <div>
              {typeof this.state.wind == "string"
                ? this.state.wind
                : Math.round(this.state.wind)}{" "}
              kph
            </div>
          </div>
        </div>
        <div className="column" id="column-2">
          <div className="tile graph-tile" id="temp-graph">
            <ResponsiveContainer width={graphWidth} height={graphHeight}>
              <LineChart
                margin={graphMargins}
                data={this.state.daily.map(({ time, temperature2mMax }) => ({
                  name: time,
                  temp: temperature2mMax,
                }))}
              >
                <XAxis dataKey="name"></XAxis>

                <YAxis
                  label={{
                    value: "temp (C)",
                    angle: -90,
                    position: "insideBottomLeft",
                  }}
                ></YAxis>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="temp" stroke="#3B67EB" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="tile graph-tile" id="rain-graph">
            <ResponsiveContainer width={graphWidth} height={graphHeight}>
              <LineChart
                margin={graphMargins}
                data={this.state.daily.map(
                  ({ time, precipitationProbabilityMax }) => ({
                    name: time,
                    rain: precipitationProbabilityMax,
                  })
                )}
              >
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "max. prob. rain",
                    angle: -90,
                    position: "insideBottomLeft",
                  }}
                />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="rain" stroke="#3B67EB" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="tile graph-tile" id="wind-graph">
            <ResponsiveContainer width={graphWidth} height={graphHeight}>
              <LineChart
                margin={graphMargins}
                data={this.state.daily.map(({ time, windSpeed10mMax }) => ({
                  name: time,
                  wind: windSpeed10mMax,
                }))}
              >
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "wind (kph)",
                    angle: -90,
                    position: "insideBottomLeft",
                  }}
                />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="wind" stroke="#3B67EB" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}
export default WeatherDisplay;
