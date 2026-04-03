import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  icon: string;
  color: string;
}

const CategoryCard = ({ name, icon, color }: CategoryCardProps) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={`/library?category=${encodeURIComponent(name)}`}
        className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-${color}/10 border-2 border-${color}/20 hover:border-${color}/40 transition-all min-w-[100px]`}
      >
        <span className="text-3xl">{icon}</span>
        <span className="text-xs font-bold text-foreground text-center leading-tight">{name}</span>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
