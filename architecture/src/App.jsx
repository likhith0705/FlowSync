import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider
} from "@xyflow/react";

import CustomNode from "./components/CustomNode";
import NodeDetailModal from "./components/NodeDetailModal";
import Header from "./components/Header";
import Legend from "./components/Legend";
import InstructionPanel from "./components/InstructionPanel";

import {
  INITIAL_NODES,
  INITIAL_EDGES,
  CATEGORIES
} from "./data/architectureData";

import {
  DEPLOYMENT_NODES,
  DEPLOYMENT_EDGES,
  DEPLOYMENT_CATEGORIES
} from "./data/deploymentData";

function ArchitectureCanvas() {
  const [activeView, setActiveView] = useState("main");

  const activeNodesData = activeView === "main" ? INITIAL_NODES : DEPLOYMENT_NODES;
  const activeEdgesData = activeView === "main" ? INITIAL_EDGES : DEPLOYMENT_EDGES;

  const [nodes, setNodes, onNodesChange] = useNodesState(activeNodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(activeEdgesData);
  const [selectedNodeData, setSelectedNodeData] = useState(null);

  const { fitView } = useReactFlow();

  // Reset nodes and edges when switching view
  useEffect(() => {
    const targetNodes = activeView === "main" ? INITIAL_NODES : DEPLOYMENT_NODES;
    const targetEdges = activeView === "main" ? INITIAL_EDGES : DEPLOYMENT_EDGES;
    
    setNodes(targetNodes);
    setEdges(targetEdges);
    setSelectedNodeData(null);

    // Auto-fit view after state update
    const timer = setTimeout(() => {
      fitView({ padding: 0.18, duration: 400 });
    }, 50);

    return () => clearTimeout(timer);
  }, [activeView, fitView, setNodes, setEdges]);

  // Register custom node types
  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode
    }),
    []
  );

  // Handle node selection / click
  const onNodeClick = useCallback((event, node) => {
    if (node && node.data) {
      setSelectedNodeData(node.data);
    }
  }, []);

  // MiniMap node color mapping
  const getMiniMapNodeColor = useCallback(
    (node) => {
      const category = node.data?.category;
      if (category) {
        if (CATEGORIES[category]) return CATEGORIES[category].color;
        if (DEPLOYMENT_CATEGORIES[category]) return DEPLOYMENT_CATEGORIES[category].color;
      }
      return "#38BDF8";
    },
    []
  );

  return (
    <div className="flex flex-col w-screen h-screen bg-[#0B0D12] overflow-hidden text-slate-100 font-sans">
      {/* Top Header */}
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Main Flow Canvas Area */}
      <div className="relative flex-1 min-h-0 w-full bg-[#0B0D12]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          minZoom={0.15}
          maxZoom={1.8}
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: true,
            style: { strokeWidth: 1.5 }
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Subtle Dark Dotted Background */}
          <Background
            color="#1E222D"
            gap={20}
            size={1.2}
            variant="dots"
          />

          {/* Navigation Controls */}
          <Controls position="bottom-right" style={{ marginBottom: "80px" }} />

          {/* MiniMap Canvas Overview */}
          <MiniMap
            nodeColor={getMiniMapNodeColor}
            nodeStrokeWidth={2}
            zoomable
            pannable
            position="bottom-right"
          />
        </ReactFlow>

        {/* Floating Architecture Legend (Bottom Left) */}
        <Legend activeView={activeView} />

        {/* Floating Instruction Banner (Top Right) */}
        <InstructionPanel />

        {/* Selected Node Detail Slide-over Modal */}
        {selectedNodeData && (
          <NodeDetailModal
            nodeData={selectedNodeData}
            onClose={() => setSelectedNodeData(null)}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <ArchitectureCanvas />
    </ReactFlowProvider>
  );
}