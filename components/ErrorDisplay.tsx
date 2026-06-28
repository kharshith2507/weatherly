"use client";

import { motion } from "framer-motion";
import { MapPinOff, WifiOff, AlertTriangle, RotateCcw } from "lucide-react";
import type { WeatherTheme } from "@/types/weather";
import { getTheme } from "@/lib/theme";

interface ErrorDisplayProps {
  message: string;
  onRetry?: ()=>void;
  theme: WeatherTheme;
}

function classify(msg:string){ 
  const m = msg.toLowerCase();
  if(m.includes("not found")||m.includes("404"))
    return { icon:MapPinOff, emoji:"🗺️", title:"City not found",   accent:"text-amber-500",  bg:"bg-amber-50",   border:"border-amber-200/60" };
  if(m.includes("network")||m.includes("fetch")||m.includes("failed to fetch"))
    return { icon:WifiOff,   emoji:"📡", title:"Connection error",  accent:"text-red-500",    bg:"bg-red-50",     border:"border-red-200/60" };
  return   { icon:AlertTriangle, emoji:"⚠️",title:"Something went wrong", accent:"text-slate-500", bg:"bg-slate-50", border:"border-slate-200/60" };
}

export default function ErrorDisplay({ message, onRetry, theme }: ErrorDisplayProps) {
  const tk  = getTheme(theme);
  const cls = classify(message);

  return (
    <motion.div
      initial={{ opacity:0, scale:0.94, y:16 }}
      animate={{ opacity:1, scale:1,    y:0  }}
      exit={{ opacity:0, scale:0.94, y:-8 }}
      transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
      className={`${tk.glass} max-w-sm mx-auto p-8 text-center shadow-glass-md`}
      role="alert" aria-live="assertive"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }}
        transition={{ delay:0.1, type:"spring", stiffness:300 }}
        className="mb-4 mx-auto"
      >
        <div className={`w-16 h-16 mx-auto rounded-2xl ${cls.bg} border ${cls.border}
                        flex items-center justify-center text-3xl`}>
          {cls.emoji}
        </div>
      </motion.div>

      <h3 className={`text-lg font-bold mb-2 ${tk.text1}`}>{cls.title}</h3>
      <p className={`text-sm leading-relaxed mb-6 ${tk.text2}`}>{message}</p>

      {onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                      transition-all focus:outline-none focus:ring-2 focus:ring-offset-1
                      ${tk.isDark
                        ? "bg-white/10 border border-white/15 text-white hover:bg-white/18"
                        : "bg-slate-800 text-white hover:bg-slate-700"
                      }`}
        >
          <RotateCcw className="w-4 h-4"/>
          Try again
        </motion.button>
      )}
    </motion.div>
  );
}
