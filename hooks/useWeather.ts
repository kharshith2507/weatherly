"use client";

import { useState, useCallback, useRef } from "react";
import type { CurrentWeather, ForecastData } from "@/types/weather";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "@/lib/api";
import { saveRecentSearch } from "@/lib/utils";

interface WeatherState {
  current: CurrentWeather | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    current: null,
    forecast: null,
    loading: false,
    error: null,
  });

  const abortRef = useRef<AbortController | null>(null);

  const fetchByCity = useCallback(async (city: string) => {
    if (!city.trim()) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);

      saveRecentSearch(current.name, current.sys.country);
      setState({ current, forecast, loading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to fetch weather. Please try again.",
        current: null,
        forecast: null,
      }));
    }
  }, []);

  const fetchByCoords = useCallback(async (lat: number, lon: number) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const [current, forecast] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
      ]);

      saveRecentSearch(current.name, current.sys.country);
      setState({ current, forecast, loading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to fetch location weather. Please try again.",
        current: null,
        forecast: null,
      }));
    }
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return { ...state, fetchByCity, fetchByCoords, clearError };
}
