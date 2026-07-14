"use client";

import { motion } from "framer-motion";
import type { WeatherTheme } from "@/types/weather";
import { getTheme } from "@/lib/theme";

export default function Footer({ theme }:{ theme:WeatherTheme }) {
  const tk = getTheme(theme);
  return (
    <motion.footer
      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
      className={`mt-10 pb-6 text-center text-2xs font-medium ${tk.text3}`}
    >
      Powered by{" "}
      <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer"
         className={`underline-offset-2 hover:underline ${tk.accent}`}>
        OpenWeatherMap
      </a>
      {" "}· Weatherly © {new Date().getFullYear()}
      {" "}·{" "}
      <a href="https://github.com/kharshith2507" target="_blank" rel="noopener noreferrer"
         className={`underline-offset-2 hover:underline ${tk.accent}`}>
        GitHub
      </a>
    </motion.footer>
  );
}
