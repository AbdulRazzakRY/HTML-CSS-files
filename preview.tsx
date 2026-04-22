import React from "react";
import "./App.css";

type Weather = {
  id: number;
  day: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
};

const App = () => {
  const weatherData: Weather[] = [
    { id: 1, day: "Monday", temperature: 72, condition: "Sunny", humidity: 45, windSpeed: 8, precipitation: 0 },
    { id: 2, day: "Tuesday", temperature: 68, condition: "Partly Cloudy", humidity: 50, windSpeed: 10, precipitation: 10 },
    { id: 3, day: "Wednesday", temperature: 75, condition: "Sunny", humidity: 40, windSpeed: 5, precipitation: 0 },
    { id: 4, day: "Thursday", temperature: 63, condition: "Rainy", humidity: 80, windSpeed: 15, precipitation: 70 },
    { id: 5, day: "Friday", temperature: 58, condition: "Thunderstorm", humidity: 85, windSpeed: 20, precipitation: 90 },
    { id: 6, day: "Saturday", temperature: 65, condition: "Cloudy", humidity: 60, windSpeed: 12, precipitation: 20 },
    { id: 7, day: "Sunday", temperature: 70, condition: "Sunny", humidity: 45, windSpeed: 7, precipitation: 0 }
  ];

  const avgTemp =
    weatherData.reduce((sum, d) => sum + d.temperature, 0) / weatherData.length;

  const hottest = weatherData.reduce((a, b) =>
    a.temperature > b.temperature ? a : b
  );

  const coldest = weatherData.reduce((a, b) =>
    a.temperature < b.temperature ? a : b
  );

  const sunnyDays = weatherData.filter(d => d.condition === "Sunny").length;

  const rainyDays = weatherData.filter(
    d => d.condition === "Rainy" || d.condition === "Thunderstorm"
  ).length;

  const heavyRainDays = weatherData
    .filter(d => d.precipitation >= 70)
    .map(d => d.day);

  const windyDays = weatherData
    .filter(d => d.windSpeed >= 15)
    .map(d => d.day);

  return (
    <div className="container">
      <h1>Daily Forecast</h1>

      <div className="grid">
        {weatherData.map(day => (
          <div key={day.id} className="card">
            <h3>{day.day}</h3>
            <h2>{day.temperature}°F</h2>
            <p>{day.condition}</p>
            <p>Humidity: {day.humidity}%</p>
            <p>Wind: {day.windSpeed} mph</p>

            {day.condition === "Sunny" && (
              <p className="sunny">☀️ Great day for outdoor activities!</p>
            )}

            {(day.condition === "Rainy" || day.condition === "Thunderstorm") && (
              <p className="rainy">🌧️ Don't forget your umbrella!</p>
            )}

            {day.windSpeed >= 15 && (
              <p className="wind">💨 High winds expected</p>
            )}
          </div>
        ))}
      </div>

      <h2>Weather Alerts</h2>

      {heavyRainDays.length > 0 && (
        <div className="alert rain">
          <h3>Rain Alert</h3>
          <p>Heavy rain expected on: {heavyRainDays.join(", ")}</p>
        </div>
      )}

      {windyDays.length > 0 && (
        <div className="alert wind">
          <h3>Wind Advisory</h3>
          <p>Strong winds expected on: {windyDays.join(", ")}</p>
        </div>
      )}

      <h2>Week Overview</h2>
      <p>Average Temperature: {avgTemp.toFixed(1)}°F</p>
      <p>Hottest Day: {hottest.day} ({hottest.temperature}°F)</p>
      <p>Coldest Day: {coldest.day} ({coldest.temperature}°F)</p>
      <p>Sunny Days: {sunnyDays}</p>
      <p>Rainy Days: {rainyDays}</p>
    </div>
  );
};

export default App;