import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import mascot from "@/assets/mopikoo-mascot.png";

const hintsByRoute: Record<string, string[]> = {
  "/": [
    "Hai! Yuk kita jelajahi dunia ajaib! 🌟",
    "Geser ke samping untuk berpindah zona ➡️",
    "Tap aku kapan saja ya! 💫",
  ],
  "/library": [
    "Yuk pilih cerita ajaib! ✨",
    "Setiap buku punya petualangan baru 📖",
  ],
  "/parent": [
    "Lihat petualangan baca anak ajaib! 📊",
    "Bonding lewat cerita itu seru 💖",
  ],
};

const hintsByZone: Record<string, string[]> = {
  bedtime: ["Yuk siap-siap tidur dengan cerita 🌙", "Lembah ini hangat sekali ✨"],
  forest: ["Yuk kita ke hutan ajaib! 🌲", "Aku rasa ada portal di sini 🌀"],
  adventure: ["Petualangan menanti! 🗝️", "Berani buka peti harta karun? 🏰"],
  heart: ["Taman penuh kasih sayang 💖", "Cerita di sini menghangatkan hati 🌸"],
};

const fallback = ["Hai aku Mopikoo! 👋", "Magic awaits ✨"];

/**
 * CompanionMascot — floating page-fixed companion that:
 * 1) Waves on first arrival to a route
 * 2) Shows context-aware hints
 * 3) Reacts to taps with jump + sparkle burst
 *
 * Hidden on the StoryReader route (its own immersive mascot lives there).
 */
const CompanionMascot = () => {
  const location = useLocation();
  const [hint, setHint] = useState<string | null>(null);
  const [bounceKey, setBounceKey] = useState(0);
  const [tapKey, setTapKey] = useState(0);

  // Hide inside immersive reader
  const hidden = location.pathname.startsWith("/story/");

  // Wave + greet on route change
  useEffect(() => {
    if (hidden) return;
    const list = hintsByRoute[location.pathname] || fallback;
    const msg = list[Math.floor(Math.random() * list.length)];
    setHint(msg);
    setBounceKey((k) => k + 1);
    const t = setTimeout(() => setHint(null), 3500);
    return () => clearTimeout(t);
  }, [location.pathname, hidden]);

  // React to zone changes from the world map
  useEffect(() => {
    if (hidden) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id?: string } | undefined;
      const zoneId = detail?.id;
      if (!zoneId) return;
      const list = hintsByZone[zoneId] || fallback;
      setHint(list[Math.floor(Math.random() * list.length)]);
      setBounceKey((k) => k + 1);
    };
    window.addEventListener("mopikoo:zone", handler);
    return () => window.removeEventListener("mopikoo:zone", handler);
  }, [hidden]);

  if (hidden) return null;

  const handleTap = () => {
    const list = hintsByRoute[location.pathname] || fallback;
    setHint(list[Math.floor(Math.random() * list.length)]);
    setTapKey((k) => k + 1);
    setTimeout(() => setHint(null), 2500);
  };

  return (
    <motion.div
      className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 pointer-events-none"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 180, damping: 20 }}
    >
      {/* Hint bubble */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.85 }}
            className="absolute bottom-full right-0 mb-2 glass-bubble rounded-2xl px-3 py-2 max-w-[200px] shadow-glow-primary"
          >
            <p className="text-xs font-bold text-foreground whitespace-normal">{hint}</p>
            <div className="absolute -bottom-1 right-6 w-3 h-3 rotate-45 glass-bubble border-r border-b" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating mascot button */}
      <motion.button
        key={bounceKey}
        onClick={handleTap}
        className="pointer-events-auto relative cursor-pointer"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.85, rotate: -8 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Mopikoo companion"
      >
        {/* Halo */}
        <motion.span
          className="absolute inset-0 -m-2 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--glow-magic) / 0.6), transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <img
          src={mascot}
          alt=""
          width={72}
          height={72}
          className="relative drop-shadow-2xl select-none"
          draggable={false}
        />
        {/* Welcome wave on mount */}
        <motion.span
          key={`wave-${bounceKey}`}
          initial={{ scale: 0, opacity: 0, rotate: -30 }}
          animate={{ scale: [0, 1.2, 1, 1, 0], opacity: [0, 1, 1, 1, 0], rotate: [0, -20, 20, -20, 0] }}
          transition={{ duration: 2 }}
          className="absolute -top-2 -left-2 text-2xl"
        >
          👋
        </motion.span>

        {/* Tap burst */}
        <AnimatePresence>
          {tapKey > 0 && (
            <motion.div key={tapKey} className="absolute inset-0 pointer-events-none">
              {["✨", "⭐", "💫"].map((e, i) => (
                <motion.span
                  key={i}
                  className="absolute top-1/2 left-1/2 text-base"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                  animate={{
                    x: (Math.random() - 0.5) * 80,
                    y: -40 - Math.random() * 30,
                    opacity: 0,
                    scale: 1.2,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  {e}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default CompanionMascot;
