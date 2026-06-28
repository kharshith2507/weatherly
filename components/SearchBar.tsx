"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, Clock, Loader2, Trash2, Navigation } from "lucide-react";
import { debounce, getRecentSearches, clearRecentSearches, formatRelativeTime } from "@/lib/utils";
import { getTheme } from "@/lib/theme";
import type { RecentSearch, WeatherTheme } from "@/types/weather";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
  locationLoading: boolean;
  theme: WeatherTheme;
}

export default function SearchBar({ onSearch, onLocationSearch, locationLoading, theme }: SearchBarProps) {
  const [query, setQuery]             = useState("");
  const [focused, setFocused]         = useState(false);
  const [recentSearches, setRecent]   = useState<RecentSearch[]>([]);
  const inputRef    = useRef<HTMLInputElement>(null);
  const containerRef= useRef<HTMLDivElement>(null);
  const tk = getTheme(theme);

  const refresh = useCallback(()=>setRecent(getRecentSearches()),[]);
  useEffect(()=>{ refresh(); },[refresh]);

  const submit = useCallback((city:string)=>{
    const t = city.trim(); if(!t) return;
    onSearch(t); setQuery(""); setFocused(false);
    inputRef.current?.blur();
    setTimeout(refresh, 800);
  },[onSearch,refresh]);

  // keep debounce ref stable
  const dbRef = useRef(debounce((_:string)=>{},350));

  const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter") submit(query);
    if(e.key==="Escape"){ setFocused(false); inputRef.current?.blur(); }
  };

  useEffect(()=>{
    const h=(e:MouseEvent)=>{
      if(containerRef.current&&!containerRef.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);

  const showDropdown = focused && recentSearches.length>0 && !query;

  // Spotlight on search bar
  const barRef = useRef<HTMLDivElement>(null);
  const onMouseMove = (e:React.MouseEvent<HTMLDivElement>)=>{
    if(!barRef.current) return;
    const r = barRef.current.getBoundingClientRect();
    barRef.current.style.setProperty("--mouse-x", `${e.clientX-r.left}px`);
    barRef.current.style.setProperty("--mouse-y", `${e.clientY-r.top}px`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <motion.div
        ref={barRef}
        initial={{ opacity:0, y:16, scale:0.97 }}
        animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
        onMouseMove={onMouseMove}
        className={`spotlight ${tk.glass} flex items-center gap-3 px-4 py-3.5
                    transition-all duration-300
                    ${focused ? "ring-2 ring-[color:var(--accent)]/40 shadow-glass-md" : "shadow-glass"}`}
      >
        {/* Search icon */}
        <motion.div animate={{ scale: focused ? 1.1 : 1 }} transition={{ duration:0.2 }}>
          <Search className={`h-4.5 w-4.5 flex-shrink-0 ${focused ? tk.accent : tk.text3}`} aria-hidden="true" />
        </motion.div>

        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={e=>{ setQuery(e.target.value); dbRef.current(e.target.value); }}
          onKeyDown={onKeyDown}
          onFocus={()=>setFocused(true)}
          placeholder="Search for a city…"
          aria-label="Search for a city"
          autoComplete="off"
          spellCheck={false}
          className={`flex-1 bg-transparent text-[15px] font-medium placeholder:${tk.text3}
                      focus:outline-none caret-[color:var(--accent)] ${tk.text1}`}
        />

        {/* Clear */}
        <AnimatePresence>
          {query && (
            <motion.button
              key="x"
              initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.7 }}
              onClick={()=>setQuery("")}
              aria-label="Clear"
              className={`rounded-full p-1.5 transition-colors ${tk.glassInner} ${tk.text3} hover:${tk.text2}`}
            ><X className="h-3.5 w-3.5"/></motion.button>
          )}
        </AnimatePresence>

        {/* Search button */}
        <AnimatePresence>
          {query && (
            <motion.button
              key="go"
              initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:8 }}
              onClick={()=>submit(query)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-xl text-sm font-semibold
                         transition-all focus:outline-none focus:ring-2 focus:ring-offset-1
                         ${tk.isDark
                           ? "bg-indigo-500 text-white hover:bg-indigo-400"
                           : "bg-slate-800 text-white hover:bg-slate-700"
                         }`}
            >Search</motion.button>
          )}
        </AnimatePresence>

        <div className={`h-5 w-px flex-shrink-0 ${tk.isDark?"bg-white/10":"bg-black/8"}`} aria-hidden="true"/>

        {/* Location button */}
        <button
          onClick={onLocationSearch}
          disabled={locationLoading}
          aria-label="Use my current location"
          className={`flex-shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold
                      transition-all focus:outline-none focus:ring-2 disabled:opacity-50
                      ${tk.accentBg} ${tk.accent} border ${tk.accentBorder}
                      hover:shadow-sm`}
        >
          {locationLoading
            ? <Loader2 className="h-3.5 w-3.5 animate-spin"/>
            : <Navigation className="h-3.5 w-3.5"/>
          }
          <span className="hidden sm:inline">{locationLoading?"Locating…":"Near me"}</span>
        </button>
      </motion.div>

      {/* ── Recent searches dropdown ── */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity:0, y:-10, scale:0.97 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-10, scale:0.97 }}
            transition={{ duration:0.18, ease:[0.16,1,0.3,1] }}
            className={`absolute inset-x-0 top-full mt-2 z-50 overflow-hidden rounded-3xl
                        ${tk.isDark?"glass-dark":"glass"} shadow-glass-lg`}
            role="listbox"
            aria-label="Recent searches"
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-2.5 border-b ${tk.divider}`}>
              <span className={`flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.1em] ${tk.text3}`}>
                <Clock className="h-3 w-3"/> Recent
              </span>
              <button
                onClick={()=>{ clearRecentSearches(); setRecent([]); }}
                className={`flex items-center gap-1 text-2xs font-medium rounded-lg px-2 py-1
                            transition-colors ${tk.text3}
                            ${tk.isDark?"hover:bg-white/10 hover:text-red-400":"hover:bg-red-50 hover:text-red-500"}`}
              >
                <Trash2 className="h-3 w-3"/> Clear
              </button>
            </div>

            <ul>
              {recentSearches.map((s,i)=>(
                <motion.li key={`${s.city}-${i}`}
                  initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:i*0.04 }}
                >
                  <button
                    onClick={()=>submit(s.city)}
                    role="option" aria-selected={false}
                    className={`w-full flex items-center justify-between px-4 py-3
                                transition-colors ${tk.rowHover} ${tk.text1} text-left`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${tk.accentBg}`}>
                        <MapPin className={`h-3.5 w-3.5 ${tk.accent}`}/>
                      </div>
                      <span className="text-sm font-semibold">{s.city}</span>
                      <span className={`text-2xs font-mono px-1.5 py-0.5 rounded-md ${tk.glassInner} ${tk.text3}`}>
                        {s.country}
                      </span>
                    </div>
                    <span className={`text-2xs ${tk.text3}`}>{formatRelativeTime(s.timestamp)}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
