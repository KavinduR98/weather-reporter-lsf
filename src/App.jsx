import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const api_url = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    setError("");
    try {
      const response = await axios.get(`${api_url}?key=${api_key}&q=${location}&days=1`);
      console.log(response.data);
      setData(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("City not found or something went wrong. Please try again.");
      setData(null);
    }
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-800 to-indigo-900 text-white flex flex-col items-center justify-center px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">🌤️ SkyMate</h1>

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyUp={searchLocation}
        placeholder="Enter location"
        type="text"
        className="w-full max-w-md px-4 py-3 rounded-full bg-white/10 border border-white/40 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
      />
      {error && (
        <p className="text-red-300 bg-red-800/20 border border-red-500 rounded-md p-3 mt-4 text-center max-w-md">
          {error}
        </p>
      )}

      {/* Weather data display */}
      {data && (
        <div className="w-full max-w-md mt-8 bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <>
            <div className="text-center">
              <h2 className="text-3xl font-semibold">
                {data.location.name}, {data.location?.country}
              </h2>
              <img
                className="w-20 mx-auto" src={data.current.condition.icon} alt="" />
              <h1 className="text-6xl font-bold mt-4">
                {data.current?.temp_c.toFixed()}°C
              </h1>
            </div>

            <div className="flex justify-around mt-6 text-center">
              <div>
                <p className="text-xl font-bold">
                  {data.current?.feelslike_c.toFixed()}°C
                </p>
                <p className="text-sm text-white/80">Feels Like</p>
              </div>
              <div>
                <p className="text-xl font-bold">{data.current?.humidity}%</p>
                <p className="text-sm text-white/80">Humidity</p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {data.current?.wind_kph} kph
                </p>
                <p className="text-sm text-white/80">Wind Speed</p>
              </div>
              <div>
                <p className="text-xl font-bold">{data.current?.uv}</p>
                <p className="text-sm text-white/80">UV Index</p>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
}

export default App;
