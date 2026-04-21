import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mascot from "@/assets/mopikoo-mascot.png";

const greetings = [
  "Hi there! Ready to read? 📚",
  "Let's go on an adventure! ✨",
  "Pick a story! 🌟",
  "I love reading time! 💖",
  "Once upon a time... 🌙",
  "Magic awaits! 🪄",
];

const MascotInteractive = ({ size = 180, mood = "idle" }: { size?: number; mood?: "idle" | "celebrate" | "wave" }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    const msg = greetings[Math.floor(Math.random() * greetings.length)];
    setMessage(msg);
    setTapCount((c) => c + 1);
    setTimeout(() => setMessage(null), 2500);
  };

  const idleAnim = mood === "celebrate"
    ? { y: [0, -20, 0], rotate: [-5, 5, -5] }
    : mood === "wave"
    ? { rotate: [0, -8, 8, -8, 0] }
    : { y: [0, -8, 0] };

  const idleDuration = mood === "celebrate" ? 0.8 : mood === "wave" ? 1.5 : 3;

  return (
    <div className="relative">
      {/* Magical glow ring */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--glow-magic) / 0.5) 0%, transparent 70%)",
          width: size * 1.4,
          height: size * 1.4,
          left: -size * 0.2,
          top: -size * 0.2,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sparkles around mascot */}
      <motion.span
        className="absolute -top-2 -right-2 text-xl z-20 pointer-events-none"
        animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        ✨
      </motion.span>
      <motion.span
        className="absolute -bottom-1 -left-3 text-lg z-20 pointer-events-none"
        animate={{ rotate: -360, scale: [1, 0.7, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        ⭐
      </motion.span>

      <motion.div
        animate={idleAnim}
        transition={{ duration: idleDuration, repeat: Infinity, ease: "easeInOut" }}
        onClick={handleTap}
        className="cursor-pointer relative"
        whileTap={{ scale: 0.85, rotate: -10 }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={mascot}
          alt="Mopikoo mascot"
          width={size}
          height={size}
          className="drop-shadow-2xl select-none"
          draggable={false}
        />
      </motion.div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 glass-bubble rounded-2xl px-4 py-2 whitespace-nowrap z-30"
          >
            <p className="text-xs font-bold text-foreground">{message}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 glass-bubble border-r border-b" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration confetti on tap */}
      <AnimatePresence>
        {tapCount > 0 && (
          <motion.div
            key={tapCount}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            {["💫", "✨", "⭐", "🌟"].map((e, i) => (
              <motion.span
                key={i}
                className="absolute text-xl"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 120,
                  y: -60 - Math.random() * 40,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MascotInteractive;
