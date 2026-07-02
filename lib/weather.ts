import type {
  CurrentWeather,
  ForecastData,
  WeatherTheme,
  DailyForecast,
  HourlyForecastItem,
  TemperatureUnit,
} from "@/types/weather";

// ── Theme ─────────────────────────────────────────────────────────────────────
export function getWeatherTheme(weather: CurrentWeather): WeatherTheme {
  const now = Date.now() / 1000;
  const isNight = now < weather.sys.sunrise || now > weather.sys.sunset;
  if (isNight) return "night";

  const id = weather.weather[0].id;
  if (id >= 200 && id < 300) return "thunderstorm";
  if (id >= 300 && id < 600) return "rainy";
  if (id >= 600 && id < 700) return "snowy";
  if (id === 800) return "sunny";
  if (id > 800) return "cloudy";
  return "default";
}

// ── Temperature ───────────────────────────────────────────────────────────────
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function formatTemperatureValue(
  celsius: number,
  unit: TemperatureUnit
): number {
  return Math.round(unit === "fahrenheit" ? celsiusToFahrenheit(celsius) : celsius);
}

export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit
): string {
  const val = formatTemperatureValue(celsius, unit);
  return `${val}°${unit === "fahrenheit" ? "F" : "C"}`;
}

// ── Time helpers ──────────────────────────────────────────────────────────────
export function formatTime(unixTimestamp: number, timezone: number): string {
  // timezone is offset in seconds; convert to local time
  const date = new Date((unixTimestamp + timezone) * 1000);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m} ${ampm}`;
}

export function formatDate(unixTimestamp: number): string {
  return new Date(unixTimestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDayShort(unixTimestamp: number): string {
  return new Date(unixTimestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export function formatDateShort(unixTimestamp: number): string {
  return new Date(unixTimestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatHour(dtTxt: string, timezone: number): string {
  // dtTxt is UTC e.g. "2024-01-15 12:00:00"
  const utcMs = new Date(dtTxt.replace(" ", "T") + "Z").getTime();
  const localDate = new Date(utcMs + timezone * 1000);
  const h = localDate.getUTCHours();
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12} ${ampm}`;
}

// ── Wind ──────────────────────────────────────────────────────────────────────
export function getWindDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

// ── Visibility ────────────────────────────────────────────────────────────────
export function metersToKm(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`;
}

// ── Icon URL ──────────────────────────────────────────────────────────────────
export function getWeatherIconUrl(icon: string, size: "2x" | "4x" = "2x"): string {
  return `https://openweathermap.org/img/wn/${icon}@${size}.png`;
}

// ── Capitalise ────────────────────────────────────────────────────────────────
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Forecast parsing ──────────────────────────────────────────────────────────
export function getDailyForecasts(forecast: ForecastData): DailyForecast[] {
  const dailyMap = new Map<string, DailyForecast>();

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    const existing = dailyMap.get(date);

    if (!existing) {
      dailyMap.set(date, {
        date,
        dateLabel: `${formatDayShort(item.dt)}, ${formatDateShort(item.dt)}`,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        weather: item.weather[0],
        pop: item.pop,
      });
    } else {
      existing.tempMin = Math.min(existing.tempMin, item.main.temp_min);
      existing.tempMax = Math.max(existing.tempMax, item.main.temp_max);
      if (item.pop > existing.pop) {
        existing.pop = item.pop;
        existing.weather = item.weather[0];
      }
    }
  });

  return Array.from(dailyMap.values()).slice(0, 7);
}

export function getHourlyForecasts(forecast: ForecastData): HourlyForecastItem[] {
  return forecast.list.slice(0, 8).map((item) => ({
    time: formatHour(item.dt_txt, forecast.city.timezone),
    temp: item.main.temp,
    weather: item.weather[0],
    pop: item.pop,
  }));
}
