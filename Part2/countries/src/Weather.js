import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ countryInfo }) => {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryInfo.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
      )
      .catch((error) => console.log("Weather data not found", error))
      .then((response) => {
        setWeather(response.data);
      });
  }, [countryInfo.capital]);

  if (weather) {
    return (
      <div>
        <h3>Weather in {countryInfo.capital}</h3>
        <p>Temperature: {weather.main.temp} degrees celsius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    );
  }
};

export default Weather;
