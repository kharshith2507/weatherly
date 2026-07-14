import type { CurrentWeather, ForecastData } from "@/types/weather";

// All requests go through our own Next.js API routes (see app/api/weather
// and app/api/forecast). The real OpenWeatherMap key lives only on the
// server (OPENWEATHER_API_KEY) and is never sent to the browser.

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message ?? `Request failed (${res.status}).`);
  }
  return data as T;
}

export async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  return handleResponse<CurrentWeather>(res);
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  return handleResponse<CurrentWeather>(res);
}

export async function fetchForecast(city: string): Promise<ForecastData> {
  const res = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`);
  return handleResponse<ForecastData>(res);
}

export async function fetchForecastByCoords(
  lat: number,
  lon: number
): Promise<ForecastData> {
  const res = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);
  return handleResponse<ForecastData>(res);
}
