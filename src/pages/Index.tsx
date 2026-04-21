import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, BookOpen, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import MascotInteractive from "@/components/MascotInteractive";
import WorldZone from "@/components/WorldZone";
import StoryPortal from "@/components/StoryPortal";
import { stories } from "@/data/stories";

const Index = () => {
  const [progress, setProgress] = useState<Record<string, any>>({});

  useEffect(() => {
    setProgress(JSON.parse(localStorage.getItem("mopikoo-progress") || "{}"));
  }, []);

  const continueReading = Object.entries(progress).filter(
    ([, p]: any) => p.currentPage > 0 && p.currentPage < p.totalPages - 1
  );

  // Group stories by zone
  const bedtimeStories = stories.filter((s) => s.ageRange === "3-5" || s.category === "Moral Stories");
  const forestStories = stories.filter((s) => s.category === "Adventure" && s.ageRange !== "3-5");
  const adventureStories = stories.filter((s) => s.category === "Adventure");

  return (
    <div className="min-h-screen pb-32 md:pb-0 relative">
      <Navbar />

      {/* HERO — entry to magical world */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center px-4 py-12">
        <div className="relative max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center gap-8 z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-bubble font-bold text-xs px-4 py-1.5 rounded-full mb-4 text-primary shadow-glow-primary"
            >
              <Sparkles size={12} className="animate-twinkle" />
              Selamat datang di Dunia Mopikoo ✨
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-black font-display text-foreground leading-tight">
              Masuki dunia di mana{" "}
              <span className="gradient-text">cerita hidup</span> dan{" "}
              <span className="text-primary text-shadow-glow">petualangan menanti</span> 🌙
            </h1>
            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-lg mx-auto md:mx-0">
              Jelajahi zona-zona ajaib bersama Mopikoo. Setiap pintu, hutan, dan lembah menyimpan cerita yang akan dicintai anakmu.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/library"
                className="group relative inline-flex items-center gap-2 magical-button text-primary-foreground font-extrabold px-7 py-4 rounded-3xl text-base animate-pulse-magic"
              >
                <BookOpen size={20} />
                Mulai Petualangan
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.span>
              </Link>
              <Link
                to="/parent"
                className="inline-flex items-center gap-2 glass-bubble text-foreground font-bold px-6 py-4 rounded-3xl text-sm bounce-hover"
              >
                <Star size={16} className="text-primary" /> Untuk Orang Tua
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {["🧒", "👧", "👦"].map((e, i) => (
                  <div key={i} className="w-9 h-9 rounded-full glass-bubble flex items-center justify-center text-base">
                    {e}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-semibold">
                Dipercaya <span className="text-primary font-extrabold">1,000+</span> keluarga ajaib
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 180 }}
            className="flex-shrink-0"
          >
            <MascotInteractive size={210} mood="wave" />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl"
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ⬇️
        </motion.div>
      </section>

      {/* Continue Reading — magical bookmark portal */}
      {continueReading.length > 0 && (
        <section className="px-4 py-2 max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-bubble rounded-3xl p-4 shadow-glow-primary"
          >
            <h2 className="text-base font-extrabold text-foreground mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-primary" /> Lanjutkan Petualanganmu
            </h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {continueReading.map(([id, p]: any) => (
                <Link
                  key={id}
                  to={`/story/${id}`}
                  className="flex items-center gap-3 glass-card rounded-2xl p-3 bounce-hover flex-shrink-0 min-w-[220px]"
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

      {/* WORLD MAP — explorable zones */}
      <WorldZone
        emoji="🌙"
        name="Bedtime Valley"
        tagline="Cerita lembut untuk menutup hari dengan damai"
        accent="purple"
      >
        {bedtimeStories.map((s, i) => (
          <StoryPortal key={s.id} {...s} index={i} />
        ))}
      </WorldZone>

      <WorldZone
        emoji="🌲"
        name="Magic Forest"
        tagline="Hutan penuh keajaiban dan rasa ingin tahu"
        accent="teal"
      >
        {forestStories.map((s, i) => (
          <StoryPortal key={s.id} {...s} index={i} />
        ))}
        {forestStories.length === 0 && stories.slice(0, 2).map((s, i) => (
          <StoryPortal key={`f-${s.id}`} {...s} index={i} />
        ))}
      </WorldZone>

      <WorldZone
        emoji="🏰"
        name="Adventure Land"
        tagline="Petualangan seru untuk pemberani kecil"
        accent="orange"
      >
        {adventureStories.map((s, i) => (
          <StoryPortal key={s.id} {...s} index={i} />
        ))}
      </WorldZone>

      <WorldZone
        emoji="💖"
        name="Heart Garden"
        tagline="Cerita penuh kebaikan dan kasih sayang"
        accent="pink"
      >
        {stories.filter((s) => s.category === "Moral Stories").map((s, i) => (
          <StoryPortal key={s.id} {...s} index={i} />
        ))}
      </WorldZone>

      {/* Final invite portal */}
      <section className="px-4 py-12 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden glass-bubble rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left shadow-magic"
        >
          <div className="absolute inset-0 gradient-aurora opacity-40 pointer-events-none" />
          <div className="absolute top-4 right-8 text-4xl animate-twinkle">⭐</div>
          <div className="absolute bottom-4 left-8 text-2xl animate-twinkle" style={{ animationDelay: "1s" }}>✨</div>

          <div className="relative z-10">
            <MascotInteractive size={130} mood="celebrate" />
          </div>
          <div className="relative z-10 flex-1">
            <h3 className="text-2xl font-black font-display text-foreground">
              Siap memulai perjalanan? 🚪
            </h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Pilih buku ajaibmu — Mopikoo akan memandu langkah demi langkah dalam dunia cerita.
            </p>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 mt-5 magical-button text-primary-foreground font-extrabold px-6 py-3.5 rounded-3xl text-sm bounce-hover animate-pulse-magic"
            >
              ✨ Start Journey
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
