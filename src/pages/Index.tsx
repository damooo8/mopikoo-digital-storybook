import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import MascotInteractive from "@/components/MascotInteractive";
import WorldMap, { WorldZoneDef } from "@/components/WorldMap";
import StoryObject from "@/components/StoryObject";
import { stories } from "@/data/stories";

const Index = () => {
  const [progress, setProgress] = useState<Record<string, any>>({});
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setProgress(JSON.parse(localStorage.getItem("mopikoo-progress") || "{}"));
  }, []);

  const completedIds = useMemo(
    () =>
      new Set(
        Object.entries(progress)
          .filter(([, p]: any) => p.currentPage >= p.totalPages - 1)
          .map(([id]) => id)
      ),
    [progress]
  );
  const hasAnyProgress = Object.keys(progress).length > 0;

  // Group stories by zone (with sensible fallbacks)
  const bedtime = stories.filter((s) => s.ageRange === "3-5" || s.category === "Moral Stories");
  const forest = stories.filter((s) => s.category === "Adventure");
  const adventure = stories.filter((s) => s.category === "Adventure");
  const heart = stories.filter((s) => s.category === "Moral Stories");

  const zones: WorldZoneDef[] = [
    {
      id: "bedtime",
      emoji: "🌙",
      name: "Bedtime Valley",
      tagline: "Lembah hangat untuk cerita pengantar tidur",
      accent: "purple",
      backdrop:
        "bg-[linear-gradient(180deg,hsl(265_60%_22%)_0%,hsl(285_55%_30%)_50%,hsl(25_70%_55%)_100%)] dark:bg-[linear-gradient(180deg,hsl(245_60%_8%)_0%,hsl(275_55%_18%)_55%,hsl(25_60%_30%)_100%)]",
      children: bedtime.map((s, i) => (
        <StoryObject key={s.id} {...s} index={i} kind="book" completed={completedIds.has(s.id)} />
      )),
    },
    {
      id: "forest",
      emoji: "🌲",
      name: "Magic Forest",
      tagline: "Hutan mistis penuh portal dan rahasia ajaib",
      accent: "teal",
      backdrop:
        "bg-[linear-gradient(180deg,hsl(195_70%_45%)_0%,hsl(180_60%_35%)_50%,hsl(165_60%_25%)_100%)] dark:bg-[linear-gradient(180deg,hsl(195_60%_12%)_0%,hsl(180_55%_18%)_50%,hsl(165_60%_14%)_100%)]",
      children: forest.map((s, i) => (
        <StoryObject key={s.id} {...s} index={i} kind="portal" completed={completedIds.has(s.id)} />
      )),
    },
    {
      id: "adventure",
      emoji: "🏰",
      name: "Adventure Land",
      tagline: "Dunia berani — kastil, peta, dan harta karun",
      accent: "orange",
      backdrop:
        "bg-[linear-gradient(180deg,hsl(35_95%_70%)_0%,hsl(20_85%_60%)_50%,hsl(330_70%_55%)_100%)] dark:bg-[linear-gradient(180deg,hsl(25_70%_25%)_0%,hsl(15_65%_22%)_50%,hsl(330_50%_22%)_100%)]",
      children: adventure.map((s, i) => (
        <StoryObject key={s.id} {...s} index={i} kind="chest" completed={completedIds.has(s.id)} />
      )),
    },
    {
      id: "heart",
      emoji: "💖",
      name: "Heart Garden",
      tagline: "Taman tersembunyi penuh kasih sayang",
      accent: "pink",
      locked: !hasAnyProgress,
      backdrop:
        "bg-[linear-gradient(180deg,hsl(330_85%_75%)_0%,hsl(310_75%_70%)_50%,hsl(280_65%_60%)_100%)] dark:bg-[linear-gradient(180deg,hsl(330_55%_20%)_0%,hsl(310_50%_18%)_50%,hsl(280_55%_18%)_100%)]",
      children: heart.map((s, i) => (
        <StoryObject key={s.id} {...s} index={i} kind="heart" completed={completedIds.has(s.id)} />
      )),
    },
  ];

  const handleZoneChange = (zone: WorldZoneDef) => {
    // Notify the global mascot
    window.dispatchEvent(new CustomEvent("mopikoo:zone", { detail: zone }));
  };

  // ───────────────────────── Entry portal screen ─────────────────────────
  if (!entered) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <Navbar />
        <div className="relative max-w-2xl w-full text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-bubble font-bold text-xs px-4 py-1.5 rounded-full mb-5 text-primary shadow-glow-primary"
          >
            <Sparkles size={12} className="animate-pulse" />
            Selamat datang di Dunia Mopikoo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-5xl font-black font-display text-foreground leading-tight"
          >
            Sebuah dunia di mana <span className="gradient-text">cerita hidup</span>{" "}
            menanti untuk dijelajahi 🌙
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-muted-foreground text-base md:text-lg"
          >
            Geser ke samping untuk berpindah dari Lembah Tidur, Hutan Ajaib, hingga Tanah Petualangan.
            Mopikoo akan memandumu di setiap zona ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 180 }}
            className="my-8 flex justify-center"
          >
            <MascotInteractive size={180} mood="wave" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <button
              onClick={() => setEntered(true)}
              className="group relative inline-flex items-center gap-2 magical-button text-primary-foreground font-extrabold px-8 py-4 rounded-3xl text-base animate-pulse"
            >
              <BookOpen size={20} />
              Masuk ke Dunia Ajaib
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.span>
            </button>
            <Link
              to="/parent"
              className="inline-flex items-center gap-2 glass-bubble text-foreground font-bold px-6 py-4 rounded-3xl text-sm bounce-hover"
            >
              Untuk Orang Tua
            </Link>
          </motion.div>

          {/* Zone preview pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-2 justify-center"
          >
            {zones.map((z, i) => (
              <span
                key={z.id}
                className="glass-bubble rounded-full px-3 py-1.5 text-xs font-bold text-foreground flex items-center gap-1.5"
              >
                <span>{z.emoji}</span> {z.name}
                {z.locked && <span className="opacity-60">🔒</span>}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  // ───────────────────────── World map view ─────────────────────────
  return (
    <div className="relative h-screen overflow-hidden">
      <Navbar />
      <WorldMap zones={zones} onZoneChange={handleZoneChange} />
    </div>
  );
};

export default Index;
