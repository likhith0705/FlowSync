import React from "react";
import * as Icons from "lucide-react";

export default function InstructionsPanel() {
  return (
    <div className="absolute top-20 right-6 z-20 pointer-events-none hidden lg:block">
      <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl px-4 py-2.5 shadow-xl backdrop-blur-md flex items-center gap-4 text-xs text-slate-300 pointer-events-auto">
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
          <Icons.Info className="w-4 h-4" />
          <span>Interactive Canvas</span>
        </div>
        <div className="h-3 w-px bg-slate-800" />
        <span className="text-slate-400 text-[11px]">
          Drag to Pan • Scroll to Zoom • Click Card for verified source code
        </span>
      </div>
    </div>
  );
}
