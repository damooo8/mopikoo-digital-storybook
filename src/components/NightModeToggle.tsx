import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const NightModeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-500 overflow-hidden ${
        isDark
          ? "bg-gradient-to-r from-primary/40 to-secondary/40 shadow-glow-primary"
          : "bg-gradient-to-r from-secondary/30 to-primary/30 shadow-glow-secondary"
      } ${className}`}
    >
      {/* Tiny stars (visible in dark) */}
      {isDark && (
        <>
          <span className="absolute top-1 left-2 w-0.5 h-0.5 rounded-full bg-foreground/80 animate-twinkle" />
          <span className="absolute bottom-1.5 left-4 w-0.5 h-0.5 rounded-full bg-foreground/80 animate-twinkle" style={{ animationDelay: "0.5s" }} />
        </>
      )}
      <motion.div
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-6 h-6 rounded-full bg-card flex items-center justify-center shadow-md"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <Moon size={12} className="text-primary fill-primary/30" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <Sun size={12} className="text-kid-orange fill-kid-orange/40" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default NightModeToggle;
