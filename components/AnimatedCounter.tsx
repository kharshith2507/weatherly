"use client";

import { useEffect, useRef, useState } from "react";

interface Props { value:number; duration?:number; }

export default function AnimatedCounter({ value, duration=700 }:Props) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const raf  = useRef(0);

  useEffect(()=>{
    const start = prev.current;
    const end   = value;
    if(start===end) return;
    const t0 = performance.now();
    const tick=(now:number)=>{
      const p = Math.min((now-t0)/duration,1);
      // Expo ease out
      const e = p===1 ? 1 : 1-Math.pow(2,-10*p);
      setDisplay(Math.round(start+(end-start)*e));
      if(p<1) raf.current=requestAnimationFrame(tick);
      else prev.current=end;
    };
    raf.current=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(raf.current);
  },[value,duration]);

  return <span className="tabular">{display}</span>;
}
