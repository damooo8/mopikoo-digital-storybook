import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Star, Moon } from "lucide-react";
import Navbar from "@/components/Navbar";
import CategoryCard from "@/components/CategoryCard";
import HorizontalStoryRow from "@/components/HorizontalStoryRow";
import MascotInteractive from "@/components/MascotInteractive";
import MagicalBackground from "@/components/MagicalBackground";
import { stories, categories } from "@/data/stories";

const Index = () => {
  const [progress, setProgress] = useState<Record<string, any>>({});

  useEffect(() => {
    setProgress(JSON.parse(localStorage.getItem("mopikoo-progress") || "{}"));
  }, []);

  const continueReading = Object.entries(progress).filter(
    ([, p]: any) => p.currentPage > 0 && p.currentPage < p.totalPages - 1
  );

  return (
    <div className="min-h-screen pb-24 md:pb-0 relative">
      <Navbar />

      {/* Hero — magical world */}
      <section className="relative overflow-hidden min-h-[80vh] md:min-h-[70vh] flex items-center">
        <MagicalBackground intensity="high" />

        {/* Floating islands (decorative) */}
        <motion.div
          className="absolute -bottom-10 -left-10 w-64 h-32 rounded-[50%] bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -right-10 w-72 h-36 rounded-[50%] bg-gradient-to-tl from-accent/20 to-kid-teal/20 blur-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative px-4 py-12 md:py-16 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-bubble font-bold text-xs px-4 py-1.5 rounded-full mb-4 text-primary"
            >
              <Sparkles size={12} className="animate-twinkle" />
              Dunia ajaib menanti ✨
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-foreground leading-tight">
              Cerita sebelum tidur yang{" "}
              <span className="gradient-text">anak kamu</span> akan minta{" "}
              <span className="text-primary text-shadow-glow">lagi dan lagi</span> 🌙
            </h1>
            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-lg mx-auto md:mx-0">
              Masuki dunia di mana cerita hidup. Bangun kebiasaan membaca lewat petualangan magis bersama anak.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/library"
                className="relative inline-flex items-center gap-2 magical-button text-primary-foreground font-extrabold px-7 py-3.5 rounded-2xl text-base animate-pulse-magic"
              >
                <BookOpen size={20} />
                Mulai Petualangan
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="ml-1"
                >
                  ✨
                </motion.span>
              </Link>
              <Link
                to="/parent"
                className="inline-flex items-center gap-2 glass-bubble text-foreground font-bold px-6 py-3.5 rounded-2xl text-sm bounce-hover"
              >
                <Star size={16} className="text-primary" /> Untuk Orang Tua
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {["🧒", "👧", "👦"].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full glass-bubble flex items-center justify-center text-sm">
                    {e}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-semibold">
                Dipercaya <span className="text-primary font-extrabold">1,000+</span> keluarga
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex-shrink-0"
          >
            <MascotInteractive size={200} />
          </motion.div>
        </div>
      </section>

      {/* Continue Reading */}
      {continueReading.length > 0 && (
        <section className="px-4 py-6 max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-bubble rounded-3xl p-4"
          >
            <h2 className="text-base font-extrabold text-foreground mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-primary" /> Lanjut Membaca
            </h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {continueReading.map(([id, p]: any) => (
                <Link
                  key={id}
                  to={`/story/${id}`}
                  className="flex items-center gap-3 bg-card rounded-2xl p-3 shadow-card bounce-hover flex-shrink-0 min-w-[220px]"
                >
                  <img src={p.cover} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-foreground truncate">{p.title}</p>
                    <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden w-24">
                      <div className="h-full gradient-magic rounded-full" style={{ width: `${((p.currentPage + 1) / p.totalPages) * 100}%` }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Categories */}
      <section className="px-4 py-6 max-w-5xl mx-auto relative z-10">
        <h2 className="text-lg font-extrabold font-display text-foreground mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-primary animate-twinkle" /> Jelajahi Dunia
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CategoryCard {...cat} />
            </motion.div>
          ))}
        </div>
      </section>

      <HorizontalStoryRow
        title="🔥 Cerita Populer"
        stories={stories}
        badge="TRENDING"
        linkTo="/library"
      />

      <HorizontalStoryRow
        title="🌙 Pilihan Sebelum Tidur"
        stories={stories.filter(s => s.category === "Moral Stories" || s.ageRange === "3-5")}
        badge="MOST LOVED"
        linkTo="/library"
      />

      <HorizontalStoryRow
        title="✨ Petualangan Seru"
        stories={stories.filter(s => s.category === "Adventure")}
        badge="NEW"
        linkTo="/library"
      />

      {/* Mopikoo CTA */}
      <section className="px-4 py-10 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden glass-bubble rounded-4xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 gradient-aurora opacity-30 pointer-events-none" />
          <div className="absolute top-4 right-8 text-4xl animate-twinkle">⭐</div>
          <div className="absolute bottom-4 left-8 text-2xl animate-twinkle" style={{ animationDelay: "1s" }}>✨</div>
          <div className="relative z-10">
            <MascotInteractive size={120} mood="wave" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-extrabold font-display text-foreground">
              Hi, aku Mopikoo! 👋
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Aku teman membacamu! Yuk masuk ke dunia cerita ajaib bareng. Tap aku untuk sapa! 🎉
            </p>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 mt-4 magical-button text-primary-foreground font-extrabold px-5 py-2.5 rounded-2xl text-sm bounce-hover"
            >
              <Moon size={16} /> Cerita Sebelum Tidur
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
