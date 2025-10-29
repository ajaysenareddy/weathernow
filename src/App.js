import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
      const geoData = await geoRes.json();
      if (!geoData.results) {
        alert("City not found!");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: name,
        country,
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        condition: weatherData.current_weather.weathercode,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch weather data");
      setLoading(false);
    }
  };

  const weatherCodes = {
    0: "Clear Sky ☀️",
    1: "Mainly Clear 🌤️",
    2: "Partly Cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    51: "Light Drizzle 🌦️",
    61: "Rain 🌧️",
    71: "Snow ❄️",
    95: "Thunderstorm ⛈️",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWeather(city);
    setCity("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-10 sm:px-6 lg:px-8">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-center">
        Weather Now
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 w-full max-w-md bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-base sm:text-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-sm sm:text-base hover:scale-105 transition-transform"
        >
          Search
        </button>
      </form>

      {/* Weather Info */}
      {loading ? (
        <p className="mt-10 text-gray-400 animate-pulse text-base sm:text-lg">Fetching weather...</p>
      ) : weather ? (
        <div className="text-center mt-8 animate-fadeIn px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
            {weather.city}, <span className="text-gray-400">{weather.country}</span>
          </h2>
          <p className="text-6xl sm:text-7xl font-bold mb-2">{weather.temp}°C</p>
          <p className="text-lg sm:text-xl text-cyan-300">
            {weatherCodes[weather.condition] || "Unknown"}
          </p>
          <p className="text-sm sm:text-base text-gray-400 mt-2">💨 {weather.wind} km/h Wind</p>
        </div>
      ) : (
        <p className="mt-10 text-gray-500 text-base sm:text-lg">Enter a city to see its weather.</p>
      )}
    </div>
  );
}
