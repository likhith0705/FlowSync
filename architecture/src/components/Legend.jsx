import React from "react";
import * as Icons from "lucide-react";
import { CATEGORIES } from "../data/architectureData";
import { DEPLOYMENT_CATEGORIES } from "../data/deploymentData";

export default function Legend({ activeView = "main" }) {
  const currentCategories = activeView === "main" ? CATEGORIES : DEPLOYMENT_CATEGORIES;

  return (
    <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
      <div className="w-64 bg-slate-950 border border-slate-800 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-slate-200 pointer-events-auto">
        <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-2.5">
          <Icons.Layers className="w-3.5 h-3.5 text-sky-400" />
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            {activeView === "main" ? "System Legend" : "Deployment Legend"}
          </h3>
        </div>

        {/* Categories List */}
        <div className="space-y-1.5 mb-2.5">
          {Object.entries(currentCategories).map(([key, cat]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-slate-300 text-[11px] font-medium truncate">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Legend Flow Helper */}
        <div className="pt-2 border-t border-slate-800 space-y-1 text-[10px] text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-sky-400 shrink-0" />
            <span>Main Pipeline Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t border-dashed border-slate-500 shrink-0" />
            <span>Subsystem Branch / Table</span>
          </div>
        </div>
      </div>
    </div>
  );
}
