import type { WeatherTheme } from "@/types/weather";

/* Central token map — all components read from here, never hardcode colours */
export interface ThemeTokens {
  isDark:    boolean;
  /* Text */
  text1:     string;   /* primary */
  text2:     string;   /* secondary */
  text3:     string;   /* muted/label */
  accent:    string;   /* accent colour for icons, highlights */
  accentBg:  string;   /* tinted bg for accent elements */
  accentBorder:string;
  /* Glass variants */
  glass:     string;   /* main card classes */
  glassInner:string;   /* nested chips / inner cards */
  glassPill: string;   /* pill / toggle */
  /* Dividers */
  divider:   string;
  /* Specific tones */
  pinIcon:   string;
  dropIcon:  string;
  rowHover:  string;
  sectionLabel:string;
  badgeBg:   string;
  timeBg:    string;
}

const t: Record<WeatherTheme, ThemeTokens> = {
  sunny: {
    isDark:false,
    text1:"text-amber-950", text2:"text-amber-800/80", text3:"text-amber-700/60",
    accent:"text-amber-500", accentBg:"bg-amber-100/80", accentBorder:"border-amber-300/60",
    glass:"glass", glassInner:"glass-inner", glassPill:"glass-pill",
    divider:"border-amber-200/40",
    pinIcon:"text-amber-400", dropIcon:"text-blue-400",
    rowHover:"hover:bg-amber-50/40",
    sectionLabel:"text-amber-700/60",
    badgeBg:"bg-amber-50 border-amber-200/70 text-amber-700",
    timeBg:"glass-inner",
  },
  cloudy:{
    isDark:false,
    text1:"text-slate-800", text2:"text-slate-600", text3:"text-slate-400",
    accent:"text-slate-500", accentBg:"bg-slate-100/80", accentBorder:"border-slate-300/60",
    glass:"glass", glassInner:"glass-inner", glassPill:"glass-pill",
    divider:"border-slate-200/40",
    pinIcon:"text-slate-400", dropIcon:"text-blue-400",
    rowHover:"hover:bg-slate-50/40",
    sectionLabel:"text-slate-400",
    badgeBg:"bg-slate-100 border-slate-300/60 text-slate-600",
    timeBg:"glass-inner",
  },
  rainy:{
    isDark:false,
    text1:"text-blue-950", text2:"text-blue-800/80", text3:"text-blue-600/60",
    accent:"text-blue-500", accentBg:"bg-blue-100/80", accentBorder:"border-blue-300/60",
    glass:"glass", glassInner:"glass-inner", glassPill:"glass-pill",
    divider:"border-blue-200/40",
    pinIcon:"text-blue-400", dropIcon:"text-blue-500",
    rowHover:"hover:bg-blue-50/40",
    sectionLabel:"text-blue-600/60",
    badgeBg:"bg-blue-50 border-blue-200/60 text-blue-700",
    timeBg:"glass-inner",
  },
  thunderstorm:{
    isDark:true,
    text1:"text-violet-50", text2:"text-violet-200/70", text3:"text-violet-300/50",
    accent:"text-violet-400", accentBg:"bg-violet-900/50", accentBorder:"border-violet-600/40",
    glass:"glass-dark", glassInner:"glass-dark-inner", glassPill:"glass-dark-inner",
    divider:"border-violet-800/40",
    pinIcon:"text-violet-400", dropIcon:"text-blue-400",
    rowHover:"hover:bg-violet-900/30",
    sectionLabel:"text-violet-300/50",
    badgeBg:"bg-violet-900/60 border-violet-600/40 text-violet-200",
    timeBg:"glass-dark-inner",
  },
  snowy:{
    isDark:false,
    text1:"text-sky-950", text2:"text-sky-700/80", text3:"text-sky-600/55",
    accent:"text-sky-500", accentBg:"bg-sky-100/80", accentBorder:"border-sky-300/60",
    glass:"glass", glassInner:"glass-inner", glassPill:"glass-pill",
    divider:"border-sky-200/40",
    pinIcon:"text-sky-400", dropIcon:"text-sky-400",
    rowHover:"hover:bg-sky-50/40",
    sectionLabel:"text-sky-600/55",
    badgeBg:"bg-sky-50 border-sky-200/60 text-sky-700",
    timeBg:"glass-inner",
  },
  night:{
    isDark:true,
    text1:"text-indigo-50", text2:"text-indigo-200/65", text3:"text-indigo-300/45",
    accent:"text-indigo-400", accentBg:"bg-indigo-900/50", accentBorder:"border-indigo-600/30",
    glass:"glass-dark", glassInner:"glass-dark-inner", glassPill:"glass-dark-inner",
    divider:"border-indigo-800/35",
    pinIcon:"text-indigo-400", dropIcon:"text-blue-400",
    rowHover:"hover:bg-indigo-900/30",
    sectionLabel:"text-indigo-300/45",
    badgeBg:"bg-indigo-900/60 border-indigo-600/30 text-indigo-200",
    timeBg:"glass-dark-inner",
  },
  default:{
    isDark:false,
    text1:"text-slate-800", text2:"text-slate-600", text3:"text-slate-400",
    accent:"text-indigo-500", accentBg:"bg-indigo-50/80", accentBorder:"border-indigo-200/60",
    glass:"glass", glassInner:"glass-inner", glassPill:"glass-pill",
    divider:"border-white/30",
    pinIcon:"text-indigo-400", dropIcon:"text-blue-400",
    rowHover:"hover:bg-white/20",
    sectionLabel:"text-slate-400",
    badgeBg:"bg-indigo-50 border-indigo-200/60 text-indigo-700",
    timeBg:"glass-inner",
  },
};

export function getTheme(theme: WeatherTheme): ThemeTokens { return t[theme]; }
