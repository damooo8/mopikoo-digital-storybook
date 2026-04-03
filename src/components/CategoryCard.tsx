import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  icon: string;
  color: string;
}

const colorMap: Record<string, string> = {
  "kid-purple": "from-kid-purple/20 to-kid-purple/5 border-kid-purple/30 hover:border-kid-purple/50",
  accent: "from-accent/20 to-accent/5 border-accent/30 hover:border-accent/50",
  "kid-orange": "from-kid-orange/20 to-kid-orange/5 border-kid-orange/30 hover:border-kid-orange/50",
  "kid-green": "from-kid-green/20 to-kid-green/5 border-kid-green/30 hover:border-kid-green/50",
};

const CategoryCard = ({ name, icon, color }: CategoryCardProps) => {
  const classes = colorMap[color] || colorMap["kid-purple"];

  return (
    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={`/library?category=${encodeURIComponent(name)}`}
        className={`flex flex-col items-center gap-2 p-4 rounded-3xl bg-gradient-to-b ${classes} border-2 transition-all min-w-[100px] shadow-card`}
      >
        <span className="text-3xl">{icon}</span>
        <span className="text-xs font-bold text-foreground text-center leading-tight">{name}</span>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
