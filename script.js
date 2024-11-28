const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const CITY = 'Washington,DC,US';

async function fetchWeather() {
    const API_KEY = await getApiKey();
    if (!API_KEY) {
        document.getElementById('weather').innerHTML = '<p>API key is missing or invalid.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}?q=${CITY}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        const weatherHTML = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
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
