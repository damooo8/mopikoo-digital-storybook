import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  icon: string;
  color: string;
}

const colorMap: Record<string, string> = {
  "kid-purple": "from-kid-purple/30 to-kid-purple/10 border-kid-purple/40",
  accent: "from-accent/30 to-accent/10 border-accent/40",
  "kid-orange": "from-kid-orange/30 to-kid-orange/10 border-kid-orange/40",
  "kid-green": "from-kid-green/30 to-kid-green/10 border-kid-green/40",
};

const CategoryCard = ({ name, icon, color }: CategoryCardProps) => {
  const classes = colorMap[color] || colorMap["kid-purple"];

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      <Link
        to={`/library?category=${encodeURIComponent(name)}`}
        className={`relative flex flex-col items-center gap-2 p-4 rounded-3xl bg-gradient-to-br ${classes} border-2 transition-all min-w-[100px] shadow-card hover:shadow-dreamy backdrop-blur-sm group overflow-hidden`}
      >
        {/* Magic shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
        <motion.span
          className="text-3xl relative z-10"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon}
        </motion.span>
        <span className="text-xs font-bold text-foreground text-center leading-tight relative z-10">{name}</span>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
