const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', getWeather);

async function getCoordinates(city) {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            return {
                lat: data.results[0].latitude,
                lon: data.results[0].longitude,
                name: data.results[0].name
            };
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        throw new Error('Error finding city');
    }
}

async function getWeather() {
    const city = cityInput.value;
    if (!city) return;

    try {
        const coords = await getCoordinates(city);
        
        // Then get the weather data
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );
        const data = await response.json();

        if (response.ok) {
            displayWeather(data, coords.name);
        } else {
            alert('Error getting weather data. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('City not found. Please try again.');
    }
}

function getWeatherAnimation(code) {
    // Weather codes from Open-Meteo API
    const weatherAnimations = {
        0: 'sunny', // Clear sky
        1: 'partly-cloudy', // Mainly clear
        2: 'partly-cloudy', // Partly cloudy
        3: 'cloudy', // Overcast
        45: 'foggy', // Foggy
        48: 'foggy', // Depositing rime fog
        51: 'rainy', // Light drizzle
        53: 'rainy', // Moderate drizzle
        55: 'rainy', // Dense drizzle
        61: 'rainy', // Slight rain
        63: 'rainy', // Moderate rain
        65: 'heavy-rain', // Heavy rain
        71: 'snowy', // Slight snow
        73: 'snowy', // Moderate snow
        75: 'heavy-snow', // Heavy snow
        77: 'snowy', // Snow grains
        80: 'rainy', // Slight rain showers
        81: 'rainy', // Moderate rain showers
        82: 'heavy-rain', // Violent rain showers
        85: 'snowy', // Slight snow showers
        86: 'heavy-snow', // Heavy snow showers
        95: 'thunderstorm', // Thunderstorm
        96: 'thunderstorm', // Thunderstorm with slight hail
        99: 'thunderstorm', // Thunderstorm with heavy hail
    };
    return weatherAnimations[code] || 'unknown';
}

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Light snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Light rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Light snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Unknown';
}

function displayWeather(data, cityName) {
    document.getElementById('city').textContent = `Weather in ${cityName}`;
    document.getElementById('temperature').textContent = 
        `${Math.round(data.current.temperature_2m)}°C`;
    document.getElementById('description').textContent = 
        getWeatherDescription(data.current.weather_code);
    document.getElementById('humidity').textContent = 
        `${Math.round(data.current.relative_humidity_2m)}%`;
    document.getElementById('wind').textContent = 
        `${Math.round(data.current.wind_speed_10m)} km/h`;
} 