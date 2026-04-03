import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, BookOpen, Bookmark, BookmarkCheck, Volume2, VolumeX } from "lucide-react";
import { stories } from "@/data/stories";
import mascot from "@/assets/mopikoo-mascot.png";

const StoryReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = stories.find((s) => s.id === id);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [readAloud, setReadAloud] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  // Read aloud with Web Speech API
  useEffect(() => {
    if (readAloud && story) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(story.pages[currentPage].text);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    return () => { window.speechSynthesis.cancel(); };
  }, [currentPage, readAloud, story]);

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
    if (!isLast) { setDirection(1); setCurrentPage((p) => p + 1); }
  };
  const goPrev = () => {
    if (!isFirst) { setDirection(-1); setCurrentPage((p) => p - 1); }
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("mopikoo-bookmarks") || "[]");
    const updated = bookmarked ? bookmarks.filter((b: string) => b !== id) : [...bookmarks, id];
    localStorage.setItem("mopikoo-bookmarks", JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 60) goPrev();
    if (diff < -60) goNext();
    setTouchStart(null);
  };

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 300 : -300,
      opacity: 0,
      rotateY: d > 0 ? 15 : -15,
    }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (d: number) => ({
      x: d > 0 ? -300 : 300,
      opacity: 0,
      rotateY: d > 0 ? -15 : 15,
    }),
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 glass-card">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <X size={22} className="text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-secondary" />
          <span className="text-xs font-bold text-muted-foreground">
            {currentPage + 1} / {story.pages.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setReadAloud(!readAloud)}
            className={`p-2 rounded-xl transition-colors ${readAloud ? "bg-secondary/20 text-secondary" : "hover:bg-muted text-muted-foreground"}`}
          >
            {readAloud ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button onClick={toggleBookmark} className="p-2 rounded-xl hover:bg-muted transition-colors">
            {bookmarked ? (
              <BookmarkCheck size={22} className="text-primary" />
            ) : (
              <Bookmark size={22} className="text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted/50">
        <motion.div
          className="h-full bg-gradient-to-r from-secondary to-kid-blue rounded-full"
          animate={{ width: `${((currentPage + 1) / story.pages.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Content - illustration dominant */}
      <div className="flex-1 flex flex-col relative overflow-hidden" style={{ perspective: "1200px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 250, damping: 28 }}
            className="flex-1 flex flex-col"
          >
            {/* Illustration area - 65% of screen */}
            <div className="flex-[2] bg-muted/40 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-background/80" />
              <div className="flex flex-col items-center gap-3 p-6 relative z-10">
                <motion.img
                  src={mascot}
                  alt=""
                  width={80}
                  height={80}
                  className="opacity-20"
                  animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
                <p className="text-xs text-muted-foreground font-semibold italic max-w-xs text-center">
                  🎨 {page.illustrationPrompt}
                </p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 right-6 text-2xl animate-twinkle">✨</div>
              <div className="absolute bottom-8 left-6 text-xl animate-twinkle" style={{ animationDelay: "1s" }}>⭐</div>
            </div>

            {/* Text area - soft rounded container */}
            <div className="flex-[1] flex items-center justify-center px-6 py-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-3xl p-6 shadow-dreamy max-w-lg w-full"
              >
                <p className="text-base md:text-lg font-bold text-foreground leading-relaxed text-center">
                  {page.text}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reading mode toggle */}
      <div className="flex justify-center py-2">
        <div className="inline-flex items-center bg-muted/60 rounded-full p-0.5 text-[10px] font-bold">
          <button
            onClick={() => setReadAloud(false)}
            className={`px-3 py-1 rounded-full transition-all ${!readAloud ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}
          >
            📖 Baca Sendiri
          </button>
          <button
            onClick={() => setReadAloud(true)}
            className={`px-3 py-1 rounded-full transition-all ${readAloud ? "bg-secondary text-secondary-foreground shadow-glow-secondary" : "text-muted-foreground"}`}
          >
            🔊 Dengan Suara
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="flex items-center gap-1 px-5 py-3 rounded-2xl font-bold text-sm bg-muted text-foreground disabled:opacity-30 bounce-hover"
        >
          <ChevronLeft size={18} /> Kembali
        </button>
        {isLast ? (
          <motion.button
            onClick={() => navigate("/library")}
            className="flex items-center gap-1 px-6 py-3 rounded-2xl font-extrabold text-sm bg-secondary text-secondary-foreground bounce-hover shadow-dreamy"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🎉 Tamat!
          </motion.button>
        ) : (
          <button
            onClick={goNext}
            className="flex items-center gap-1 px-6 py-3 rounded-2xl font-extrabold text-sm bg-secondary text-secondary-foreground bounce-hover shadow-dreamy"
          >
            Lanjut <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryReader;
