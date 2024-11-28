const WEATHER_API_URL = '/.netlify/functions/getWeather.js'; // Proxy to Netlify Function
const weatherDiv = document.getElementById('weather');

async function fetchWeather() {
    try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();
        if (data) {
            weatherDiv.innerHTML = `
                <p>Current Weather: ${data.summary}</p>
                <p>Next Hour: ${data.narrative}</p>
            `;
        } else {
            weatherDiv.innerHTML = `<p>Unable to fetch weather data</p>`;
        }
    } catch (error) {
        weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

fetchWeather();

