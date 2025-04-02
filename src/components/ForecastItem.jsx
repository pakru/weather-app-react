import React from 'react';
import styled from 'styled-components';
import { getWeatherEmoji } from '../utils/weatherUtils';

const ForecastCard = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  min-width: 110px;
  flex-shrink: 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Day = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
  font-size: 0.95rem;
`;

const WeatherEmoji = styled.div`
  font-size: 2.2rem;
  margin: 3px 0;
`;

const Temperature = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MaxTemp = styled.span`
  color: #e74c3c;
  margin-right: 5px;
`;

const MinTemp = styled.span`
  color: #3498db;
`;

const TempSeparator = styled.span`
  margin: 0 2px;
  color: #999;
  font-size: 0.9rem;
`;

const Description = styled.div`
  font-size: 0.8rem;
  color: #666;
  text-transform: capitalize;
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const ForecastItem = ({ data }) => {
  if (!data) return null;

  const {
    dt,
    main: { temp_max, temp_min },
    weather,
    day: customDay
  } = data;

  const date = new Date(dt * 1000);
  const day = customDay || date.toLocaleDateString('en-US', { weekday: 'short' });
  const weatherCondition = weather[0].main;
  const description = weather[0].description;
  const emoji = getWeatherEmoji(weatherCondition);

  return (
    <ForecastCard>
      <Day>{day}</Day>
      <WeatherEmoji>{emoji}</WeatherEmoji>
      <Temperature>
        <MaxTemp>{Math.round(temp_max)}°</MaxTemp>
        <TempSeparator>/</TempSeparator>
        <MinTemp>{Math.round(temp_min)}°</MinTemp>
      </Temperature>
      <Description>{description}</Description>
    </ForecastCard>
  );
};

export default ForecastItem;
