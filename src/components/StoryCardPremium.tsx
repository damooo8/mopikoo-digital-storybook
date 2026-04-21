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
  NEW: { icon: Sparkles, className: "bg-secondary text-secondary-foreground", label: "✨ NEW" },
  TRENDING: { icon: Flame, className: "bg-kid-orange text-white", label: "🔥 HOT" },
  "MOST LOVED": { icon: Heart, className: "bg-accent text-accent-foreground", label: "❤️ LOVED" },
};

const StoryCardPremium = ({ id, title, cover, category, ageRange, readTime, badge }: StoryCardPremiumProps) => {
  const badgeInfo = badge ? badgeConfig[badge] : null;

  return (
    <motion.div
      whileHover={{ y: -10, rotateZ: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex-shrink-0 group"
    >
      <Link to={`/story/${id}`} className="block relative">
        {/* Magical glow behind card */}
        <div className="absolute -inset-2 rounded-3xl gradient-aurora opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

        {/* Floating sparkles on hover */}
        <motion.span
          className="absolute -top-2 -right-2 text-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ rotate: 360, y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨
        </motion.span>

        <div className="relative bg-card rounded-3xl overflow-hidden floating-book group-hover:shadow-magic transition-all duration-500 w-[160px] md:w-[200px]">
          {/* Book spine illusion */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/40 via-secondary/40 to-accent/40 z-10" />

          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={cover}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Multi-layer gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-secondary/20" />

            {/* Badge */}
            {badgeInfo && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${badgeInfo.className} shadow-lg backdrop-blur-sm`}
              >
                {badgeInfo.label}
              </motion.div>
            )}

            {/* Category pill */}
            <div className="absolute bottom-2 left-2 right-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold glass-bubble text-foreground">
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
              <span className="text-[10px] font-bold text-primary">Ages {ageRange}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCardPremium;
