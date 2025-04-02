/**
 * Maps OpenWeather weather conditions to appropriate emojis
 * @param {string} condition - The weather condition from OpenWeather API
 * @returns {string} - The emoji representing the weather condition
 */
export const getWeatherEmoji = (condition) => {
  const weatherEmojis = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Partly Cloudy': '⛅',
    'Scattered Clouds': '🌤️',
    'Broken Clouds': '🌥️',
    'Rain': '🌧️',
    'Light Rain': '🌦️',
    'Shower Rain': '🌧️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Light Snow': '🌨️',
    'Heavy Snow': '❄️❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
    'Smoke': '🌫️',
    'Dust': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '💨',
    'Tornado': '🌪️',
    'Drizzle': '🌧️',
    'Sleet': '🌨️',
  };

  // Handle different variations of cloud conditions
  if (condition.includes('cloud') || condition.includes('Cloud')) {
    if (condition.includes('scattered') || condition.includes('Scattered')) {
      return weatherEmojis['Scattered Clouds'];
    } else if (condition.includes('broken') || condition.includes('Broken')) {
      return weatherEmojis['Broken Clouds'];
    } else if (condition.includes('few') || condition.includes('Few')) {
      return weatherEmojis['Partly Cloudy'];
    } else {
      return weatherEmojis['Clouds'];
    }
  }

  // Handle different variations of rain conditions
  if (condition.includes('rain') || condition.includes('Rain')) {
    if (condition.includes('light') || condition.includes('Light')) {
      return weatherEmojis['Light Rain'];
    } else if (condition.includes('shower') || condition.includes('Shower')) {
      return weatherEmojis['Shower Rain'];
    } else {
      return weatherEmojis['Rain'];
    }
  }

  // Handle different variations of snow conditions
  if (condition.includes('snow') || condition.includes('Snow')) {
    if (condition.includes('light') || condition.includes('Light')) {
      return weatherEmojis['Light Snow'];
    } else if (condition.includes('heavy') || condition.includes('Heavy')) {
      return weatherEmojis['Heavy Snow'];
    } else {
      return weatherEmojis['Snow'];
    }
  }

  // Return the emoji if it exists, otherwise return a default emoji
  return weatherEmojis[condition] || '🌈';
};
