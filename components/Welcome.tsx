"use client";

import { motion } from "framer-motion";
import { Search, Navigation, Sparkles } from "lucide-react";

const CITIES = ["New York", "London", "Tokyo", "Sydney", "Dubai", "Paris"];

interface WelcomeProps {
  onSearch: (city:string)=>void;
  onLocationSearch: ()=>void;
}

const container = {
  hidden: {},
  show: { transition:{ staggerChildren:0.08 } }
};
const item = {
  hidden:{ opacity:0, y:18 },
  show:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.16,1,0.3,1] } }
};

export default function Welcome({ onSearch, onLocationSearch }: WelcomeProps) {
  return (
    <motion.div
      variants={container} initial="hidden" animate="show"
      exit={{ opacity:0, y:-10, transition:{ duration:0.25 } }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      {/* Hero icon cluster */}
      <motion.div variants={item} className="mb-8">
        <div className="relative w-24 h-24 mx-auto">
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-indigo-400/20 blur-2xl scale-150"/>
          {/* Icon */}
          <div className="relative w-24 h-24 rounded-[28px] glass flex items-center justify-center shadow-glass-md">
            <span className="text-5xl select-none">🌤️</span>
          </div>
          {/* Orbiting badge */}
          <motion.div
            animate={{ rotate:360 }}
            transition={{ duration:12, repeat:Infinity, ease:"linear" }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full glass flex items-center justify-center shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400"/>
          </motion.div>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1 variants={item}
        className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 mb-3 text-balance">
        What&apos;s the weather<br/>
        <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
          like today?
        </span>
      </motion.h1>

      <motion.p variants={item} className="text-slate-500 text-base mb-10 max-w-sm text-balance">
        Search any city worldwide or tap <em>Near me</em> for instant local weather.
      </motion.p>

      {/* City pills */}
      <motion.div variants={item} className="flex flex-col items-center gap-3 w-full">
        <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          Popular cities
        </p>
        <div className="flex flex-wrap gap-2 justify-center max-w-md">
          {CITIES.map(city=>(
            <motion.button
              key={city}
              onClick={()=>onSearch(city)}
              whileHover={{ scale:1.05, y:-2 }}
              whileTap={{ scale:0.97 }}
              className="glass-pill glass-hover flex items-center gap-2 px-4 py-2
                         text-sm font-semibold text-slate-700 shadow-glass
                         focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" aria-hidden="true"/>
              {city}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Location CTA */}
      <motion.div variants={item} className="mt-8">
        <motion.button
          onClick={onLocationSearch}
          whileHover={{ scale:1.04 }}
          whileTap={{ scale:0.97 }}
          className="flex items-center gap-2.5 px-6 py-3 rounded-2xl
                     bg-slate-800 text-white text-sm font-semibold shadow-glass-md
                     hover:bg-slate-700 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-slate-400/50"
        >
          <Navigation className="w-4 h-4"/>
          Use my location
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
