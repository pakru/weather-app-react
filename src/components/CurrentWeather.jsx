import React from 'react';
import styled from 'styled-components';
import { getWeatherEmoji } from '../utils/weatherUtils';

const CurrentWeatherCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
`;

const MainWeatherInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const WeatherIconTemp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
`;

const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CityName = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 5px;
  color: #333;
`;

const WeatherEmoji = styled.div`
  font-size: 4rem;
  margin-bottom: 5px;
`;

const Temperature = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
`;

const WeatherDescription = styled.div`
  font-size: 1.1rem;
  text-transform: capitalize;
  color: #666;
  margin-bottom: 5px;
`;

const WeatherDetails = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-left: auto;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  min-width: 80px;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 5px;
`;

const DetailValue = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`;

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const {
    name,
    main: { temp, humidity, feels_like, pressure },
    weather,
    wind,
    sys
  } = data;

  const weatherCondition = weather[0].main;
  const description = weather[0].description;
  const emoji = getWeatherEmoji(weatherCondition);

  // Format date
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <CurrentWeatherCard>
      <MainWeatherInfo>
        <WeatherIconTemp>
          <WeatherEmoji>{emoji}</WeatherEmoji>
          <Temperature>{Math.round(temp)}°C</Temperature>
        </WeatherIconTemp>
        
        <LocationInfo>
          <CityName>{name}, {sys.country}</CityName>
          <div>{formattedDate}</div>
          <WeatherDescription>{description}</WeatherDescription>
        </LocationInfo>
      </MainWeatherInfo>
      
      <WeatherDetails>
        <DetailItem>
          <DetailLabel>Feels Like</DetailLabel>
          <DetailValue>{Math.round(feels_like)}°C</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{humidity}%</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Wind</DetailLabel>
          <DetailValue>{Math.round(wind.speed)} m/s</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Pressure</DetailLabel>
          <DetailValue>{pressure} hPa</DetailValue>
        </DetailItem>
      </WeatherDetails>
    </CurrentWeatherCard>
  );
};

export default CurrentWeather;
