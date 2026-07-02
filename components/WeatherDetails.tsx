"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Droplets, Gauge, Eye, Wind, Cloud, Sunrise, Sunset } from "lucide-react";
import type { CurrentWeather, WeatherTheme } from "@/types/weather";
import { formatTime, metersToKm, getWindDirection } from "@/lib/weather";
import { getTheme } from "@/lib/theme";

/* ── Gradient combos for each detail icon ── */
const iconGradients = [
  "from-blue-400 to-cyan-400",
  "from-slate-400 to-slate-600",
  "from-emerald-400 to-teal-400",
  "from-indigo-400 to-blue-400",
  "from-slate-300 to-blue-300",
  "from-amber-400 to-orange-400",
  "from-orange-400 to-rose-400",
];

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  gradient: string;
  delay: number;
  isDark: boolean;
  text1: string;
  text2: string;
  text3: string;
}

function DetailCard({ icon, label, value, sub, gradient, delay, isDark, text1, text2, text3 }: DetailCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e:React.MouseEvent<HTMLDivElement>)=>{
    if(!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x",`${e.clientX-r.left}px`);
    ref.current.style.setProperty("--mouse-y",`${e.clientY-r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:20, scale:0.95 }}
      animate={{ opacity:1, y:0, scale:1 }}
      transition={{ duration:0.45, delay, ease:[0.16,1,0.3,1] }}
      onMouseMove={onMove}
      className={`spotlight glass-hover ${isDark?"glass-dark-inner":"glass-inner"}
                  p-4 flex flex-col gap-3 cursor-default select-none`}
    >
      {/* Gradient icon container */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                      bg-gradient-to-br ${gradient} shadow-sm flex-shrink-0`}
           aria-hidden="true">
        {icon}
      </div>

      <div>
        <p className={`text-2xs font-semibold uppercase tracking-[0.09em] mb-1 ${text3}`}>
          {label}
        </p>
        <p className={`text-lg font-bold leading-none ${text1}`}>{value}</p>
        {sub && <p className={`text-xs mt-1 ${text2} font-medium`}>{sub}</p>}
      </div>
    </motion.div>
  );
}

interface WeatherDetailsProps {
  weather: CurrentWeather;
  theme: WeatherTheme;
}

export default function WeatherDetails({ weather, theme }: WeatherDetailsProps) {
  const tk = getTheme(theme);
  const windKmh = Math.round(weather.wind.speed*3.6);
  const gustKmh = weather.wind.gust ? Math.round(weather.wind.gust*3.6) : null;

  const details = [
    {
      icon:<Droplets className="w-4.5 h-4.5 text-white"/>,
      label:"Humidity", value:`${weather.main.humidity}%`,
      sub: weather.main.humidity>70?"High humidity":weather.main.humidity<30?"Very dry":"Comfortable",
    },
    {
      icon:<Gauge className="w-4.5 h-4.5 text-white"/>,
      label:"Pressure", value:`${weather.main.pressure} hPa`,
      sub: weather.main.pressure>1013?"High":"Low",
    },
    {
      icon:<Eye className="w-4.5 h-4.5 text-white"/>,
      label:"Visibility", value:metersToKm(weather.visibility),
      sub: weather.visibility>=8000?"Crystal clear":weather.visibility>=4000?"Moderate":"Poor",
    },
    {
      icon:<Wind className="w-4.5 h-4.5 text-white"/>,
      label:"Wind", value:`${windKmh} km/h`,
      sub: `${getWindDirection(weather.wind.deg)}${gustKmh?` · Gusts ${gustKmh} km/h`:""}`,
    },
    {
      icon:<Cloud className="w-4.5 h-4.5 text-white"/>,
      label:"Cloud Cover", value:`${weather.clouds.all}%`,
      sub: weather.clouds.all<20?"Clear sky":weather.clouds.all<60?"Partly cloudy":"Overcast",
    },
    {
      icon:<Sunrise className="w-4.5 h-4.5 text-white"/>,
      label:"Sunrise", value:formatTime(weather.sys.sunrise,weather.timezone),
      sub:"Local time",
    },
    {
      icon:<Sunset className="w-4.5 h-4.5 text-white"/>,
      label:"Sunset", value:formatTime(weather.sys.sunset,weather.timezone),
      sub:"Local time",
    },
  ];

  return (
    <section aria-label="Weather details">
      <motion.p
        initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
        className={`text-2xs font-semibold uppercase tracking-[0.1em] mb-3 ${tk.sectionLabel}`}
      >
        Details
      </motion.p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {details.map((d,i)=>(
          <DetailCard
            key={d.label}
            {...d}
            gradient={iconGradients[i]}
            delay={i*0.055}
            isDark={tk.isDark}
            text1={tk.text1}
            text2={tk.text2}
            text3={tk.text3}
          />
        ))}
      </div>
    </section>
  );
}
