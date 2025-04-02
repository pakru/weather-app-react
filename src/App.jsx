import React, { useState } from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import SettingsMenu from './components/SettingsMenu';
import { AppContainer, SettingsButton } from './styles/styles';
import { useWeather } from './hooks/useWeather';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const {
    weatherData,
    loading,
    error,
    city,
    usingMockData,
    getUserLocation,
    handleCityChange
  } = useWeather();

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <AppContainer>      
      <SettingsButton onClick={toggleSettings}>
        ⚙️
      </SettingsButton>
      
      {showSettings && (
        <SettingsMenu 
          onLocationRequest={getUserLocation}
          onCityChange={(cityName) => {
            handleCityChange(cityName);
            setShowSettings(false);
          }}
          currentCity={city}
        />
      )}
      
      {loading && <div className="loading">Loading weather data...</div>}
      {error && <div className="error">{error}</div>}
      {usingMockData && <div className="notification">Using demo data with weather emojis</div>}
      {weatherData && (
        <WeatherDashboard weatherData={weatherData} />
      )}
    </AppContainer>
  );
}

export default App;
