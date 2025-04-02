import React from 'react';
import styled from 'styled-components';
import CurrentWeather from './CurrentWeather';
import ForecastList from './ForecastList';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WeatherDashboard = ({ weatherData }) => {
  if (!weatherData) return null;
  
  const { current, forecast } = weatherData;
  
  return (
    <DashboardContainer>
      <CurrentWeather data={current} />
      <ForecastList forecast={forecast} />
    </DashboardContainer>
  );
};

export default WeatherDashboard;
