import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mascot from "@/assets/mopikoo-mascot.png";

const greetings = [
  "Hi there! Ready to read? 📚",
  "Let's go on an adventure! ✨",
  "Pick a story! 🌟",
  "I love reading time! 💖",
];

const MascotInteractive = ({ size = 180 }: { size?: number }) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleTap = () => {
    const msg = greetings[Math.floor(Math.random() * greetings.length)];
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className="relative">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        onClick={handleTap}
        className="cursor-pointer"
        whileTap={{ scale: 0.9, rotate: -10 }}
      >
        <img
          src={mascot}
          alt="Mopikoo mascot"
          width={size}
          height={size}
          className="drop-shadow-lg"
        />
        {/* Glow behind mascot */}
        <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-2xl scale-75" />
      </motion.div>
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card rounded-2xl px-4 py-2 shadow-dreamy whitespace-nowrap z-10"
          >
            <p className="text-xs font-bold text-foreground">{message}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-card" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MascotInteractive;
