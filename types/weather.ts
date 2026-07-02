export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface CurrentWeather {
  coord: Coord;
  weather: WeatherCondition[];
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeather;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  dt_txt: string;
}

export interface ForecastData {
  cod: string;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export type TemperatureUnit = "celsius" | "fahrenheit";

export type WeatherTheme =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "thunderstorm"
  | "snowy"
  | "night"
  | "default";

export interface DailyForecast {
  date: string;
  dateLabel: string;
  tempMin: number;
  tempMax: number;
  weather: WeatherCondition;
  pop: number;
}

export interface HourlyForecastItem {
  time: string;
  temp: number;
  weather: WeatherCondition;
  pop: number;
}

export interface RecentSearch {
  city: string;
  country: string;
  timestamp: number;
}
