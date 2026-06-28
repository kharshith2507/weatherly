"use client";

import { motion } from "framer-motion";
import { CloudSun } from "lucide-react";
import type { TemperatureUnit, WeatherTheme } from "@/types/weather";
import { getTheme } from "@/lib/theme";

interface NavbarProps {
  unit: TemperatureUnit;
  onUnitToggle: () => void;
  theme: WeatherTheme;
}

export default function Navbar({ unit, onUnitToggle, theme }: NavbarProps) {
  const tk = getTheme(theme);

  return (
    <motion.header
      initial={{ opacity:0, y:-20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
      className="sticky top-0 z-50 w-full px-4 pt-4"
    >
      <nav className={`${tk.glass} mx-auto max-w-5xl flex items-center justify-between px-5 py-3.5`}
           aria-label="Main navigation">

        {/* ── Logo ── */}
        <div className="flex items-center gap-2.5">
          <motion.div
            animate={{ rotate:[0,-8,8,-4,0] }}
            transition={{ duration:5, repeat:Infinity, ease:"easeInOut", delay:2 }}
          >
            <CloudSun className={`h-6 w-6 ${tk.accent}`} aria-hidden="true" />
          </motion.div>
          <span className={`text-[17px] font-bold tracking-tight ${tk.text1}`}>
            Weatherly
          </span>
        </div>

        {/* ── °C / °F toggle ── */}
        <button
          onClick={onUnitToggle}
          aria-label={`Switch to ${unit==="celsius"?"Fahrenheit":"Celsius"}`}
          className={`${tk.glassPill} flex items-center p-1 gap-0.5 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-1`}
        >
          {(["celsius","fahrenheit"] as TemperatureUnit[]).map(u=>(
            <motion.span
              key={u}
              className={`min-w-[38px] rounded-full px-2.5 py-1 text-xs font-semibold text-center
                          transition-colors duration-200 select-none
                          ${unit===u
                            ? tk.isDark
                              ? "bg-white/15 text-white"
                              : "bg-white/90 text-slate-800 shadow-sm"
                            : tk.text3
                          }`}
            >
              {u==="celsius"?"°C":"°F"}
            </motion.span>
          ))}
        </button>
      </nav>
    </motion.header>
  );
}
