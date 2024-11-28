const fetch = require('node-fetch');

// Latitude and Longitude for Washington DC
const LATITUDE = 38.9072;
const LONGITUDE = -77.0369;
const API_KEY = process.env.ACCUWEATHER_API_KEY;

exports.handler = async function () {
    const API_URL = `https://dataservice.accuweather.com/forecasts/v1/minute?apikey=${API_KEY}&q=${LATITUDE},${LONGITUDE}`;

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorText = await response.text(); // Read full response for debugging
            console.error("API Error Response:", errorText);
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: `API Error: ${response.status}`,
                    message: errorText,
                }),
            };
        }

        const weatherData = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(weatherData),
        };
    } catch (error) {
        console.error("Fetch Error:", error); // Log fetch error for debugging
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
