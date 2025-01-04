# Weather App

A sleek and interactive weather application that provides real-time weather information using the Open-Meteo API. The app features dynamic weather animations that change based on current conditions and time of day, offering users an engaging visual experience. Users can search for any city worldwide to get instant access to temperature, humidity, wind speed, and weather conditions. Built with vanilla JavaScript, CSS animations, and modern HTML5, this project demonstrates clean code architecture while maintaining a responsive and user-friendly interface.

# About the api used - Open-Meteo

Features:
1. No API Key required
2. High Performance
3. Global Coverage
4. Multiple Data Sources
5. No Registration
6. Open Source
7. High Accuracy
8. JSON response
9. CORS enabled

# Endpoints

1. Weather Forecast API
https://api.open-meteo.com/v1/forecast

It provides
- current weather data
- hourly forecasts
- daily forecasts
- historical weather data

2. Geocoding API
https://geocoding-api.open-meteo.com/v1/search

It provides
- City name lookup 
- coordinates lookup
- timezone information
- language support

# Available Parameters for current weather
current=
  temperature_2m          // Temperature (°C)
  relative_humidity_2m    // Humidity (%)
  apparent_temperature    // Feels like (°C)
  is_day                 // Day or night (0/1)
  precipitation          // Precipitation (mm)
  rain                   // Rain (mm)
  showers                // Showers (mm)
  snowfall              // Snowfall (cm)
  weather_code          // Weather condition code
  cloud_cover           // Cloud cover (%)
  pressure_msl          // Sea level pressure (hPa)
  surface_pressure      // Surface pressure (hPa)
  wind_speed_10m        // Wind speed (km/h)
  wind_direction_10m    // Wind direction (°)
  wind_gusts_10m        // Wind gusts (km/h)

daily=
  temperature_2m_max     // Max temperature (°C)
  temperature_2m_min     // Min temperature (°C)
  apparent_temperature_max
  apparent_temperature_min
  precipitation_sum      // Total precipitation (mm)
  rain_sum              // Total rain (mm)
  snowfall_sum          // Total snowfall (cm)
  precipitation_hours    // Hours with precipitation
  sunrise               // Sunrise time
  sunset                // Sunset time

# Weather Codes used in the project
0: Clear sky
1: Mainly clear
2: Partly cloudy
3: Overcast
45: Foggy
48: Depositing rime fog
51: Light drizzle
53: Moderate drizzle
55: Dense drizzle
61: Slight rain
63: Moderate rain
65: Heavy rain
71: Slight snow
73: Moderate snow
75: Heavy snow
77: Snow grains
80: Slight rain showers
81: Moderate rain showers
82: Violent rain showers
85: Slight snow showers
86: Heavy snow showers
95: Thunderstorm
96: Thunderstorm with slight hail
99: Thunderstorm with heavy hail

# Examples of API calls

    1. Basic weather Request
    https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&timezone=auto

    2. Detailed forecast
    https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto

    3. City Search
    https://geocoding-api.open-meteo.com/v1/search?name=London&count=1&language=en&format=json

Usage Limits 
- 10000 API calls per day
- Maximum of 100 locations per API call
- Historical weather data up to 1940
- Forecast data up to 16 days


