import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Heart, TrendingUp, Sparkles, Moon, Brain, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { stories } from "@/data/stories";
import MascotInteractive from "@/components/MascotInteractive";

interface ProgressEntry {
  currentPage: number;
  totalPages: number;
  title: string;
  cover: string;
}

const Parent = () => {
  const [progress, setProgress] = useState<Record<string, ProgressEntry>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    setProgress(JSON.parse(localStorage.getItem("mopikoo-progress") || "{}"));
    setBookmarks(JSON.parse(localStorage.getItem("mopikoo-bookmarks") || "[]"));
  }, []);

  const progressEntries = Object.entries(progress);
  const bookmarkedStories = stories.filter((s) => bookmarks.includes(s.id));
  const totalPagesRead = progressEntries.reduce((sum, [, p]) => sum + p.currentPage + 1, 0);
  const completedStories = progressEntries.filter(([, p]) => p.currentPage >= p.totalPages - 1).length;

  // Determine favorite category
  const readStoryIds = Object.keys(progress);
  const readStories = stories.filter(s => readStoryIds.includes(s.id));
  const categoryCounts: Record<string, number> = {};
  readStories.forEach(s => { categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1; });
  const favoriteCategory = Object.entries(categoryCounts).sort(([, a], [, b]) => b - a)[0]?.[0];

  // Insights
  const insights = [];
  if (favoriteCategory) {
    insights.push({ icon: Brain, text: `Anak kamu suka cerita ${favoriteCategory}!`, color: "text-kid-purple" });
  }
  if (completedStories > 0) {
    insights.push({ icon: Sparkles, text: `${completedStories} cerita selesai dibaca. Hebat!`, color: "text-secondary" });
  }
  if (totalPagesRead > 10) {
    insights.push({ icon: TrendingUp, text: `Sudah ${totalPagesRead} halaman! Pertahankan! 🔥`, color: "text-kid-orange" });
  }
  if (insights.length === 0) {
    insights.push({ icon: Moon, text: "Mulai membaca cerita untuk melihat insight!", color: "text-muted-foreground" });
  }

  // Recommendations based on category
  const recommendations = [];
  if (!favoriteCategory || favoriteCategory === "Adventure") {
    recommendations.push("Coba cerita moral untuk kebiasaan baik sebelum tidur 🌙");
  }
  if (favoriteCategory === "Moral Stories") {
    recommendations.push("Tambah variasi dengan cerita petualangan seru! 🗺️");
  }
  recommendations.push("Baca bersama sebelum tidur untuk bonding yang lebih baik 💖");

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="px-4 py-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <MascotInteractive size={56} />
          <div>
            <h1 className="text-xl font-black text-foreground">Dashboard Orang Tua</h1>
            <p className="text-xs text-muted-foreground">Pantau perjalanan membaca anak kamu</p>
          </div>
        </div>

        {/* Weekly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-secondary/15 via-kid-purple/10 to-primary/10 rounded-3xl p-5 mb-6 shadow-dreamy"
        >
          <h2 className="text-sm font-extrabold text-foreground mb-3 flex items-center gap-2">
            <Clock size={16} className="text-secondary" /> Ringkasan Minggu Ini
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-2xl font-black text-secondary">{progressEntries.length}</p>
              <p className="text-[10px] font-bold text-muted-foreground">Cerita Dibaca</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-2xl font-black text-kid-orange">{totalPagesRead}</p>
              <p className="text-[10px] font-bold text-muted-foreground">Halaman</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-2xl font-black text-accent">{bookmarks.length}</p>
              <p className="text-[10px] font-bold text-muted-foreground">Favorit</p>
            </div>
          </div>
          {/* Reading streak */}
          <div className="mt-3 flex items-center gap-2 bg-card/60 rounded-2xl px-3 py-2">
            <span className="text-lg">🔥</span>
            <div>
              <p className="text-xs font-extrabold text-foreground">Streak Membaca: {Math.min(progressEntries.length, 7)} hari</p>
              <p className="text-[10px] text-muted-foreground">Pertahankan kebiasaan membaca!</p>
            </div>
          </div>
        </motion.div>

        {/* Insights */}
        <h2 className="text-base font-extrabold text-foreground mb-3 flex items-center gap-2">
          <Brain size={16} className="text-kid-purple" /> Insight
        </h2>
        <div className="space-y-2 mb-6">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-card rounded-2xl p-3 shadow-card"
            >
              <insight.icon size={18} className={insight.color} />
              <p className="text-xs font-bold text-foreground">{insight.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <h2 className="text-base font-extrabold text-foreground mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-primary" /> Rekomendasi
        </h2>
        <div className="space-y-2 mb-6">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 bg-card rounded-2xl p-3 shadow-card border-l-4 border-secondary">
              <p className="text-xs font-semibold text-muted-foreground">{rec}</p>
            </div>
          ))}
        </div>

        {/* Reading Progress */}
        <h2 className="text-base font-extrabold text-foreground mb-3 flex items-center gap-2">
          <BookOpen size={16} className="text-secondary" /> Progress Membaca
        </h2>
        {progressEntries.length > 0 ? (
          <div className="space-y-3 mb-8">
            {progressEntries.map(([storyId, p]) => {
              const pct = Math.round(((p.currentPage + 1) / p.totalPages) * 100);
              return (
                <Link key={storyId} to={`/story/${storyId}`} className="flex items-center gap-3 bg-card rounded-2xl p-3 shadow-card bounce-hover">
                  <img src={p.cover} alt="" className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">{p.title}</p>
                    <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-secondary to-kid-blue rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {p.currentPage + 1} / {p.totalPages} halaman · {pct}%
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm mb-8 bg-card rounded-2xl p-6 text-center shadow-card">
            Belum ada aktivitas membaca. Mulai cerita! 📚
          </p>
        )}

        {/* Favorites */}
        <h2 className="text-base font-extrabold text-foreground mb-3 flex items-center gap-2">
          <Heart size={16} className="text-accent" /> Cerita Favorit
        </h2>
        {bookmarkedStories.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {bookmarkedStories.map((story) => (
              <Link key={story.id} to={`/story/${story.id}`} className="bg-card rounded-2xl overflow-hidden shadow-story-card bounce-hover">
                <img src={story.cover} alt={story.title} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                <p className="p-2 text-xs font-bold text-foreground truncate">{story.title}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm bg-card rounded-2xl p-6 text-center shadow-card">
            Belum ada favorit. Bookmark cerita saat membaca! 🔖
          </p>
        )}
      </div>
    </div>
  );
};

export default Parent;
