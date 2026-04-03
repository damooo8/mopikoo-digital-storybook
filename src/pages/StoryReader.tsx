import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, BookOpen, Bookmark, BookmarkCheck } from "lucide-react";
import { stories } from "@/data/stories";
import mascot from "@/assets/mopikoo-mascot.png";

const StoryReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = stories.find((s) => s.id === id);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (story) {
      const progress = JSON.parse(localStorage.getItem("mopikoo-progress") || "{}");
      progress[story.id] = { currentPage, totalPages: story.pages.length, title: story.title, cover: story.cover };
      localStorage.setItem("mopikoo-progress", JSON.stringify(progress));
    }
  }, [currentPage, story]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("mopikoo-bookmarks") || "[]");
    setBookmarked(bookmarks.includes(id));
  }, [id]);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-bold">Story not found 😔</p>
      </div>
    );
  }

  const page = story.pages[currentPage];
  const isFirst = currentPage === 0;
  const isLast = currentPage === story.pages.length - 1;

  const goNext = () => {
    if (!isLast) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("mopikoo-bookmarks") || "[]");
    const updated = bookmarked ? bookmarks.filter((b: string) => b !== id) : [...bookmarks, id];
    localStorage.setItem("mopikoo-bookmarks", JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };

  // Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 60) goPrev();
    if (diff < -60) goNext();
    setTouchStart(null);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-card shadow-card">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <X size={22} className="text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-secondary" />
          <span className="text-xs font-bold text-muted-foreground">
            {currentPage + 1} / {story.pages.length}
          </span>
        </div>
        <button onClick={toggleBookmark} className="p-2 rounded-xl hover:bg-muted transition-colors">
          {bookmarked ? (
            <BookmarkCheck size={22} className="text-primary" />
          ) : (
            <Bookmark size={22} className="text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-secondary transition-all duration-300 rounded-full"
          style={{ width: `${((currentPage + 1) / story.pages.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto w-full relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full text-center"
          >
            {/* Illustration placeholder */}
            <div className="w-full aspect-[4/3] bg-muted rounded-3xl mb-6 flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center gap-3 p-6">
                <img src={mascot} alt="" width={60} height={60} className="opacity-30" />
                <p className="text-xs text-muted-foreground font-semibold italic max-w-xs">
                  🎨 {page.illustrationPrompt}
                </p>
              </div>
            </div>

            {/* Text */}
            <p className="text-lg md:text-xl font-bold text-foreground leading-relaxed">
              {page.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="flex items-center gap-1 px-5 py-3 rounded-2xl font-bold text-sm bg-muted text-foreground disabled:opacity-30 bounce-hover"
        >
          <ChevronLeft size={18} /> Back
        </button>
        {isLast ? (
          <button
            onClick={() => navigate("/library")}
            className="flex items-center gap-1 px-5 py-3 rounded-2xl font-extrabold text-sm bg-secondary text-secondary-foreground bounce-hover"
          >
            🎉 The End!
          </button>
        ) : (
          <button
            onClick={goNext}
            className="flex items-center gap-1 px-5 py-3 rounded-2xl font-extrabold text-sm bg-secondary text-secondary-foreground bounce-hover"
          >
            Next <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryReader;
