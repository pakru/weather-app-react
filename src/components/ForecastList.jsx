import React from 'react';
import styled from 'styled-components';
import ForecastItem from './ForecastItem';

const ForecastContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const ForecastHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ForecastTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  margin: 0;
`;

const ForecastGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding-bottom: 5px;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0;
  }
`;

const ForecastList = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Process forecast data to get daily min/max temperatures
  const dailyForecasts = {};
  
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString('en-US'); // Use full date as key to ensure uniqueness
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const hour = date.getHours();
    const isDaytime = hour >= 8 && hour <= 20;
    
    if (!dailyForecasts[dayKey]) {
      // Initialize the day's forecast data
      dailyForecasts[dayKey] = {
        dt: item.dt,
        day: day,
        dayTemp: isDaytime ? item.main.temp : null,
        nightTemp: !isDaytime ? item.main.temp : null,
        weather: item.weather,
        noonForecast: null,
        dayCount: isDaytime ? 1 : 0,
        nightCount: !isDaytime ? 1 : 0
      };
    } else {
      // Update temperatures based on time of day
      if (isDaytime) {
        // Update day temperature (average or max)
        if (dailyForecasts[dayKey].dayTemp === null) {
          dailyForecasts[dayKey].dayTemp = item.main.temp;
        } else {
          // Use the warmer temperature for daytime
          dailyForecasts[dayKey].dayTemp = Math.max(dailyForecasts[dayKey].dayTemp, item.main.temp);
        }
        dailyForecasts[dayKey].dayCount++;
      } else {
        // Update night temperature (average or min)
        if (dailyForecasts[dayKey].nightTemp === null) {
          dailyForecasts[dayKey].nightTemp = item.main.temp;
        } else {
          // Use the cooler temperature for nighttime
          dailyForecasts[dayKey].nightTemp = Math.min(dailyForecasts[dayKey].nightTemp, item.main.temp);
        }
        dailyForecasts[dayKey].nightCount++;
      }
      
      // Try to use noon forecast for weather icon
      if (hour === 12 || (hour >= 11 && hour <= 13)) {
        dailyForecasts[dayKey].noonForecast = item;
      }
    }
  });
  
  // Create array of forecast items with the processed data
  const forecastItems = Object.values(dailyForecasts)
    .map(forecast => {
      // Use noon forecast for weather condition if available
      const weatherData = forecast.noonForecast ? forecast.noonForecast : {
        dt: forecast.dt,
        main: {
          temp_min: forecast.nightTemp !== null ? forecast.nightTemp : forecast.dayTemp - 5,
          temp_max: forecast.dayTemp !== null ? forecast.dayTemp : forecast.nightTemp + 5
        },
        weather: forecast.weather
      };
      
      // Make sure we have distinct day and night temperatures
      if (weatherData.main.temp_min === weatherData.main.temp_max) {
        weatherData.main.temp_min = weatherData.main.temp_max - 5;
      }
      
      return {
        ...weatherData,
        day: forecast.day
      };
    })
    .slice(0, 5); // Take only the next 5 days

  return (
    <ForecastContainer>
      <ForecastHeader>
        <ForecastTitle>5-Day Forecast</ForecastTitle>
      </ForecastHeader>
      <ForecastGrid>
        {forecastItems.map((item, index) => (
          <ForecastItem key={index} data={item} />
        ))}
      </ForecastGrid>
    </ForecastContainer>
  );
};

export default ForecastList;
