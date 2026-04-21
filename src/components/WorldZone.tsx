import { ReactNode } from "react";
import { motion } from "framer-motion";

interface WorldZoneProps {
  emoji: string;
  name: string;
  tagline: string;
  accent: "purple" | "teal" | "orange" | "pink";
  children: ReactNode;
}

const accentStyles: Record<WorldZoneProps["accent"], { glow: string; chip: string; border: string }> = {
  purple: {
    glow: "from-primary/30 via-primary/10 to-transparent",
    chip: "bg-primary/20 text-primary border-primary/40",
    border: "border-primary/30",
  },
  teal: {
    glow: "from-secondary/30 via-secondary/10 to-transparent",
    chip: "bg-secondary/20 text-secondary border-secondary/40",
    border: "border-secondary/30",
  },
  orange: {
    glow: "from-kid-orange/30 via-kid-orange/10 to-transparent",
    chip: "bg-kid-orange/20 text-kid-orange border-kid-orange/40",
    border: "border-kid-orange/30",
  },
  pink: {
    glow: "from-accent/30 via-accent/10 to-transparent",
    chip: "bg-accent/20 text-accent border-accent/40",
    border: "border-accent/30",
  },
};

/**
 * WorldZone — a thematic region in the magical world map.
 * Each zone has its own ambient glow, signpost-style header,
 * and hosts a horizontal cluster of story portals.
 */
const WorldZone = ({ emoji, name, tagline, accent, children }: WorldZoneProps) => {
  const style = accentStyles[accent];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-10"
    >
      {/* Zone ambient glow */}
      <div className={`absolute inset-0 bg-gradient-radial ${style.glow} opacity-60 blur-3xl pointer-events-none`} />

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Signpost header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-5"
        >
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`w-14 h-14 rounded-3xl glass-bubble border-2 ${style.border} flex items-center justify-center text-3xl shadow-glow-magic`}
          >
            {emoji}
          </motion.div>
          <div>
            <div className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${style.chip} mb-1`}>
              Zona Ajaib
            </div>
            <h2 className="text-xl md:text-2xl font-black font-display text-foreground leading-tight">
              {name}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-semibold">{tagline}</p>
          </div>
        </motion.div>

        {/* Story cluster */}
        <div className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-hide -mx-4 px-4">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default WorldZone;
