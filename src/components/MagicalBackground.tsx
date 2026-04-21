import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface MagicalBackgroundProps {
  variant?: "sky" | "forest" | "deep";
  intensity?: "low" | "medium" | "high";
}

const MagicalBackground = ({ variant = "sky", intensity = "medium" }: MagicalBackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const starCount = intensity === "high" ? 40 : intensity === "medium" ? 24 : 12;

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 1.5 + Math.random() * 3,
        size: 1 + Math.random() * 3,
      })),
    [starCount]
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: 5 + i * 18,
        delay: i * 8,
        duration: 50 + Math.random() * 30,
        size: 80 + Math.random() * 120,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora gradient layer */}
      <div className="absolute inset-0 gradient-aurora opacity-40" />

      {/* Stars (always visible, brighter at night) */}
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
              : "radial-gradient(circle, hsl(var(--primary)), hsl(var(--secondary) / 0.5) 60%, transparent)",
            boxShadow: isDark
              ? `0 0 ${s.size * 3}px hsl(0 0% 100% / 0.8)`
              : `0 0 ${s.size * 2}px hsl(var(--glow-magic) / 0.6)`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating clouds / orbs (drifting) */}
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            top: `${c.top}%`,
            width: c.size,
            height: c.size * 0.6,
            background: isDark
              ? `radial-gradient(ellipse, hsl(${275 + c.id * 20} 80% 60% / 0.5), transparent 70%)`
              : `radial-gradient(ellipse, hsl(${200 + c.id * 30} 90% 80% / 0.6), transparent 70%)`,
          }}
          animate={{
            x: ["-15%", "115%"],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Glowing orbs anchors */}
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/15 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-5 w-32 h-32 rounded-full bg-secondary/15 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/3 w-28 h-28 rounded-full bg-accent/15 blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Floating sparkles */}
      <div className="absolute top-1/4 right-1/4 text-2xl animate-sparkle">✨</div>
      <div className="absolute bottom-1/3 right-1/5 text-xl animate-sparkle" style={{ animationDelay: "1s" }}>⭐</div>
      <div className="absolute top-2/3 left-1/4 text-lg animate-sparkle" style={{ animationDelay: "2s" }}>💫</div>
    </div>
  );
};

export default MagicalBackground;
