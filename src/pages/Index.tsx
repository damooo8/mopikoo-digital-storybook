import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import StoryCard from "@/components/StoryCard";
import CategoryCard from "@/components/CategoryCard";
import { stories, categories } from "@/data/stories";
import mascot from "@/assets/mopikoo-mascot.png";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="relative px-4 py-10 md:py-16 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary font-bold text-sm px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={14} />
              Welcome to Mopikoo!
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
              Stories that make<br />
              <span className="text-secondary">reading magical</span> ✨
            </h1>
            <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-md mx-auto md:mx-0">
              Discover fun, colorful stories that kids love and parents trust. Let's start reading!
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/library"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-extrabold px-6 py-3 rounded-2xl shadow-playful bounce-hover text-base"
              >
                <BookOpen size={20} />
                Start Reading
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <img
              src={mascot}
              alt="Mopikoo mascot"
              width={200}
              height={200}
              className="animate-float drop-shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-8 max-w-5xl mx-auto">
        <h2 className="text-xl font-extrabold text-foreground mb-4">Explore Categories</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </div>
      </section>

      {/* Featured Stories */}
      <section className="px-4 py-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-foreground">Featured Stories</h2>
          <Link
            to="/library"
            className="text-sm font-bold text-secondary flex items-center gap-1 hover:underline"
          >
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stories.map((story) => (
            <StoryCard key={story.id} {...story} />
          ))}
        </div>
      </section>

      {/* Mopikoo CTA */}
      <section className="px-4 py-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/10 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
        >
          <img src={mascot} alt="Mopikoo" width={100} height={100} loading="lazy" className="animate-wiggle" />
          <div>
            <h3 className="text-xl font-extrabold text-foreground">
              Hi, I'm Mopikoo! 👋
            </h3>
            <p className="text-muted-foreground mt-1">
              I'll be your reading buddy! Let's discover amazing stories together and go on exciting adventures.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
