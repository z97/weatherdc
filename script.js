const API_BASE = 'https://api.openweathermap.org/data/3.0/onecall';
const LAT = 38.9072; // Latitude for Washington DC
const LON = -77.0369; // Longitude for Washington DC

async function fetchWeather() {
    const API_KEY = await getApiKey();
    if (!API_KEY) {
        document.getElementById('weather').innerHTML = '<p>API key is missing or invalid.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}?lat=${LAT}&lon=${LON}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (!data.current) {
            throw new Error("Failed to fetch weather data.");
        }

        const weatherHTML = `
            <h2>Current Weather</h2>
            <p>Temperature: ${data.current.temp}°C</p>
            <p>${data.current.weather[0].description}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_speed} m/s</p>
            <h3>Daily Forecast</h3>
            ${data.daily.slice(0, 3).map(day => `
                <div>
                    <p>Date: ${new Date(day.dt * 1000).toLocaleDateString()}</p>
                    <p>Day Temp: ${day.temp.day}°C</p>
                    <p>Night Temp: ${day.temp.night}°C</p>
                    <p>Condition: ${day.weather[0].description}</p>
                </div>
            `).join('')}
        `;
        document.getElementById('weather').innerHTML = weatherHTML;
    } catch (error) {
        document.getElementById('weather').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function getApiKey() {
    // Simulating secure access to Netlify's environment variables
    // Replace with actual API key retrieval during deployment
    const response = await fetch('/.netlify/functions/getApiKey');
    if (response.ok) {
        const { apiKey } = await response.json();
        return apiKey;
    }
    return null;
}

fetchWeather();

