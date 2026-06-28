"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Droplets } from "lucide-react";
import type { ForecastData, TemperatureUnit, WeatherTheme } from "@/types/weather";
import { getDailyForecasts, getWeatherIconUrl, formatTemperatureValue, capitalizeWords } from "@/lib/weather";
import { getTheme } from "@/lib/theme";

interface ForecastCardProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
  theme: WeatherTheme;
}

export default function ForecastCard({ forecast, unit, theme }: ForecastCardProps) {
  const days   = getDailyForecasts(forecast);
  const tk     = getTheme(theme);
  const unitSym = unit==="fahrenheit"?"°F":"°C";

  const allHighs = days.map(d=>formatTemperatureValue(d.tempMax,unit));
  const allLows  = days.map(d=>formatTemperatureValue(d.tempMin,unit));
  const gMax = Math.max(...allHighs);
  const gMin = Math.min(...allLows);
  const range = gMax-gMin || 1;

  return (
    <section aria-label="7-day weather forecast">
      <motion.p
        initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
        className={`text-2xs font-semibold uppercase tracking-[0.1em] mb-3 ${tk.sectionLabel}`}
      >
        7-Day Forecast
      </motion.p>

      <motion.div
        initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.08 }}
        className={`${tk.glass} overflow-hidden shadow-glass`}
        role="list"
      >
        {days.map((day,i)=>{
          const high    = formatTemperatureValue(day.tempMax,unit);
          const low     = formatTemperatureValue(day.tempMin,unit);
          const barLeft = ((low-gMin)/range)*100;
          const barW    = Math.max(((high-low)/range)*100, 8);
          const [dayName, dateStr] = day.dateLabel.split(", ");
          const isToday = i===0;

          return (
            <motion.div
              key={day.date}
              role="listitem"
              initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:i*0.06 }}
              className={`flex items-center gap-3 px-5 py-4 transition-colors ${tk.rowHover} cursor-default
                          ${i!==days.length-1 ? `border-b ${tk.divider}` : ""}`}
            >
              {/* Day */}
              <div className="w-20 flex-shrink-0">
                <p className={`text-sm font-bold ${isToday ? tk.accent : tk.text1}`}>
                  {isToday?"Today":dayName}
                </p>
                {dateStr && <p className={`text-2xs font-medium mt-0.5 ${tk.text3}`}>{dateStr}</p>}
              </div>

              {/* Icon + label */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <motion.div
                  animate={isToday?{y:[0,-3,0]}:{}}
                  transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                >
                  <Image
                    src={getWeatherIconUrl(day.weather.icon)}
                    alt={day.weather.description}
                    width={38} height={38} className="flex-shrink-0"
                  />
                </motion.div>
                <span className={`text-xs font-medium hidden md:block truncate ${tk.text2}`}>
                  {capitalizeWords(day.weather.description)}
                </span>
              </div>

              {/* Rain */}
              {day.pop>0.1 && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Droplets className={`w-3.5 h-3.5 ${tk.dropIcon}`} aria-hidden="true"/>
                  <span className={`text-xs font-semibold ${tk.dropIcon}`}>
                    {Math.round(day.pop*100)}%
                  </span>
                </div>
              )}

              {/* Temp range bar */}
              <div className="flex items-center gap-2.5 flex-shrink-0 w-40">
                <span className={`text-xs font-medium tabular w-11 text-right ${tk.text3}`}>
                  {low}{unitSym}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-black/8 relative overflow-hidden"
                     role="img"
                     aria-label={`Temperature range ${low}${unitSym} to ${high}${unitSym}`}>
                  <motion.div
                    initial={{ width:0 }}
                    animate={{ width:`${barW}%` }}
                    transition={{ delay:i*0.07+0.3, duration:0.6, ease:[0.16,1,0.3,1] }}
                    className={`absolute h-full rounded-full
                                ${tk.isDark
                                  ? "bg-gradient-to-r from-indigo-400 to-violet-400"
                                  : "bg-gradient-to-r from-blue-400 to-amber-400"
                                }`}
                    style={{ left:`${barLeft}%` }}
                  />
                </div>
                <span className={`text-xs font-bold tabular w-11 ${tk.text1}`}>
                  {high}{unitSym}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
