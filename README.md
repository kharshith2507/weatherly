# Weatherly 🌤️

Weatherly is a real-time weather application built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. It displays current conditions, hourly and 7-day forecasts, and adapts its visual theme to the current weather.
---

## Features

- Current weather: temperature, feels-like temperature, description, icon, local time
- Weather details: humidity, pressure, visibility, wind speed and direction, cloud cover, sunrise/sunset
- Hourly forecast for the next 24 hours with precipitation probability
- 7-day forecast with daily high/low range bars and rain probability
- Geolocation-based weather lookup
- Recent searches (last 5 cities) stored in localStorage
- Unit toggle between Celsius and Fahrenheit
- Background and card theme changes based on weather condition (sunny, cloudy, rainy, thunderstorm, snowy, night)
- Loading skeletons while data is fetched
- Error handling for city-not-found, network errors, and API key issues
- Responsive layout for mobile, tablet, and desktop
- Keyboard navigation and ARIA labeling

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Weather API | OpenWeatherMap |

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | OpenWeatherMap API key | Yes |

---

## Project Structure

```
weatherly/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page, orchestrates components
│   ├── loading.tsx         # Route-level loading UI
│   ├── error.tsx           # Route-level error boundary
│   └── globals.css         # Global styles, Tailwind directives, CSS vars
│
├── components/
│   ├── Navbar.tsx          # Top nav with logo and unit toggle
│   ├── SearchBar.tsx       # Search input with recent searches dropdown
│   ├── WeatherCard.tsx     # Current weather display
│   ├── WeatherDetails.tsx  # Grid of detail stats
│   ├── HourlyForecast.tsx  # Horizontal scroll of hourly cards
│   ├── ForecastCard.tsx    # 7-day forecast with temperature range bars
│   ├── Background.tsx      # Animated gradient and background shapes
│   ├── AnimatedCounter.tsx # Number animation for temperature
│   ├── Loader.tsx          # Spinner component
│   ├── Skeleton.tsx        # Loading skeleton layout
│   ├── ErrorDisplay.tsx    # Error messages
│   ├── Welcome.tsx         # Empty state with example cities
│   └── Footer.tsx          # Attribution footer
│
├── hooks/
│   ├── useWeather.ts       # Fetches current and forecast data, manages state
│   └── useGeolocation.ts   # Browser geolocation with error handling
│
├── lib/
│   ├── api.ts              # OpenWeatherMap API calls
│   ├── weather.ts          # Data formatting and transformation
│   └── utils.ts            # cn(), localStorage helpers, debounce, formatRelativeTime
│
├── types/
│   └── weather.ts          # TypeScript types for OpenWeatherMap API responses
│
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```
---

## Weather Themes

| Condition | Theme | Colors |
|---|---|---|
| Clear sky (day) | Sunny | Amber, yellow, orange |
| Clouds | Cloudy | Slate, gray, blue-gray |
| Rain / Drizzle | Rainy | Blue, sky, indigo |
| Thunderstorm | Thunderstorm | Violet, purple, fuchsia |
| Snow | Snowy | Sky, blue, slate |
| Night (after sunset) | Night | Indigo-950, blue-950, slate-900 |

---

## API Usage

The app uses two OpenWeatherMap free-tier endpoints:

- `GET /data/2.5/weather` — current weather by city name or coordinates
- `GET /data/2.5/forecast` — 5-day / 3-hour forecast (40 intervals)

Responses are cached by Next.js for 5 minutes (`revalidate: 300`).

---

## License

MIT
