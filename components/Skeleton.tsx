"use client";

import { motion } from "framer-motion";

function Bone({ className="" }:{ className?:string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true"/>;
}

export default function Skeleton() {
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="space-y-4" aria-label="Loading weather" aria-busy="true"
    >
      {/* Main card */}
      <div className="glass p-7 md:p-10 rounded-4xl shadow-glass">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <div className="space-y-4 flex-1">
            <Bone className="h-5 w-44"/>
            <Bone className="h-3.5 w-52"/>
            <Bone className="h-24 w-48 mt-4 rounded-2xl"/>
            <Bone className="h-4 w-36"/>
            <Bone className="h-7 w-32 rounded-full"/>
          </div>
          <div className="flex sm:flex-col items-center gap-4">
            <Bone className="w-32 h-32 rounded-3xl"/>
            <Bone className="w-28 h-16 rounded-2xl"/>
          </div>
        </div>
      </div>

      {/* Details */}
      <div>
        <Bone className="h-3 w-16 mb-3"/>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {Array.from({length:7}).map((_,i)=>(
            <div key={i} className="glass-inner rounded-2xl p-4 space-y-3">
              <Bone className="w-9 h-9 rounded-xl"/>
              <Bone className="h-2.5 w-14"/>
              <Bone className="h-5 w-20"/>
              <Bone className="h-2.5 w-12"/>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly */}
      <div>
        <Bone className="h-3 w-14 mb-3"/>
        <div className="glass rounded-3xl p-4 shadow-glass">
          <div className="flex gap-3 overflow-hidden">
            {Array.from({length:7}).map((_,i)=>(
              <div key={i} className="flex flex-col items-center gap-2.5 flex-shrink-0 min-w-[78px] py-2">
                <Bone className="h-3 w-10"/>
                <Bone className="h-11 w-11 rounded-full"/>
                <Bone className="h-4 w-14"/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-day */}
      <div>
        <Bone className="h-3 w-20 mb-3"/>
        <div className="glass rounded-4xl overflow-hidden shadow-glass">
          {Array.from({length:5}).map((_,i)=>(
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-black/5 last:border-0">
              <Bone className="h-10 w-20 rounded-xl"/>
              <div className="flex items-center gap-3 flex-1">
                <Bone className="h-10 w-10 rounded-full"/>
                <Bone className="h-3 w-28 hidden md:block"/>
              </div>
              <div className="flex items-center gap-2 w-40">
                <Bone className="h-3 w-10"/>
                <Bone className="h-1.5 flex-1 rounded-full"/>
                <Bone className="h-3 w-10"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
