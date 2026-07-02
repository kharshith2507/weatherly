"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import WeatherDetails from "@/components/WeatherDetails";
import HourlyForecast from "@/components/HourlyForecast";
import ForecastCard from "@/components/ForecastCard";
import Background from "@/components/Background";
import Skeleton from "@/components/Skeleton";
import Footer from "@/components/Footer";
import ErrorDisplay from "@/components/ErrorDisplay";
import Welcome from "@/components/Welcome";
import { useWeather } from "@/hooks/useWeather";
import { useGeolocation } from "@/hooks/useGeolocation";
import { getWeatherTheme } from "@/lib/weather";
import type { TemperatureUnit } from "@/types/weather";

/* Stagger wrapper for weather sections */
const stagger = {
  hidden: {},
  show: { transition:{ staggerChildren:0.08, delayChildren:0.05 } },
};
const fadeUp = {
  hidden:{ opacity:0, y:22 },
  show:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.16,1,0.3,1] } },
};

export default function Home() {
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");
  const { current, forecast, loading, error, fetchByCity, fetchByCoords, clearError } = useWeather();

  const handleCoords = useCallback(
    (lat:number, lon:number) => fetchByCoords(lat,lon),
    [fetchByCoords]
  );
  const { loading:geoLoading, getCurrentLocation } = useGeolocation(handleCoords);

  const theme  = current ? getWeatherTheme(current) : "default";
  const toggleUnit = () => setUnit(u=> u==="celsius"?"fahrenheit":"celsius");

  return (
    <>
      <Background theme={theme} />

      <div className="min-h-screen flex flex-col">
        <Navbar unit={unit} onUnitToggle={toggleUnit} theme={theme} />

        <main className="flex-1 mx-auto w-full max-w-5xl px-4 pb-6">

          {/* Search — always visible */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
            className="mt-5 mb-6"
          >
            <SearchBar
              onSearch={fetchByCity}
              onLocationSearch={getCurrentLocation}
              locationLoading={geoLoading}
              theme={theme}
            />
          </motion.div>

          {/* ── Content area ── */}
          <AnimatePresence mode="wait">

            {loading && (
              <motion.div key="skeleton"
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                <Skeleton />
              </motion.div>
            )}

            {!loading && error && (
              <motion.div key="error"
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                className="mt-10">
                <ErrorDisplay message={error} onRetry={clearError} theme={theme} />
              </motion.div>
            )}

            {!loading && !error && !current && (
              <Welcome key="welcome"
                onSearch={fetchByCity}
                onLocationSearch={getCurrentLocation} />
            )}

            {!loading && !error && current && forecast && (
              <motion.div
                key={`weather-${current.id}`}
                variants={stagger} initial="hidden" animate="show"
                exit={{ opacity:0, transition:{ duration:0.2 } }}
                className="space-y-4"
              >
                <motion.div variants={fadeUp}>
                  <WeatherCard weather={current} unit={unit} theme={theme} />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <WeatherDetails weather={current} theme={theme} />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <HourlyForecast forecast={forecast} unit={unit} theme={theme} />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <ForecastCard forecast={forecast} unit={unit} theme={theme} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer theme={theme} />
      </div>
    </>
  );
}
