import type { CurrentWeather, ForecastData } from "@/types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error(
      "OpenWeatherMap API key is missing. Add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file."
    );
  }
  return key;
}

export async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  const key = getApiKey();
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`,
    { next: { revalidate: 300 } }
  );

  if (res.status === 404) {
    throw new Error(`City "${city}" not found. Check the spelling and try again.`);
  }
  if (res.status === 401) {
    throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
  }
  if (!res.ok) {
    throw new Error(`Weather API error (${res.status}). Please try again.`);
  }

  return res.json() as Promise<CurrentWeather>;
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  const key = getApiKey();
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch weather for your location (${res.status}).`);
  }

  return res.json() as Promise<CurrentWeather>;
}

export async function fetchForecast(city: string): Promise<ForecastData> {
  const key = getApiKey();
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${key}&units=metric&cnt=40`,
    { next: { revalidate: 300 } }
  );

  if (res.status === 404) {
    throw new Error(`City "${city}" not found.`);
  }
  if (!res.ok) {
    throw new Error(`Forecast API error (${res.status}). Please try again.`);
  }

  return res.json() as Promise<ForecastData>;
}

export async function fetchForecastByCoords(
  lat: number,
  lon: number
): Promise<ForecastData> {
  const key = getApiKey();
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&cnt=40`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch forecast for your location (${res.status}).`);
  }

  return res.json() as Promise<ForecastData>;
}
