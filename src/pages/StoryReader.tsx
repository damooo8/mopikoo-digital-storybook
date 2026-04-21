import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, X, BookOpen, Bookmark, BookmarkCheck, Volume2, VolumeX } from "lucide-react";
import { stories } from "@/data/stories";
import MascotInteractive from "@/components/MascotInteractive";
import MagicalBackground from "@/components/MagicalBackground";

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
  const [showCelebration, setShowCelebration] = useState(false);

  // Parallax mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const fgX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const fgY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const containerRef = useRef<HTMLDivElement>(null);

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

  // Show celebration on last page
  useEffect(() => {
    if (story && currentPage === story.pages.length - 1) {
      setShowCelebration(true);
    } else {
      setShowCelebration(false);
    }
  }, [currentPage, story]);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // 3D book-flip variants
  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 400 : -400,
      opacity: 0,
      rotateY: d > 0 ? 35 : -35,
      scale: 0.9,
    }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -400 : 400,
      opacity: 0,
      rotateY: d > 0 ? -35 : 35,
      scale: 0.9,
    }),
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient magical background */}
      <div className="absolute inset-0 -z-10">
        <MagicalBackground intensity="high" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 glass-card">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted/60 transition-colors">
          <X size={22} className="text-foreground" />
        </button>
        <div className="flex items-center gap-2 glass-bubble px-3 py-1 rounded-full">
          <BookOpen size={14} className="text-primary" />
          <span className="text-xs font-bold text-foreground">
            {currentPage + 1} / {story.pages.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setReadAloud(!readAloud)}
            className={`p-2 rounded-xl transition-colors ${readAloud ? "bg-primary/20 text-primary shadow-glow-primary" : "hover:bg-muted/60 text-muted-foreground"}`}
            aria-label="Toggle read aloud"
          >
            {readAloud ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button onClick={toggleBookmark} className="p-2 rounded-xl hover:bg-muted/60 transition-colors" aria-label="Bookmark">
            {bookmarked ? (
              <BookmarkCheck size={22} className="text-primary fill-primary/30" />
            ) : (
              <Bookmark size={22} className="text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-20 h-1.5 bg-muted/40">
        <motion.div
          className="h-full gradient-magic rounded-full shadow-glow-primary"
          animate={{ width: `${((currentPage + 1) / story.pages.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Content - illustration dominant */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="flex-1 flex flex-col relative overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex-1 flex flex-col"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Illustration area - 65% with parallax layers */}
            <div className="flex-[2] relative flex items-center justify-center overflow-hidden">
              {/* Background parallax layer */}
              <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 gradient-aurora opacity-50" />
                {/* Distant stars */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-foreground/40 blur-sm" />
                <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-primary/60 blur-sm" />
                <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-secondary/50 blur-sm" />
              </motion.div>

              {/* Midground glow */}
              <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 blur-3xl" />
              </motion.div>

              {/* Foreground illustration placeholder */}
              <motion.div
                style={{ x: fgX, y: fgY }}
                className="relative z-10 flex flex-col items-center gap-4 p-6"
              >
                <motion.div
                  animate={isSpeaking ? { scale: [1, 1.1, 1] } : { y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: isSpeaking ? 0.6 : 3, ease: "easeInOut" }}
                >
                  <MascotInteractive size={120} mood={isSpeaking ? "celebrate" : "idle"} />
                </motion.div>
                <div className="glass-bubble rounded-2xl px-4 py-2 max-w-xs">
                  <p className="text-xs text-muted-foreground font-semibold italic text-center">
                    🎨 {page.illustrationPrompt}
                  </p>
                </div>
              </motion.div>

              {/* Decorative twinkling */}
              <div className="absolute top-6 right-8 text-2xl animate-twinkle">✨</div>
              <div className="absolute bottom-12 left-8 text-xl animate-twinkle" style={{ animationDelay: "1s" }}>⭐</div>
              <div className="absolute top-1/2 right-12 text-lg animate-twinkle" style={{ animationDelay: "2s" }}>💫</div>
            </div>

            {/* Text area - soft semi-transparent bubble */}
            <div className="flex-[1] flex items-center justify-center px-6 py-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-bubble rounded-3xl p-6 max-w-lg w-full relative"
              >
                {/* Highlight strip when speaking */}
                {isSpeaking && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ boxShadow: "inset 0 0 20px hsl(var(--glow-primary) / 0.5)" }}
                  />
                )}
                <p className={`text-base md:text-lg font-bold leading-relaxed text-center transition-colors ${
                  isSpeaking ? "text-primary" : "text-foreground"
                }`}>
                  {page.text}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Celebration overlay on last page */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center z-20"
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    opacity: [0, 1, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 2, delay: i * 0.05, repeat: Infinity, repeatDelay: 1 }}
                >
                  {["✨", "⭐", "🌟", "💫", "🎉"][i % 5]}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reading mode toggle */}
      <div className="relative z-20 flex justify-center py-2">
        <div className="inline-flex items-center glass-bubble rounded-full p-0.5 text-[10px] font-bold">
          <button
            onClick={() => setReadAloud(false)}
            className={`px-3 py-1 rounded-full transition-all ${!readAloud ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}
          >
            📖 Baca Sendiri
          </button>
          <button
            onClick={() => setReadAloud(true)}
            className={`px-3 py-1 rounded-full transition-all ${readAloud ? "magical-button text-primary-foreground" : "text-muted-foreground"}`}
          >
            🔊 Dengan Suara
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="flex items-center gap-1 px-5 py-3 rounded-2xl font-bold text-sm glass-bubble text-foreground disabled:opacity-30 bounce-hover"
        >
          <ChevronLeft size={18} /> Kembali
        </button>
        {isLast ? (
          <motion.button
            onClick={() => navigate("/library")}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm magical-button text-primary-foreground bounce-hover animate-pulse-magic"
          >
            🎉 Tamat!
          </motion.button>
        ) : (
          <button
            onClick={goNext}
            className="flex items-center gap-1 px-6 py-3 rounded-2xl font-extrabold text-sm magical-button text-primary-foreground bounce-hover"
          >
            Lanjut <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryReader;
