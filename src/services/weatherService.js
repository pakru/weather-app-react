import axios from 'axios';
import { getMockCurrentWeather, getMockForecastData } from '../utils/mockData';
import { OPENWEATHER_API_KEY } from '../config/apiConfig';

/**
 * Fetch weather data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {Function} setLoading - State setter for loading
 * @param {Function} setError - State setter for error
 * @param {Function} setWeatherData - State setter for weather data
 * @param {Function} setCity - State setter for city
 * @param {Function} setUsingMockData - State setter for using mock data flag
 * @returns {Promise<void>}
 */
export const fetchWeatherDataByCoords = async (
  lat, 
  lon, 
  setLoading, 
  setError, 
  setWeatherData, 
  setCity,
  setUsingMockData
) => {
  setLoading(true);
  setError(null);
  setUsingMockData(false);
  
  try {
    // Get current weather data by coordinates
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    // Get 5-day forecast data by coordinates
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    setWeatherData({
      current: response.data,
      forecast: forecastResponse.data
    });
    
    // Update city name based on API response
    setCity(response.data.name);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    
    // Fall back to mock data if API call fails
    setUsingMockData(true);
    const cityName = setCity.city || 'Your Location';
    setWeatherData({
      current: getMockCurrentWeather(cityName),
      forecast: getMockForecastData(cityName)
    });
    setError('Unable to fetch real weather data. Showing demo data instead.');
    setLoading(false);
  }
};

/**
 * Fetch weather data by city name
 * @param {string} cityName - Name of the city
 * @param {Function} setLoading - State setter for loading
 * @param {Function} setError - State setter for error
 * @param {Function} setWeatherData - State setter for weather data
 * @param {Function} setUsingMockData - State setter for using mock data flag
 * @returns {Promise<void>}
 */
export const fetchWeatherDataByCity = async (
  cityName, 
  setLoading, 
  setError, 
  setWeatherData,
  setUsingMockData
) => {
  setLoading(true);
  setError(null);
  setUsingMockData(false);
  
  try {
    // Get current weather data by city name
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    // Get 5-day forecast data by city name
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    
    setWeatherData({
      current: response.data,
      forecast: forecastResponse.data
    });
    setLoading(false);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    
    // Fall back to mock data if API call fails
    setUsingMockData(true);
    setWeatherData({
      current: getMockCurrentWeather(cityName),
      forecast: getMockForecastData(cityName)
    });
    setError('Unable to fetch real weather data. Showing demo data instead.');
    setLoading(false);
  }
};
