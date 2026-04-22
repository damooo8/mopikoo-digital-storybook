import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export type ObjectKind = "book" | "portal" | "chest" | "heart";

interface StoryObjectProps {
  id: string;
  title: string;
  cover: string;
  ageRange: string;
  moral?: string;
  index?: number;
  kind: ObjectKind;
  completed?: boolean;
}

/**
 * StoryObject — themed world object replacing flat cards.
 * Variants per zone: book (Bedtime), portal (Forest), chest (Adventure), heart (Garden).
 * Always floats, glows on hover, and emits sparkles.
 */
const StoryObject = ({
  id,
  title,
  cover,
  ageRange,
  moral,
  index = 0,
  kind,
  completed,
}: StoryObjectProps) => {
  const frame = {
    book: {
      shape: "rounded-[1.25rem]",
      ring: "ring-primary/40",
      halo: "from-primary/50 via-accent/30 to-transparent",
      label: "Buku Ajaib",
      icon: "📖",
    },
    portal: {
      shape: "rounded-full",
      ring: "ring-secondary/50",
      halo: "from-secondary/60 via-primary/30 to-transparent",
      label: "Portal Hutan",
      icon: "🌀",
    },
    chest: {
      shape: "rounded-[1rem]",
      ring: "ring-kid-orange/50",
      halo: "from-kid-orange/60 via-accent/30 to-transparent",
      label: "Peti Petualangan",
      icon: "🗝️",
    },
    heart: {
      shape: "rounded-[2rem]",
      ring: "ring-accent/50",
      halo: "from-accent/60 via-kid-pink/30 to-transparent",
      label: "Bunga Hati",
      icon: "💝",
    },
  }[kind];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 140, damping: 16 }}
      className="flex-shrink-0"
    >
      <Link to={`/story/${id}`} className="group block relative w-[180px] md:w-[210px]">
        {/* Outer pulsing halo */}
        <motion.div
          className={`absolute -inset-6 ${frame.shape} bg-gradient-radial ${frame.halo} opacity-40 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none`}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 3.5 + (index % 3) * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating wrapper */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4 + (index % 3),
            delay: index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          {/* Object body */}
          <motion.div
            whileHover={{ rotateY: -10, rotateX: 6, scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
            style={{ transformStyle: "preserve-3d", perspective: "900px" }}
            className={`relative aspect-[3/4] ${frame.shape} overflow-hidden floating-book ring-2 ${frame.ring}`}
          >
            <img src={cover} alt={title} loading="lazy" className="w-full h-full object-cover" />

            {/* Themed overlay tint */}
            <div className="absolute inset-0 gradient-aurora opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-foreground/50" />

            {/* Portal swirl ring (only forest) */}
            {kind === "portal" && (
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-secondary/60 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ borderStyle: "dashed" }}
              />
            )}

            {/* Chest lock band (only adventure) */}
            {kind === "chest" && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-gradient-to-r from-kid-orange/70 via-accent/50 to-kid-orange/70 shadow-glow-accent pointer-events-none" />
            )}

            {/* Top kind chip */}
            <div className="absolute top-2 left-2 glass-bubble px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="text-[11px]">{frame.icon}</span>
              <span className="text-[10px] font-extrabold text-foreground">{ageRange}</span>
            </div>

            {/* Completed glow */}
            {completed && (
              <div className="absolute top-2 right-2 glass-bubble px-1.5 py-0.5 rounded-full">
                <span className="text-[10px] font-extrabold text-primary">✓</span>
              </div>
            )}

            {/* Moral chip */}
            {moral && (
              <div className="absolute bottom-2 left-2 right-2 glass-bubble px-2 py-1 rounded-xl">
                <p className="text-[10px] font-bold text-foreground truncate">✨ {moral}</p>
              </div>
            )}
          </motion.div>

          {/* Floating sparkle satellites */}
          <motion.span
            className="absolute -top-2 -right-2 text-base opacity-60 group-hover:opacity-100 pointer-events-none"
            animate={{ rotate: 360, y: [0, -6, 0] }}
            transition={{ rotate: { duration: 5, repeat: Infinity, ease: "linear" }, y: { duration: 2, repeat: Infinity } }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute -bottom-3 -left-3 text-sm opacity-50 group-hover:opacity-100 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            ⭐
          </motion.span>
        </motion.div>

        {/* Title */}
        <h3 className="mt-3 text-sm font-extrabold font-display text-foreground text-center line-clamp-2 px-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </Link>
    </motion.div>
  );
};

export default StoryObject;
