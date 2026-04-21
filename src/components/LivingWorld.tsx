import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

/**
 * LivingWorld — multi-layer parallax fantasy environment.
 * Layers (back → front): sky gradient · stars · distant mountains ·
 * drifting clouds · midground hills · fireflies · foreground grass.
 */
const LivingWorld = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 60,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    []
  );

  const fireflies = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 30 + Math.random() * 60,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 8,
        x: 40 + Math.random() * 80,
      })),
    []
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        top: 8 + i * 12,
        size: 140 + Math.random() * 180,
        delay: i * 6,
        duration: 70 + Math.random() * 40,
        opacity: 0.35 + Math.random() * 0.3,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Sky gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(180deg, hsl(245 60% 6%) 0%, hsl(265 55% 12%) 40%, hsl(285 50% 14%) 70%, hsl(245 45% 10%) 100%)"
            : "linear-gradient(180deg, hsl(220 90% 92%) 0%, hsl(270 70% 90%) 45%, hsl(330 75% 92%) 75%, hsl(165 50% 88%) 100%)",
        }}
      />

      {/* Aurora wash */}
      <div className="absolute inset-0 gradient-aurora opacity-50" />

      {/* Stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: isDark
              ? "radial-gradient(circle, hsl(0 0% 100%), hsl(280 100% 80% / 0.5) 60%, transparent)"
              : "radial-gradient(circle, hsl(var(--primary)), hsl(var(--secondary) / 0.4) 60%, transparent)",
            boxShadow: isDark
              ? `0 0 ${s.size * 3}px hsl(0 0% 100% / 0.9)`
              : `0 0 ${s.size * 2.5}px hsl(var(--glow-magic) / 0.7)`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.3, 0.6] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Drifting clouds / mist */}
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full blur-3xl"
          style={{
            top: `${c.top}%`,
            width: c.size,
            height: c.size * 0.55,
            opacity: c.opacity,
            background: isDark
              ? `radial-gradient(ellipse, hsl(${275 + c.id * 15} 80% 55% / 0.5), transparent 70%)`
              : `radial-gradient(ellipse, hsl(${200 + c.id * 25} 90% 85% / 0.7), transparent 70%)`,
          }}
          animate={{ x: ["-20%", "120%"] }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Distant mountain silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "30vh", opacity: 0.4 }}
      >
        <defs>
          <linearGradient id="mountainBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? "hsl(265 60% 22%)" : "hsl(270 50% 75%)"} />
            <stop offset="100%" stopColor={isDark ? "hsl(245 60% 8%)" : "hsl(220 60% 88%)"} />
          </linearGradient>
        </defs>
        <path
          d="M0,200 L120,150 L240,180 L360,110 L480,160 L600,120 L720,170 L840,100 L960,150 L1080,120 L1200,170 L1320,130 L1440,180 L1440,320 L0,320 Z"
          fill="url(#mountainBack)"
        />
      </svg>

      {/* Midground hills */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        style={{ height: "20vh", opacity: 0.65 }}
      >
        <defs>
          <linearGradient id="hillsMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? "hsl(275 55% 18%)" : "hsl(195 60% 72%)"} />
            <stop offset="100%" stopColor={isDark ? "hsl(245 60% 8%)" : "hsl(220 60% 88%)"} />
          </linearGradient>
        </defs>
        <path
          d="M0,180 C180,120 360,200 540,140 C720,80 900,180 1080,120 C1260,60 1380,140 1440,160 L1440,240 L0,240 Z"
          fill="url(#hillsMid)"
        />
      </svg>

      {/* Foreground silhouette trees */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{ height: "14vh", opacity: 0.85 }}
      >
        <defs>
          <linearGradient id="hillsFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? "hsl(265 65% 12%)" : "hsl(165 50% 65%)"} />
            <stop offset="100%" stopColor={isDark ? "hsl(245 70% 6%)" : "hsl(180 45% 70%)"} />
          </linearGradient>
        </defs>
        <path
          d="M0,140 C200,100 350,160 550,120 C750,80 950,140 1150,110 C1300,90 1400,130 1440,140 L1440,200 L0,200 Z"
          fill="url(#hillsFront)"
        />
        {/* tiny trees */}
        {[120, 280, 460, 680, 880, 1080, 1280].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${130 - (i % 3) * 8})`} opacity="0.9">
            <path d="M0,0 L-8,16 L8,16 Z" fill={isDark ? "hsl(265 70% 8%)" : "hsl(165 55% 45%)"} />
            <path d="M0,8 L-10,26 L10,26 Z" fill={isDark ? "hsl(265 70% 8%)" : "hsl(165 55% 45%)"} />
            <rect x="-1.5" y="24" width="3" height="6" fill={isDark ? "hsl(265 70% 8%)" : "hsl(25 45% 35%)"} />
          </g>
        ))}
      </svg>

      {/* Fireflies */}
      {fireflies.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: 4,
            height: 4,
            background: isDark
              ? "radial-gradient(circle, hsl(50 100% 75%), hsl(40 100% 60% / 0.6) 50%, transparent)"
              : "radial-gradient(circle, hsl(var(--accent)), hsl(var(--glow-accent) / 0.5) 60%, transparent)",
            boxShadow: isDark
              ? "0 0 12px hsl(50 100% 70% / 0.9)"
              : "0 0 10px hsl(var(--glow-accent) / 0.7)",
          }}
          animate={{
            x: [0, f.x, -f.x / 2, 0],
            y: [0, -30, -10, 0],
            opacity: [0, 1, 0.5, 0],
          }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Anchor glowing orbs */}
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-primary/15 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-32 left-5 w-40 h-40 rounded-full bg-secondary/15 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/3 w-36 h-36 rounded-full bg-accent/15 blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
    </div>
  );
};

export default LivingWorld;
