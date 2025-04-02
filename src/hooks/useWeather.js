import { useState, useEffect } from 'react';
import { fetchWeatherDataByCoords, fetchWeatherDataByCity } from '../services/weatherService';

/**
 * Custom hook for managing weather data and related functionality
 * @returns {Object} Weather state and functions
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    // Get user's location on initial load
    getUserLocation();
  }, []);

  useEffect(() => {
    // Fetch weather data when coordinates change
    if (coordinates) {
      fetchWeatherDataByCoords(
        coordinates.lat, 
        coordinates.lon, 
        setLoading, 
        setError, 
        setWeatherData, 
        setCity,
        setUsingMockData
      );
    }
  }, [coordinates]);

  /**
   * Get the user's current location using geolocation API
   */
  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please search for a city instead.');
          setLoading(false);
          // Default to London if geolocation fails
          setCity('London');
          fetchWeatherDataByCity('London', setLoading, setError, setWeatherData, setUsingMockData);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Please search for a city instead.');
      setLoading(false);
      // Default to London if geolocation is not supported
      setCity('London');
      fetchWeatherDataByCity('London', setLoading, setError, setWeatherData, setUsingMockData);
    }
  };

  /**
   * Handle city change from user input
   * @param {string} cityName - Name of the city
   */
  const handleCityChange = (cityName) => {
    if (cityName.trim() !== '') {
      setCity(cityName);
      fetchWeatherDataByCity(cityName, setLoading, setError, setWeatherData, setUsingMockData);
      // Reset coordinates when searching by city
      setCoordinates(null);
    }
  };

  return {
    weatherData,
    loading,
    error,
    city,
    usingMockData,
    getUserLocation,
    handleCityChange
  };
};
