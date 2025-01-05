const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', getWeather);
document.addEventListener('DOMContentLoaded', displayRecentSearches);

const loadingSpinner = document.querySelector('.loading-spinner');
const weatherInfo = document.querySelector('.weather-info');

const MAX_RECENT_SEARCHES = 5;
const STORAGE_KEY = 'recentSearches';

function saveToRecentSearches(city) {
    let recentSearches = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    recentSearches = recentSearches.filter(search => search.toLowerCase() !== city.toLowerCase()); // remove if already exists
    
    recentSearches.unshift(city);   
    recentSearches = recentSearches.slice(0, MAX_RECENT_SEARCHES);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
    displayRecentSearches();
}


function displayRecentSearches() {
    const searches = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const recentSearchesContainer = document.getElementById('recent-searches');
    
    recentSearchesContainer.innerHTML = searches.length ? '<h3>Recent Searches</h3>' : '';
    
    searches.forEach(city => {
        const searchItem = document.createElement('button');
        searchItem.className = 'recent-search-item';
        searchItem.textContent = city;
        searchItem.onclick = () => {
            cityInput.value = city;
            getWeather();
        };
        recentSearchesContainer.appendChild(searchItem);
    });
}

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

    loadingSpinner.classList.remove('hidden');
    weatherInfo.classList.add('hidden');

    try {
        const coords = await getCoordinates(city);
        
        // Then get the weather data
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=sunrise,sunset&timezone=auto`
        );
        const data = await response.json();

        if (response.ok) {
            saveToRecentSearches(coords.name);
            const currentTime = new Date().toLocaleString("en-US", {
                timeZone: data.timezone
            });
            const currentDateTime = new Date(currentTime);
            const sunrise = new Date(data.daily.sunrise[0]);
            const sunset = new Date(data.daily.sunset[0]);
            const isDay = currentDateTime >= sunrise && currentDateTime < sunset;
            displayWeather(data, coords.name, isDay);
        } else {
            alert('Error getting weather data. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('City not found. Please try again.');
    } finally {
        loadingSpinner.classList.add('hidden');
        weatherInfo.classList.remove('hidden');
    }
}

function getWeatherAnimation(code, isDay) {
    const weatherAnimations = {
        0: isDay ? 'clear-day' : 'clear-night', // Clear sky
        1: isDay ? 'partly-cloudy-day' : 'partly-cloudy-night', // Mainly clear
        2: isDay ? 'partly-cloudy-day' : 'partly-cloudy-night', // Partly cloudy
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

function displayWeather(data, cityName, isDay) {
    // console.log(data);
    document.getElementById('city').textContent = `Weather in ${cityName}`;
    document.getElementById('temperature').textContent = 
        `${Math.round(data.current.temperature_2m)}°C`;
    document.getElementById('description').textContent = 
        getWeatherDescription(data.current.weather_code);
    document.getElementById('humidity').textContent = 
        `${Math.round(data.current.relative_humidity_2m)}%`;
    document.getElementById('wind').textContent = 
        `${Math.round(data.current.wind_speed_10m)} km/h`;

    const container = document.querySelector('.container');
    const weatherAnimation = getWeatherAnimation(data.current.weather_code, isDay);
    
    container.classList.remove('clear-day', 'clear-night', 'partly-cloudy-day', 
        'partly-cloudy-night', 'cloudy', 'rainy', 'heavy-rain', 'snowy', 
        'heavy-snow', 'foggy', 'thunderstorm', 'unknown');
   
    container.classList.add(weatherAnimation);
} 