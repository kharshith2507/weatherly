"use client";

import { motion } from "framer-motion";

interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loader({
  text = "Fetching weather…",
  size = "md",
}: LoaderProps) {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-14 h-14 border-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-3"
      aria-live="polite"
      aria-label={text}
    >
      <div
        className={`rounded-full border-blue-200 border-t-blue-500 animate-spin ${sizes[size]}`}
        role="status"
      />
      {text && (
        <p className="text-sm text-slate-500 font-medium animate-pulse">
          {text}
        </p>
      )}
    </motion.div>
  );
}
