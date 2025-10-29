export async function testWeather(city = "Hyderabad") {
  try {
    console.log("Searching city:", city);

    // Get city coordinates
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoRes.json();

    if (!geoData.results) {
      console.error("City not found!");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];
    console.log(`📍 ${name}, ${country} — Lat: ${latitude}, Lon: ${longitude}`);

    //  Fetch current weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    console.log("Current Weather Data:", weatherData.current_weather);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}
