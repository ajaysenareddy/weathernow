const weatherCodes = {
  0: "Clear Sky ☀️",
  1: "Mainly Clear 🌤️",
  2: "Partly Cloudy ⛅",
  3: "Overcast ☁️",
  45: "Fog 🌫️",
  48: "Depositing Rime Fog 🌫️",
  51: "Light Drizzle 🌦️",
  61: "Rain 🌧️",
  71: "Snow ❄️",
  95: "Thunderstorm ⛈️",
};

export default function WeatherCard({ data }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl w-full text-center animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-2">
        {data.city}, <span className="text-gray-400">{data.country}</span>
      </h2>
      <p className="text-6xl font-bold mb-2">{data.temp}°C</p>
      <p className="text-lg text-cyan-300">{weatherCodes[data.condition] || "Unknown"}</p>
      <p className="text-sm text-gray-400 mt-2">💨 {data.wind} km/h Wind</p>
    </div>
  );
}
