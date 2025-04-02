// Mock data for demonstration purposes (as fallback)
export const getMockCurrentWeather = (cityName) => {
  return {
    name: cityName,
    main: {
      temp: 22,
      humidity: 65,
      feels_like: 23,
      pressure: 1012
    },
    weather: [
      {
        main: 'Clear',
        description: 'clear sky'
      }
    ],
    wind: {
      speed: 3.5
    },
    sys: {
      country: 'Demo'
    }
  };
};

export const getMockForecastData = (cityName) => {
  const weatherConditions = ['Clear', 'Clouds', 'Rain', 'Thunderstorm', 'Snow'];
  const descriptions = ['clear sky', 'scattered clouds', 'light rain', 'thunderstorm', 'light snow'];
  
  const list = [];
  const now = new Date();
  
  for (let i = 0; i < 40; i++) {
    // Create a timestamp for every 3 hours over the next 5 days
    const date = new Date(now);
    date.setHours(date.getHours() + (i * 3));
    
    const conditionIndex = Math.floor(Math.random() * weatherConditions.length);
    const hour = date.getHours();
    
    // Generate different temperatures based on time of day
    // Daytime (8am-8pm): warmer, Nighttime (8pm-8am): cooler
    const isDaytime = hour >= 8 && hour <= 20;
    const baseTemp = isDaytime ? 
      (Math.floor(Math.random() * 8) + 18) : // 18-25°C during day
      (Math.floor(Math.random() * 8) + 10);  // 10-17°C during night
    
    list.push({
      dt: Math.floor(date.getTime() / 1000),
      main: {
        temp: baseTemp,
        temp_min: baseTemp - (isDaytime ? 0 : 2), // Slightly cooler at night
        temp_max: baseTemp + (isDaytime ? 2 : 0), // Slightly warmer during day
        humidity: Math.floor(Math.random() * 30) + 50
      },
      weather: [
        {
          main: weatherConditions[conditionIndex],
          description: descriptions[conditionIndex]
        }
      ],
      dt_txt: date.toISOString()
    });
  }
  
  return { list };
};
