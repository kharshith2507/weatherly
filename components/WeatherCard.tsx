"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { CurrentWeather, TemperatureUnit, WeatherTheme } from "@/types/weather";
import { formatDate, formatTime, formatTemperatureValue, getWeatherIconUrl, capitalizeWords } from "@/lib/weather";
import { getTheme } from "@/lib/theme";
import AnimatedCounter from "@/components/AnimatedCounter";

interface WeatherCardProps {
  weather: CurrentWeather;
  unit: TemperatureUnit;
  theme: WeatherTheme;
}

/* Gradient accent per theme for the big temperature */
const tempGradient: Record<WeatherTheme,string> = {
  sunny:        "from-amber-800 to-amber-600",
  cloudy:       "from-slate-700 to-slate-500",
  rainy:        "from-blue-900 to-blue-600",
  thunderstorm: "from-violet-100 to-violet-300",
  snowy:        "from-sky-800 to-sky-500",
  night:        "from-indigo-100 to-indigo-300",
  default:      "from-slate-800 to-indigo-600",
};

export default function WeatherCard({ weather, unit, theme }: WeatherCardProps) {
  const tk  = getTheme(theme);
  const ref = useRef<HTMLDivElement>(null);

  /* Cursor spotlight */
  const onMouseMove = (e:React.MouseEvent<HTMLDivElement>)=>{
    if(!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX-r.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY-r.top}px`);
  };

  /* 3-D tilt */
  const onMouseMoveCard = (e:React.MouseEvent<HTMLDivElement>)=>{
    if(!ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    const x  = (e.clientX-r.left)/r.width -0.5;
    const y  = (e.clientY-r.top)/r.height-0.5;
    ref.current.style.transform = `perspective(1000px) rotateX(${-y*4}deg) rotateY(${x*4}deg) translateZ(2px)`;
  };
  const onMouseLeave = ()=>{
    if(!ref.current) return;
    ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  };

  const tempVal   = formatTemperatureValue(weather.main.temp, unit);
  const feelsVal  = formatTemperatureValue(weather.main.feels_like, unit);
  const unitSym   = unit==="fahrenheit"?"°F":"°C";
  const grad      = tempGradient[theme];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:32, scale:0.97 }}
      animate={{ opacity:1, y:0, scale:1 }}
      transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
      onMouseMove={(e)=>{ onMouseMove(e); onMouseMoveCard(e); }}
      onMouseLeave={onMouseLeave}
      style={{ transition:"transform 0.25s ease", willChange:"transform" }}
      className={`spotlight ${tk.glass} p-7 md:p-10 shadow-glass-md`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

        {/* ── Left ── */}
        <div className="flex-1 min-w-0">

          {/* Location row */}
          <motion.div
            initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.1, duration:0.45, ease:[0.16,1,0.3,1] }}
            className="flex items-center gap-2 mb-1"
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${tk.accentBg}`}>
              <MapPin className={`h-3.5 w-3.5 ${tk.accent}`} aria-hidden="true"/>
            </div>
            <h1 className={`text-base font-bold tracking-tight ${tk.text1}`}
                aria-label={`Weather for ${weather.name}, ${weather.sys.country}`}>
              {weather.name}
              <span className={`ml-2 text-xs font-mono font-medium ${tk.text3}`}>
                {weather.sys.country}
              </span>
            </h1>
          </motion.div>

          {/* Date */}
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:0.15 }}
            className={`text-sm mb-8 ml-8 ${tk.text3} font-medium`}
          >
            {formatDate(weather.dt)}
          </motion.p>

          {/* Temperature — giant gradient text */}
          <motion.div
            initial={{ opacity:0, y:16, scale:0.92 }}
            animate={{ opacity:1, y:0, scale:1 }}
            transition={{ delay:0.2, duration:0.6, ease:[0.16,1,0.3,1] }}
            className="flex items-start"
            aria-label={`Temperature: ${tempVal}${unitSym}`}
          >
            <span className={`text-[88px] md:text-[110px] font-black tracking-tighter leading-none
                             bg-gradient-to-b ${grad} bg-clip-text text-transparent tabular select-none`}>
              <AnimatedCounter value={tempVal}/>
            </span>
            <span className={`text-3xl md:text-4xl font-light mt-4 ml-1 ${tk.text2}`}>
              {unitSym}
            </span>
          </motion.div>

          {/* Feels like + condition */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:0.3 }}
            className="mt-3 flex flex-wrap items-center gap-3"
          >
            <p className={`text-sm font-medium ${tk.text2}`}>
              Feels like{" "}
              <span className={`font-bold ${tk.text1}`}>{feelsVal}{unitSym}</span>
            </p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${tk.badgeBg}`}>
              {capitalizeWords(weather.weather[0].description)}
            </span>
          </motion.div>
        </div>

        {/* ── Right ── */}
        <motion.div
          initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.2, duration:0.55, ease:[0.16,1,0.3,1] }}
          className="flex flex-row sm:flex-col items-center gap-4 flex-shrink-0"
        >
          {/* Weather icon with float + glow */}
          <div className="relative">
            <motion.div
              animate={{ y:[0,-10,0] }}
              transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
              className="relative z-10 drop-shadow-2xl"
            >
              <Image
                src={getWeatherIconUrl(weather.weather[0].icon,"4x")}
                alt={weather.weather[0].description}
                width={130} height={130} priority
              />
            </motion.div>
            {/* Icon glow */}
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-40 scale-75
                            ${tk.isDark?"bg-indigo-400":"bg-amber-300"}`}
                 aria-hidden="true"/>
          </div>

          {/* Time chip */}
          <div className={`${tk.timeBg} border ${tk.isDark?"border-white/10":"border-white/60"}
                          rounded-2xl px-4 py-2.5 text-center min-w-[100px]`}>
            <p className={`text-2xs font-semibold uppercase tracking-[0.1em] mb-0.5 ${tk.text3}`}>
              Local time
            </p>
            <p className={`text-sm font-bold tabular ${tk.text1}`}>
              {formatTime(weather.dt, weather.timezone)}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
