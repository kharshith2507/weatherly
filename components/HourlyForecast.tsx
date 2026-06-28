"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Droplets } from "lucide-react";
import type { ForecastData, TemperatureUnit, WeatherTheme } from "@/types/weather";
import { getHourlyForecasts, getWeatherIconUrl, formatTemperature } from "@/lib/weather";
import { getTheme } from "@/lib/theme";

interface HourlyForecastProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
  theme: WeatherTheme;
}

export default function HourlyForecast({ forecast, unit, theme }: HourlyForecastProps) {
  const hours = getHourlyForecasts(forecast);
  const tk    = getTheme(theme);

  return (
    <section aria-label="Hourly weather forecast">
      <motion.p
        initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
        className={`text-2xs font-semibold uppercase tracking-[0.1em] mb-3 ${tk.sectionLabel}`}
      >
        Hourly
      </motion.p>

      <motion.div
        initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.08 }}
        className={`${tk.glass} p-4 shadow-glass`}
      >
        <div className="flex gap-2.5 overflow-x-auto pb-0.5 -mx-1 px-1" role="list">
          {hours.map((hour,i)=>{
            const isNow   = i===0;
            const nowCls  = tk.isDark
              ? "bg-white/10 border border-white/15 ring-1 ring-white/10"
              : "bg-white/80 border border-white/90 shadow-glass";
            const restCls = tk.isDark
              ? "hover:bg-white/8 border border-transparent"
              : "hover:bg-white/50 border border-transparent";

            return (
              <motion.div
                key={i}
                role="listitem"
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:i*0.04 }}
                className={`flex flex-col items-center gap-2 flex-shrink-0
                            rounded-2xl px-4 py-3.5 min-w-[78px]
                            transition-all duration-200 cursor-default select-none
                            ${isNow ? nowCls : restCls}`}
              >
                <p className={`text-xs font-semibold ${isNow ? tk.accent : tk.text3}`}>
                  {isNow?"Now":hour.time}
                </p>

                <motion.div
                  animate={isNow ? { y:[0,-4,0] } : {}}
                  transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                >
                  <Image
                    src={getWeatherIconUrl(hour.weather.icon)}
                    alt={hour.weather.description}
                    width={42} height={42}
                    className="drop-shadow"
                  />
                </motion.div>

                <p className={`text-sm font-bold tabular ${tk.text1}`}>
                  {formatTemperature(hour.temp,unit)}
                </p>

                {hour.pop>0.05 && (
                  <div className="flex items-center gap-1">
                    <Droplets className={`w-3 h-3 ${tk.dropIcon}`} aria-hidden="true"/>
                    <span className={`text-2xs font-semibold ${tk.dropIcon}`}>
                      {Math.round(hour.pop*100)}%
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
