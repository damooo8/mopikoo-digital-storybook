import { motion } from "framer-motion";
import mascot from "@/assets/mopikoo-mascot.png";

const MagicalLoader = ({ message = "Loading magic..." }: { message?: string }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--glow-magic) / 0.6), transparent 70%)" }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.img
        src={mascot}
        alt=""
        width={80}
        height={80}
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative drop-shadow-lg"
      />
    </div>
    <motion.p
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-sm font-bold text-muted-foreground"
    >
      {message}
    </motion.p>
  </div>
);

export default MagicalLoader;
