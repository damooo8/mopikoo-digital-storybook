import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Flame, Heart, Sparkles } from "lucide-react";

interface StoryCardPremiumProps {
  id: string;
  title: string;
  cover: string;
  category: string;
  ageRange: string;
  readTime: string;
  badge?: "NEW" | "TRENDING" | "MOST LOVED";
}

const badgeConfig = {
  NEW: { icon: Sparkles, className: "bg-secondary text-secondary-foreground", label: "NEW" },
  TRENDING: { icon: Flame, className: "bg-kid-orange text-accent-foreground", label: "🔥 TRENDING" },
  "MOST LOVED": { icon: Heart, className: "bg-accent text-accent-foreground", label: "❤️ LOVED" },
};

const StoryCardPremium = ({ id, title, cover, category, ageRange, readTime, badge }: StoryCardPremiumProps) => {
  const badgeInfo = badge ? badgeConfig[badge] : null;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex-shrink-0"
    >
      <Link to={`/story/${id}`} className="block group">
        <div className="bg-card rounded-3xl overflow-hidden shadow-story-card hover:shadow-dreamy transition-all duration-300 w-[160px] md:w-[200px]">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={cover}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            {/* Badge */}
            {badgeInfo && (
              <div className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${badgeInfo.className} shadow-lg`}>
                {badgeInfo.label}
              </div>
            )}
            {/* Category pill on image */}
            <div className="absolute bottom-2 left-2 right-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-card/90 backdrop-blur-sm text-foreground">
                {category}
              </span>
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-extrabold text-sm leading-tight line-clamp-2 text-foreground">
              {title}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock size={10} /> {readTime}
              </span>
              <span className="text-[10px] font-bold text-secondary">Ages {ageRange}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCardPremium;
