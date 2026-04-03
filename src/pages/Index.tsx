import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Star, Moon } from "lucide-react";
import Navbar from "@/components/Navbar";
import CategoryCard from "@/components/CategoryCard";
import HorizontalStoryRow from "@/components/HorizontalStoryRow";
import MascotInteractive from "@/components/MascotInteractive";
import FloatingElements from "@/components/FloatingElements";
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
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/5 via-primary/5 to-background">
        <FloatingElements />
        <div className="relative px-4 py-12 md:py-20 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-secondary/15 text-secondary font-bold text-xs px-4 py-1.5 rounded-full mb-4 shadow-glow-secondary"
            >
              <Sparkles size={12} />
              Waktu baca yang ajaib ✨
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
              Cerita sebelum tidur yang{" "}
              <span className="gradient-text">anak kamu</span> akan minta{" "}
              <span className="text-secondary">lagi dan lagi</span> 🌙
            </h1>
            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-lg mx-auto md:mx-0">
              Bangun kebiasaan membaca lewat cerita penuh makna. Temani waktu baca anak dengan petualangan yang mereka cintai.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/library"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-extrabold px-7 py-3.5 rounded-2xl shadow-dreamy bounce-hover text-base"
              >
                <BookOpen size={20} />
                Mulai Membaca
              </Link>
              <Link
                to="/parent"
                className="inline-flex items-center gap-2 bg-card text-foreground font-bold px-6 py-3.5 rounded-2xl shadow-card bounce-hover text-sm border border-border"
              >
                <Star size={16} /> Untuk Orang Tua
              </Link>
            </div>
            {/* Trust badge */}
            <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {["🧒", "👧", "👦"].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm border-2 border-card">
                    {e}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-semibold">
                Dipercaya <span className="text-secondary font-extrabold">1,000+</span> keluarga
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex-shrink-0 z-10"
          >
            <MascotInteractive size={200} />
          </motion.div>
        </div>
      </section>

      {/* Continue Reading */}
      {continueReading.length > 0 && (
        <section className="px-4 py-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-secondary/10 via-primary/5 to-accent/10 rounded-3xl p-4"
          >
            <h2 className="text-base font-extrabold text-foreground mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-secondary" /> Lanjut Membaca
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
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${((p.currentPage + 1) / p.totalPages) * 100}%` }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Categories */}
      <section className="px-4 py-6 max-w-5xl mx-auto">
        <h2 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-primary" /> Jelajahi Kategori
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

      {/* Story Rows */}
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
      <section className="px-4 py-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-secondary/15 via-kid-purple/10 to-accent/10 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
        >
          <div className="absolute top-4 right-8 text-4xl animate-twinkle">⭐</div>
          <div className="absolute bottom-4 left-8 text-2xl animate-twinkle" style={{ animationDelay: "1s" }}>✨</div>
          <MascotInteractive size={100} />
          <div>
            <h3 className="text-xl font-extrabold text-foreground">
              Hi, aku Mopikoo! 👋
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Aku teman membacamu! Yuk temukan cerita seru dan mulai petualangan bareng. Tap aku untuk sapa! 🎉
            </p>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 mt-4 bg-secondary text-secondary-foreground font-extrabold px-5 py-2.5 rounded-2xl text-sm bounce-hover shadow-dreamy"
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
