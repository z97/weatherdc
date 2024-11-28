const API_BASE = "https://api.openweathermap.org/data/3.0/onecall";
const LAT = 38.9072; // Latitude for Washington DC
const LON = -77.0369; // Longitude for Washington DC

async function fetchWeather() {
    const API_KEY = await getApiKey();
    if (!API_KEY) {
        document.getElementById("weather").innerHTML =
            "<p>API key is missing or invalid.</p>";
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE}?lat=${LAT}&lon=${LON}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (!data.current) {
            throw new Error("Failed to fetch weather data.");
        }

        // Extract and display current weather
        const currentWeather = `
            <h2>Current Weather</h2>
            <p>Temperature: ${data.current.temp}°C</p>
            <p>Feels Like: ${data.current.feels_like}°C</p>
            <p>${data.current.weather[0].description}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_speed} m/s</p>
        `;

        // Extract and display daily weather
        const dailyWeather = data.daily
            .slice(0, 3) // Limit to 3 days
            .map((day) => {
                return `
                    <div>
                        <h3>${new Date(day.dt * 1000).toLocaleDateString()}</h3>
                        <p>Day Temp: ${day.temp.day}°C</p>
                        <p>Night Temp: ${day.temp.night}°C</p>
                        <p>${day.weather[0].description}</p>
                        <p>Chance of Rain: ${Math.round(day.pop * 100)}%</p>
                    </div>
                `;
            })
            .join("");

        // Extract and display alerts if available
        const alerts = data.alerts
            ? data.alerts
                  .map((alert) => {
                      return `
                        <div>
                            <h3>Alert: ${alert.event}</h3>
                            <p>${alert.description}</p>
                            <p><strong>From:</strong> ${new Date(
                                alert.start * 1000
                            ).toLocaleString()}</p>
                            <p><strong>To:</strong> ${new Date(
                                alert.end * 1000
                            ).toLocaleString()}</p>
                        </div>
                    `;
                  })
                  .join("")
            : "<p>No active weather alerts.</p>";

        // Combine all sections and render
        document.getElementById("weather").innerHTML = `
            ${currentWeather}
            <h2>3-Day Forecast</h2>
            ${dailyWeather}
            <h2>Weather Alerts</h2>
            ${alerts}
        `;
    } catch (error) {
        document.getElementById("weather").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function getApiKey() {
    const response = await fetch("/.netlify/functions/getApiKey");
    if (response.ok) {
        const { apiKey } = await response.json();
        return apiKey;
    }
    return null;
}

fetchWeather();
