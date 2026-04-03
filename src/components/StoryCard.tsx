import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface StoryCardProps {
  id: string;
  title: string;
  cover: string;
  category: string;
  ageRange: string;
  readTime: string;
}

const StoryCard = ({ id, title, cover, category, ageRange, readTime }: StoryCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/story/${id}`} className="block group">
        <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={cover}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-3">
            <h3 className="font-extrabold text-sm leading-tight line-clamp-2 text-foreground">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                {category}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock size={10} /> {readTime}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Ages {ageRange}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;
