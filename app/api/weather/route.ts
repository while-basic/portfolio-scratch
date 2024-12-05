import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  if (!location) {
    return NextResponse.json(
      { error: 'Location parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Replace with your actual weather API key and endpoint
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no`
    );

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();

    // Transform the API response to match our interface
    const weatherData = {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
