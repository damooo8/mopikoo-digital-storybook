import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const EMOJIS = ["✨", "⭐", "💫", "🌟"];

/**
 * Global tap-to-sparkle layer. Listens to pointerdown anywhere
 * and spawns short-lived particle bursts at the tap point.
 */
const TapSparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let nextId = 0;
    const handler = (e: PointerEvent) => {
      // Skip taps on inputs / textareas to avoid noise
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select")) return;
      const burst: Sparkle[] = Array.from({ length: 4 }, () => ({
        id: nextId++,
        x: e.clientX + (Math.random() - 0.5) * 30,
        y: e.clientY + (Math.random() - 0.5) * 30,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      }));
      setSparkles((s) => [...s, ...burst]);
      setTimeout(() => {
        setSparkles((s) => s.filter((sp) => !burst.find((b) => b.id === sp.id)));
      }, 900);
    };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 1, scale: 0.4, x: s.x, y: s.y }}
            animate={{
              opacity: 0,
              scale: 1.4,
              x: s.x + (Math.random() - 0.5) * 80,
              y: s.y - 40 - Math.random() * 40,
              rotate: Math.random() * 270,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-lg select-none"
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--glow-magic) / 0.8))" }}
          >
            {s.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TapSparkles;
