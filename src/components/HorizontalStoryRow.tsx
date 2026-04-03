import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StoryCardPremium from "./StoryCardPremium";
import { Story } from "@/data/stories";

interface HorizontalStoryRowProps {
  title: string;
  stories: Story[];
  badge?: "NEW" | "TRENDING" | "MOST LOVED";
  linkTo?: string;
}

const HorizontalStoryRow = ({ title, stories, badge, linkTo }: HorizontalStoryRowProps) => (
  <section className="py-4">
    <div className="flex items-center justify-between mb-3 px-4 max-w-5xl mx-auto">
      <h2 className="text-lg font-extrabold text-foreground">{title}</h2>
      {linkTo && (
        <Link to={linkTo} className="text-xs font-bold text-secondary flex items-center gap-1 hover:underline">
          See all <ArrowRight size={12} />
        </Link>
      )}
    </div>
    <div className="flex gap-3 overflow-x-auto pb-3 px-4 scrollbar-hide">
      {stories.map((story, i) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <StoryCardPremium {...story} badge={badge} />
        </motion.div>
      ))}
    </div>
  </section>
);

export default HorizontalStoryRow;
