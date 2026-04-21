import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface StoryPortalProps {
  id: string;
  title: string;
  cover: string;
  ageRange: string;
  moral?: string;
  index?: number;
}

/**
 * StoryPortal — a magical floating book object.
 * Replaces flat cards: floats gently, glows on hover, emits sparkles.
 */
const StoryPortal = ({ id, title, cover, ageRange, moral, index = 0 }: StoryPortalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 150, damping: 18 }}
      className="flex-shrink-0"
    >
      <Link to={`/story/${id}`} className="group block relative w-[160px] md:w-[180px]">
        {/* Floating glow halo */}
        <motion.div
          className="absolute -inset-4 rounded-[2.5rem] opacity-40 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
          style={{ background: "var(--gradient-magic)" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating book wrapper */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4 + (index % 3),
            delay: index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          {/* Book spine shadow (depth) */}
          <div className="absolute inset-y-2 -left-1 w-2 rounded-l-md bg-gradient-to-b from-primary/40 to-accent/40 blur-sm" />

          {/* Book cover */}
          <motion.div
            whileHover={{ rotateY: -12, rotateX: 4, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden floating-book"
          >
            <img
              src={cover}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Top shine */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-foreground/40" />
            {/* Magical aurora overlay on hover */}
            <div className="absolute inset-0 gradient-aurora opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Age badge */}
            <div className="absolute top-2 left-2 glass-bubble px-2 py-0.5 rounded-full">
              <span className="text-[10px] font-extrabold text-foreground">{ageRange}</span>
            </div>

            {/* Moral chip */}
            {moral && (
              <div className="absolute bottom-2 left-2 right-2 glass-bubble px-2 py-1 rounded-xl">
                <p className="text-[10px] font-bold text-foreground truncate">✨ {moral}</p>
              </div>
            )}
          </motion.div>

          {/* Floating sparkles around book on hover */}
          <motion.span
            className="absolute -top-1 -right-1 text-base opacity-0 group-hover:opacity-100 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute -bottom-2 -left-2 text-sm opacity-0 group-hover:opacity-100 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
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

export default StoryPortal;
