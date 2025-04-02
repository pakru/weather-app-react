import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
  width: 280px;
  z-index: 10;
`;

const SettingsTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const SettingsOption = styled.div`
  margin-bottom: 15px;
`;

const LocationButton = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
  margin-bottom: 10px;

  &:focus {
    border-color: #6e8efb;
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 15px 0;
`;

const SettingsMenu = ({ onLocationRequest, onCityChange, currentCity }) => {
  const [cityInput, setCityInput] = useState(currentCity || '');

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onCityChange(cityInput);
    }
  };

  return (
    <SettingsContainer>
      <SettingsTitle>Weather Settings</SettingsTitle>
      
      <SettingsOption>
        <LocationButton onClick={onLocationRequest}>
          📍 Use My Current Location
        </LocationButton>
      </SettingsOption>
      
      <Divider />
      
      <SettingsOption>
        <form onSubmit={handleCitySubmit}>
          <SearchInput
            type="text"
            placeholder="Enter city name..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <SearchButton type="submit">
            Search City
          </SearchButton>
        </form>
      </SettingsOption>
    </SettingsContainer>
  );
};

export default SettingsMenu;
