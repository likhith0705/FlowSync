import React from "react";
import * as Icons from "lucide-react";

export default function Header({ activeView, onViewChange }) {
  const techBadges = [
    { name: "React" },
    { name: "TypeScript" },
    { name: "FastAPI" },
    { name: "Python" },
    { name: "SQLAlchemy" },
    { name: "PostgreSQL" },
    { name: "JWT" }
  ];

  return (
    <header className="relative z-30 w-full bg-slate-950 border-b border-slate-800/80 px-5 py-3 transition-all shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-sky-400 shrink-0">
            <Icons.GitMerge className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-slate-100">
                FlowSync
              </h1>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                Interactive Architecture
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none mt-0.5">
              Full-Stack Workflow & Task Management System
            </p>
          </div>
        </div>

        {/* Middle Tech Pills */}
        <div className="hidden lg:flex items-center gap-1.5">
          {techBadges.map((badge, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800"
            >
              {badge.name}
            </span>
          ))}
        </div>

        {/* Right Navigation & View Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://github.com/likhith0705/FlowSync"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Icons.ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View</span> Repo
          </a>

          <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800">
            <button
              onClick={() => onViewChange("main")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeView === "main"
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Main Architecture
            </button>
            <button
              onClick={() => onViewChange("deployment")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeView === "deployment"
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Deployment Architecture
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
