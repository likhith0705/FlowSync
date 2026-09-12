import React from "react";
import * as Icons from "lucide-react";

export default function InstructionPanel() {
  return (
    <div className="absolute top-4 right-5 z-20 pointer-events-none hidden md:block">
      <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 shadow-xl backdrop-blur-md flex items-center gap-2 text-[11px] text-slate-300 pointer-events-auto">
        <Icons.Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span className="text-slate-400">
          <strong className="text-slate-200 font-semibold">Interactive Canvas</strong> • Drag to pan • Scroll to zoom • Click nodes for details
        </span>
      </div>
    </div>
  );
}
