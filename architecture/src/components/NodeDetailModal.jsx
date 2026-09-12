import React, { useEffect } from "react";
import * as Icons from "lucide-react";
import { CATEGORIES } from "../data/architectureData";
import { DEPLOYMENT_CATEGORIES } from "../data/deploymentData";

export default function NodeDetailModal({ nodeData, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!nodeData) return null;

  const {
    title,
    subtitle,
    category,
    iconName,
    techs = [],
    purpose,
    files = [],
    envVars = [],
    responsibilities = [],
    codeSnippet
  } = nodeData;

  const categoryConfig = CATEGORIES[category] || DEPLOYMENT_CATEGORIES[category] || CATEGORIES.backend;
  const IconComponent = Icons[iconName] || Icons.Code2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm transition-all duration-200 animate-fadeIn">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Panel */}
      <div
        className="relative w-full max-w-xl h-full bg-slate-950 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl overflow-hidden z-10"
      >
        {/* Panel Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-start justify-between shrink-0 bg-slate-900">
          <div className="flex items-start gap-3.5">
            <div
              className="p-2.5 rounded-lg shrink-0 mt-0.5"
              style={{
                backgroundColor: categoryConfig.badgeBg,
                color: categoryConfig.color,
                border: `1px solid ${categoryConfig.borderColor}`
              }}
            >
              <IconComponent className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: categoryConfig.badgeBg,
                    color: categoryConfig.badgeText,
                    border: `1px solid ${categoryConfig.borderColor}`
                  }}
                >
                  {categoryConfig.name}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">{title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Panel (Esc)"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Component Purpose */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
              <Icons.Target className="w-3.5 h-3.5 text-sky-400" />
              Purpose & Overview
            </h4>
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {purpose}
            </div>
          </div>

          {/* Technologies Stack */}
          {techs.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <Icons.Cpu className="w-3.5 h-3.5 text-purple-400" />
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {techs.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Environment Variables */}
          {envVars.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <Icons.Key className="w-3.5 h-3.5 text-amber-400" />
                Environment Variables
              </h4>
              <div className="space-y-1.5">
                {envVars.map((env, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto"
                  >
                    {env}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architectural Responsibilities */}
          {responsibilities.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <Icons.CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Core Responsibilities
              </h4>
              <ul className="space-y-2">
                {responsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
                  >
                    <Icons.ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verified Codebase Files */}
          {files.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <Icons.FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
                Verified Files & Modules
              </h4>
              <div className="space-y-1.5">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-2.5"
                  >
                    <Icons.FileCode className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <code className="text-xs font-mono text-sky-300 block truncate">
                        {file.path}
                      </code>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {file.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real Code Snippet */}
          {codeSnippet && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <Icons.Code className="w-3.5 h-3.5 text-rose-400" />
                Verified Implementation
              </h4>
              <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                <div className="px-3 py-1.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>FlowSync Codebase Spec</span>
                  <span className="text-emerald-400">Verified</span>
                </div>
                <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Panel Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950 shrink-0 flex items-center justify-between text-xs text-slate-400">
          <span>FlowSync Portfolio Architecture</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
