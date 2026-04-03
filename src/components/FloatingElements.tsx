import { motion } from "framer-motion";

const stars = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
  size: 4 + Math.random() * 8,
}));

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {stars.map((star) => (
      <motion.div
        key={star.id}
        className="absolute rounded-full bg-primary/40"
        style={{
          left: star.left,
          top: `${10 + Math.random() * 80}%`,
          width: star.size,
          height: star.size,
        }}
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [0.8, 1.3, 0.8],
          y: [0, -15, 0],
        }}
        transition={{
          duration: star.duration,
          delay: star.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
    {/* Soft glowing orbs */}
    <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-3xl animate-pulse-glow" />
    <div className="absolute bottom-20 left-5 w-24 h-24 rounded-full bg-accent/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
    <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
  </div>
);

export default FloatingElements;
