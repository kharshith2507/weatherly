# Weatherly 🌤️

A production-ready, real-time weather application built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

![Weatherly](https://via.placeholder.com/1200x630/e0eafc/3b82f6?text=Weatherly+—+Real-Time+Weather)

---

## Features

- **Current weather** — temperature, feels like, description, icon, local time
- **Weather details** — humidity, pressure, visibility, wind speed & direction, cloud cover, sunrise/sunset
- **Hourly forecast** — next 24 hours with precipitation probability
- **7-day forecast** — daily high/low range bars with rain probability
- **Geolocation** — one-click current location weather
- **Recent searches** — last 5 cities stored in localStorage
- **Unit toggle** — switch between °C and °F with animated counter
- **Dynamic backgrounds** — theme changes based on weather (sunny, cloudy, rainy, thunderstorm, snowy, night)
- **Loading skeletons** — smooth content placeholders while fetching
- **Error handling** — city not found, network errors, API key issues
- **Glassmorphism UI** — premium frosted-glass cards with backdrop blur
- **Animated blobs** — floating background shapes per weather theme
- **Responsive** — mobile, tablet, desktop
- **Accessible** — ARIA labels, keyboard navigation, focus management

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

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/weatherly.git
cd weatherly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get an OpenWeatherMap API key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click **Sign Up** (free account)
3. After signing in, go to **My API Keys** under your profile
4. Copy your default API key (or create a new one named `weatherly`)
5. **Note:** New keys can take up to 2 hours to activate

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and replace the placeholder:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | ✅ Yes |

---

## Project Structure

```
weatherly/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page — orchestrates all components
│   ├── loading.tsx         # Route-level loading UI
│   ├── error.tsx           # Route-level error boundary
│   └── globals.css         # Global styles, Tailwind directives, CSS vars
│
├── components/
│   ├── Navbar.tsx          # Top nav with logo and °C/°F toggle
│   ├── SearchBar.tsx       # Search input with recent searches dropdown
│   ├── WeatherCard.tsx     # Main current weather display
│   ├── WeatherDetails.tsx  # Grid of detail stats (humidity, wind, etc.)
│   ├── HourlyForecast.tsx  # Horizontal scroll of hourly cards
│   ├── ForecastCard.tsx    # 7-day forecast with temperature range bars
│   ├── Background.tsx      # Animated gradient + floating blobs
│   ├── AnimatedCounter.tsx # RAF-based number animation for temperature
│   ├── Loader.tsx          # Spinner component
│   ├── Skeleton.tsx        # Shimmer loading skeleton layout
│   ├── ErrorDisplay.tsx    # Contextual error messages
│   ├── Welcome.tsx         # Empty state with example cities
│   └── Footer.tsx          # Attribution footer
│
├── hooks/
│   ├── useWeather.ts       # Fetches current + forecast, manages state
│   └── useGeolocation.ts   # Browser geolocation with error handling
│
├── lib/
│   ├── api.ts              # OpenWeatherMap API calls
│   ├── weather.ts          # Data formatting & transformation helpers
│   └── utils.ts            # cn(), localStorage, debounce, formatRelativeTime
│
├── types/
│   └── weather.ts          # Full TypeScript types for OWM API responses
│
├── .env.example            # Template for environment variables
├── next.config.ts          # Next.js config (image remote patterns)
├── tailwind.config.ts      # Custom animations, colors, shadows
├── tsconfig.json           # Strict TypeScript config
└── README.md
```

---

## Build for Production

```bash
npm run build
npm start
```

---

## Weather Themes

The background and glass card colors change dynamically based on the current weather condition:

| Condition | Theme | Colors |
|---|---|---|
| Clear sky (day) | Sunny | Amber → Yellow → Orange |
| Clouds | Cloudy | Slate → Gray → Blue-gray |
| Rain / Drizzle | Rainy | Blue → Sky → Indigo |
| Thunderstorm | Thunderstorm | Violet → Purple → Fuchsia |
| Snow | Snowy | Sky → Blue → Slate |
| Night (after sunset) | Night | Indigo-950 → Blue-950 → Slate-900 |

---

## API Usage

This app uses two OpenWeatherMap free-tier endpoints:

- `GET /data/2.5/weather` — Current weather by city name or coordinates
- `GET /data/2.5/forecast` — 5-day / 3-hour forecast (40 intervals)

Responses are cached by Next.js for 5 minutes (`revalidate: 300`).

---

## Screenshots

> Add screenshots here after running the app locally.

| Welcome | Sunny Day | Night Mode |
|---|---|---|
| *(search screen)* | *(clear sky theme)* | *(dark indigo theme)* |

---

## License

MIT — free to use and modify.
