import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Heart, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { stories } from "@/data/stories";
import mascot from "@/assets/mopikoo-mascot.png";

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

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <img src={mascot} alt="Mopikoo" width={48} height={48} />
          <div>
            <h1 className="text-2xl font-black text-foreground">Parent Dashboard</h1>
            <p className="text-sm text-muted-foreground">Track your child's reading journey</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <StatCard icon={<BookOpen size={20} className="text-secondary" />} value={progressEntries.length} label="Stories" />
          <StatCard icon={<TrendingUp size={20} className="text-kid-orange" />} value={totalPagesRead} label="Pages Read" />
          <StatCard icon={<Heart size={20} className="text-accent" />} value={bookmarks.length} label="Favorites" />
        </div>

        {/* Reading Progress */}
        <h2 className="text-lg font-extrabold text-foreground mb-3">📖 Reading Progress</h2>
        {progressEntries.length > 0 ? (
          <div className="space-y-3 mb-8">
            {progressEntries.map(([storyId, p]) => (
              <Link key={storyId} to={`/story/${storyId}`} className="flex items-center gap-3 bg-card rounded-2xl p-3 shadow-card bounce-hover">
                <img src={p.cover} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">{p.title}</p>
                  <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-all"
                      style={{ width: `${((p.currentPage + 1) / p.totalPages) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {p.currentPage + 1} / {p.totalPages} pages
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm mb-8 bg-card rounded-2xl p-6 text-center">
            No reading activity yet. Start a story! 📚
          </p>
        )}

        {/* Favorites */}
        <h2 className="text-lg font-extrabold text-foreground mb-3">💖 Favorite Stories</h2>
        {bookmarkedStories.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {bookmarkedStories.map((story) => (
              <Link key={story.id} to={`/story/${story.id}`} className="bg-card rounded-2xl overflow-hidden shadow-card bounce-hover">
                <img src={story.cover} alt={story.title} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                <p className="p-2 text-xs font-bold text-foreground truncate">{story.title}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm bg-card rounded-2xl p-6 text-center">
            No favorites yet. Bookmark stories while reading! 🔖
          </p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) => (
  <div className="bg-card rounded-2xl p-4 shadow-card text-center">
    <div className="flex justify-center mb-1">{icon}</div>
    <p className="text-2xl font-black text-foreground">{value}</p>
    <p className="text-[10px] font-bold text-muted-foreground">{label}</p>
  </div>
);

export default Parent;
