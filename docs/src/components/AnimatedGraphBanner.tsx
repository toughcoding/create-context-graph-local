import { motion } from "framer-motion";
import type { ReactNode } from "react";

// POLE+O color palette
const COLORS = {
  person: "#22c55e",
  organization: "#3b82f6",
  location: "#a855f7",
  event: "#f97316",
  object: "#eab308",
};

interface GraphNode {
  id: number;
  x: number;
  y: number;
  r: number;
  color: string;
  label: string;
  delay: number;
  drift: number;
}

const NODES: GraphNode[] = [
  // Person nodes (green)
  { id: 1, x: 120, y: 100, r: 18, color: COLORS.person, label: "Person", delay: 0, drift: 8 },
  { id: 2, x: 680, y: 160, r: 14, color: COLORS.person, label: "Person", delay: 0.3, drift: -6 },
  { id: 3, x: 350, y: 280, r: 12, color: COLORS.person, label: "Person", delay: 0.8, drift: 5 },
  // Organization nodes (blue)
  { id: 4, x: 250, y: 60, r: 22, color: COLORS.organization, label: "Org", delay: 0.1, drift: -7 },
  { id: 5, x: 550, y: 90, r: 16, color: COLORS.organization, label: "Org", delay: 0.5, drift: 9 },
  { id: 6, x: 800, y: 250, r: 13, color: COLORS.organization, label: "Org", delay: 1.0, drift: -5 },
  // Location nodes (purple)
  { id: 7, x: 150, y: 240, r: 15, color: COLORS.location, label: "Location", delay: 0.2, drift: 6 },
  { id: 8, x: 480, y: 200, r: 20, color: COLORS.location, label: "Location", delay: 0.6, drift: -8 },
  { id: 9, x: 900, y: 130, r: 11, color: COLORS.location, label: "Location", delay: 0.9, drift: 4 },
  // Event nodes (orange)
  { id: 10, x: 400, y: 120, r: 16, color: COLORS.event, label: "Event", delay: 0.15, drift: -6 },
  { id: 11, x: 720, y: 280, r: 14, color: COLORS.event, label: "Event", delay: 0.7, drift: 7 },
  { id: 12, x: 60, y: 180, r: 10, color: COLORS.event, label: "Event", delay: 1.1, drift: -4 },
  // Object nodes (yellow)
  { id: 13, x: 580, y: 260, r: 17, color: COLORS.object, label: "Object", delay: 0.25, drift: 5 },
  { id: 14, x: 300, y: 180, r: 13, color: COLORS.object, label: "Object", delay: 0.4, drift: -7 },
  { id: 15, x: 850, y: 60, r: 15, color: COLORS.object, label: "Object", delay: 0.85, drift: 6 },
  // Extra nodes for density
  { id: 16, x: 200, y: 310, r: 9, color: COLORS.person, label: "Person", delay: 1.2, drift: -3 },
  { id: 17, x: 650, y: 40, r: 11, color: COLORS.location, label: "Location", delay: 0.95, drift: 5 },
  { id: 18, x: 950, y: 200, r: 10, color: COLORS.object, label: "Object", delay: 1.3, drift: -4 },
];

// Edges connecting nodes
const EDGES: [number, number][] = [
  [1, 4], [1, 7], [2, 5], [2, 10], [3, 8], [3, 14],
  [4, 5], [4, 10], [5, 9], [5, 17], [6, 11], [6, 18],
  [7, 14], [7, 12], [8, 13], [8, 10], [9, 15], [9, 6],
  [10, 13], [11, 13], [11, 6], [12, 16], [14, 3],
  [15, 17], [16, 7], [17, 2], [18, 15],
];

export function AnimatedGraphBanner(): ReactNode {
  return (
    <svg
      viewBox="0 0 1000 340"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.35,
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Edges */}
      {EDGES.map(([fromId, toId], i) => {
        const from = NODES.find((n) => n.id === fromId)!;
        const to = NODES.find((n) => n.id === toId)!;
        return (
          <motion.line
            key={`edge-${i}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.5, delay: 0.5 + i * 0.05, ease: "easeOut" },
              opacity: { duration: 0.5, delay: 0.5 + i * 0.05 },
            }}
          />
        );
      })}

      {/* Nodes */}
      {NODES.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={node.color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: [0.6, 1, 0.6],
            y: [0, node.drift, 0],
          }}
          transition={{
            scale: { duration: 0.6, delay: node.delay, ease: "backOut" },
            opacity: {
              duration: 3 + Math.random() * 2,
              delay: node.delay + 0.6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            y: {
              duration: 4 + Math.random() * 3,
              delay: node.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
          style={{ filter: `drop-shadow(0 0 ${node.r * 0.6}px ${node.color})` }}
        />
      ))}

      {/* Glow effects on larger nodes */}
      {NODES.filter((n) => n.r >= 16).map((node) => (
        <motion.circle
          key={`glow-${node.id}`}
          cx={node.x}
          cy={node.y}
          r={node.r * 2}
          fill="none"
          stroke={node.color}
          strokeWidth={1}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.05, 0.15],
            y: [0, node.drift, 0],
          }}
          transition={{
            scale: {
              duration: 4,
              delay: node.delay + 1,
              repeat: Infinity,
              repeatType: "mirror",
            },
            opacity: {
              duration: 4,
              delay: node.delay + 1,
              repeat: Infinity,
              repeatType: "mirror",
            },
            y: {
              duration: 4 + Math.random() * 3,
              delay: node.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </svg>
  );
}
