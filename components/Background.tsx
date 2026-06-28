"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { WeatherTheme } from "@/types/weather";

interface BackgroundProps { theme: WeatherTheme; }

/* Per-theme aurora blob colors */
const T = {
  sunny:        { a:"#fbbf24", b:"#f97316", c:"#fde68a", stars:false, rain:false, snow:false, storm:false },
  cloudy:       { a:"#94a3b8", b:"#cbd5e1", c:"#e2e8f0", stars:false, rain:false, snow:false, storm:false },
  rainy:        { a:"#3b82f6", b:"#60a5fa", c:"#93c5fd", stars:false, rain:true,  snow:false, storm:false },
  thunderstorm: { a:"#4c1d95", b:"#6d28d9", c:"#7c3aed", stars:true,  rain:true,  snow:false, storm:true  },
  snowy:        { a:"#bae6fd", b:"#e0f2fe", c:"#7dd3fc", stars:false, rain:false, snow:true,  storm:false },
  night:        { a:"#1e1b4b", b:"#312e81", c:"#4338ca", stars:true,  rain:false, snow:false, storm:false },
  default:      { a:"#818cf8", b:"#60a5fa", c:"#a78bfa", stars:false, rain:false, snow:false, storm:false },
};

function StarField() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {Array.from({length:70}).map((_,i)=>{
        const size  = Math.random()*2+0.5;
        const delay = Math.random()*6;
        const dur   = Math.random()*3+2;
        return (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width:size, height:size,
              top:`${Math.random()*100}%`,
              left:`${Math.random()*100}%`,
              opacity: Math.random()*0.55+0.15,
              animation:`pulse ${dur}s ease-in-out ${delay}s infinite alternate`,
            }}
          />
        );
      })}
      <style>{`@keyframes pulse{from{opacity:.1}to{opacity:.7}}`}</style>
    </div>
  );
}

function RainLayer({ dense=false }:{dense?:boolean}) {
  const count = dense ? 35 : 22;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({length:count}).map((_,i)=>{
        const dur   = (Math.random()*0.8+0.7).toFixed(2);
        const delay = (Math.random()*2).toFixed(2);
        const h     = Math.random()*50+25;
        const op    = (Math.random()*0.25+0.1).toFixed(2);
        return (
          <div key={i} className="absolute w-px"
            style={{
              height:`${h}px`,
              background:"rgba(147,197,253,0.6)",
              left:`${Math.random()*100}%`,
              top:"-10%",
              opacity:op,
              animationName:"rainfall",
              animationDuration:`${dur}s`,
              animationDelay:`${delay}s`,
              animationTimingFunction:"linear",
              animationIterationCount:"infinite",
            }}
          />
        );
      })}
    </div>
  );
}

function SnowLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({length:38}).map((_,i)=>{
        const size  = Math.random()*5+3;
        const dur   = (Math.random()*6+5).toFixed(1);
        const delay = (Math.random()*8).toFixed(1);
        const op    = (Math.random()*0.5+0.25).toFixed(2);
        return (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width:size, height:size,
              left:`${Math.random()*100}%`,
              top:"-5%",
              opacity:op,
              animationName:"snowfall",
              animationDuration:`${dur}s`,
              animationDelay:`${delay}s`,
              animationTimingFunction:"linear",
              animationIterationCount:"infinite",
            }}
          />
        );
      })}
    </div>
  );
}

function LightningFlash() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
      style={{ background:"white", animation:"lightning 8s ease-in-out infinite" }}
    />
  );
}

export default function Background({ theme }: BackgroundProps) {
  const cfg = T[theme];

  /* Apply theme class to body */
  useEffect(()=>{
    const all:WeatherTheme[] = ["sunny","cloudy","rainy","thunderstorm","snowy","night","default"];
    all.forEach(t=>document.body.classList.remove(`theme-${t}`));
    if(theme!=="default") document.body.classList.add(`theme-${theme}`);
    return ()=>all.forEach(t=>document.body.classList.remove(`theme-${t}`));
  },[theme]);

  /* Mouse spotlight on the background itself */
  const bgRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const move = (e:MouseEvent)=>{
      if(!spotRef.current) return;
      spotRef.current.style.left = e.clientX+"px";
      spotRef.current.style.top  = e.clientY+"px";
    };
    window.addEventListener("mousemove",move,{passive:true});
    return ()=>window.removeEventListener("mousemove",move);
  },[]);

  const isD = theme==="thunderstorm"||theme==="night";

  return (
    <div ref={bgRef} className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">

      {/* Aurora blob 1 */}
      <motion.div className="absolute -top-64 -left-64 w-[750px] h-[750px] rounded-full"
        style={{ background:`radial-gradient(circle, ${cfg.a}88 0%, ${cfg.a}00 70%)`, filter:"blur(70px)" }}
        animate={{ x:[0,70,-35,0], y:[0,-90,45,0], scale:[1,1.18,0.88,1] }}
        transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }}
      />

      {/* Aurora blob 2 */}
      <motion.div className="absolute -bottom-48 -right-48 w-[650px] h-[650px] rounded-full"
        style={{ background:`radial-gradient(circle, ${cfg.b}77 0%, ${cfg.b}00 70%)`, filter:"blur(80px)" }}
        animate={{ x:[0,-60,30,0], y:[0,55,-30,0], scale:[1,0.88,1.12,1] }}
        transition={{ duration:16, repeat:Infinity, ease:"easeInOut", delay:3 }}
      />

      {/* Aurora blob 3 */}
      <motion.div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full"
        style={{ background:`radial-gradient(circle, ${cfg.c}66 0%, ${cfg.c}00 70%)`, filter:"blur(60px)" }}
        animate={{ x:[0,45,-55,0], y:[0,-45,35,0], scale:[1,1.1,0.92,1] }}
        transition={{ duration:18, repeat:Infinity, ease:"easeInOut", delay:6 }}
      />

      {/* Radial ambient light following mouse */}
      <div ref={spotRef}
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          width:600, height:600,
          background: isD
            ? `radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)`,
          transition:"left 0.15s ease,top 0.15s ease",
        }}
      />

      {/* Weather particles */}
      {cfg.stars && <StarField />}
      {cfg.rain  && <RainLayer dense={cfg.storm} />}
      {cfg.snow  && <SnowLayer />}
      {cfg.storm && <LightningFlash />}

      {/* Grain texture */}
      <div className="absolute inset-0"
        style={{
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:"160px",
          opacity:0.022,
          mixBlendMode:"overlay",
        }}
      />
    </div>
  );
}
