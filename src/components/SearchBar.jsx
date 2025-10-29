import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-lg"
    >
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform"
      >
        Search
      </button>
    </form>
  );
}
