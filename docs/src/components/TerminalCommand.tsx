import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

interface TerminalCommandProps {
  command: string;
  large?: boolean;
}

export function TerminalCommand({ command, large }: TerminalCommandProps): ReactNode {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = command;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(12px)",
        borderRadius: 12,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        maxWidth: large ? 600 : 480,
        width: "100%",
      }}
    >
      {/* Terminal chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 16px",
          background: "rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            fontFamily: "monospace",
          }}
        >
          terminal
        </span>
      </div>

      {/* Command */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: large ? "20px 24px" : "16px 20px",
          gap: 12,
        }}
      >
        <code
          style={{
            fontSize: large ? "clamp(13px, 3.5vw, 18px)" : "clamp(12px, 3vw, 15px)",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
            wordBreak: "break-all" as const,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#a855f7" }}>$</span>{" "}
          <span style={{ color: "#22c55e" }}>{command}</span>
        </code>

        <button
          onClick={handleCopy}
          style={{
            background: copied ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 6,
            padding: "6px 12px",
            color: copied ? "#22c55e" : "rgba(255, 255, 255, 0.6)",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "system-ui, sans-serif",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
    </motion.div>
  );
}

interface TerminalBlockProps {
  lines: { text: string; color?: string; delay?: number }[];
}

export function TerminalBlock({ lines }: TerminalBlockProps): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{
        background: "#0d1117",
        borderRadius: 12,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        maxWidth: 720,
        width: "100%",
        margin: "0 auto",
      }}
    >
      {/* Chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 16px",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
      </div>

      {/* Lines */}
      <div style={{ padding: "16px 20px" }}>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (line.delay ?? i * 0.15), duration: 0.4 }}
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
              fontSize: "clamp(11px, 2.5vw, 13px)",
              lineHeight: 1.8,
              color: line.color || "rgba(255, 255, 255, 0.7)",
              wordBreak: "break-word" as const,
            }}
          >
            {line.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
