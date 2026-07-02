"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Error({ error, reset }:{ error:Error; reset:()=>void }) {
  useEffect(()=>{ console.error(error); },[error]);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass max-w-sm w-full p-8 text-center shadow-glass-md rounded-4xl">
        <div className="text-5xl mb-4">⚡</div>
        <h2 className="text-lg font-bold text-slate-800 mb-2">Something went wrong</h2>
        <p className="text-sm text-slate-500 mb-6">{error.message}</p>
        <button onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors">
          <RotateCcw className="w-4 h-4"/> Try again
        </button>
      </div>
    </div>
  );
}
