export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-[3px] border-indigo-200 border-t-indigo-500 animate-spin"/>
        <p className="text-sm font-semibold text-slate-400 tracking-wide">Loading…</p>
      </div>
    </div>
  );
}
