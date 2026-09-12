import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import * as Icons from "lucide-react";
import { CATEGORIES } from "../data/architectureData";
import { DEPLOYMENT_CATEGORIES } from "../data/deploymentData";

function CustomNode({ data, selected }) {
  const { title, subtitle, category, iconName, techs = [], files = [], envVars = [] } = data;
  const categoryConfig = CATEGORIES[category] || DEPLOYMENT_CATEGORIES[category] || CATEGORIES.backend;
  
  // Dynamically resolve Lucide Icon component
  const IconComponent = Icons[iconName] || Icons.Code2;

  return (
    <div
      className={`flow-node-card group relative transition-all duration-200 cursor-pointer select-none ${
        selected ? "ring-1 ring-sky-400/80 shadow-lg shadow-black/60" : ""
      }`}
      style={{
        backgroundColor: "#15181F",
        borderColor: selected ? categoryConfig.color : "rgba(255, 255, 255, 0.08)",
        boxShadow: selected
          ? `0 4px 20px ${categoryConfig.glowColor}`
          : `0 4px 16px rgba(0, 0, 0, 0.35)`,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "10px",
        padding: "12px 14px",
        width: "205px"
      }}
    >
      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: categoryConfig.color,
          width: "8px",
          height: "8px",
          border: "2px solid #0B0D12",
          left: "-5px"
        }}
      />
      
      {/* Category Indicator Accent Line */}
      <div
        className="absolute top-0 left-3 right-3 h-[2px] rounded-t"
        style={{ backgroundColor: categoryConfig.color, opacity: 0.6 }}
      />

      {/* Main Content Area */}
      <div className="flex items-start gap-2.5 pt-0.5">
        <div
          className="p-1.5 rounded-lg shrink-0"
          style={{
            backgroundColor: categoryConfig.badgeBg,
            color: categoryConfig.color,
            border: `1px solid ${categoryConfig.borderColor}`
          }}
        >
          <IconComponent className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold text-slate-100 truncate group-hover:text-sky-300 transition-colors">
            {title}
          </h3>
          <p className="text-[10px] text-slate-400 truncate mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Tech Badges Row */}
      {techs.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-slate-800">
          {techs.slice(0, 2).map((tech, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono text-slate-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800"
            >
              {tech}
            </span>
          ))}
          {techs.length > 2 && (
            <span className="text-[9px] text-slate-500 bg-slate-900/50 px-1 py-0.5 rounded">
              +{techs.length - 2}
            </span>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: categoryConfig.color,
          width: "8px",
          height: "8px",
          border: "2px solid #0B0D12",
          right: "-5px"
        }}
      />
    </div>
  );
}

export default memo(CustomNode);
