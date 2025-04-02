# Weather Dashboard App

A modern React weather dashboard application that displays current weather conditions and a 5-day forecast using the OpenWeather API. The app uses emojis to represent different weather conditions.

## Features

- Search for weather by city name
- Display current weather conditions with emoji icons
- Show 5-day weather forecast
- Responsive design for all device sizes
- Beautiful UI with smooth animations

## Setup Instructions

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Get an API key from [OpenWeather](https://openweathermap.org/api) (free tier is sufficient)
5. Open `src/App.jsx` and replace `YOUR_OPENWEATHER_API_KEY` with your actual API key
6. Start the development server:
   ```
   npm run start
   ```

## Technologies Used

- React
- Vite
- Styled Components
- Axios for API requests
- OpenWeather API

## Project Structure

- `src/components/` - React components
- `src/utils/` - Utility functions and helpers
- `src/App.jsx` - Main application component
- `src/main.jsx` - Application entry point

## API Key Security Note

For production deployment, you should never expose your API key in the frontend code. Instead, use environment variables or a backend proxy to secure your API key.
