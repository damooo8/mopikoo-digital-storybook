import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";

export interface WorldZoneDef {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  /** Tailwind classes for the zone's own gradient backdrop */
  backdrop: string;
  /** Color for the trail dot + accents */
  accent: "purple" | "teal" | "orange" | "pink";
  locked?: boolean;
  children: ReactNode;
}

interface WorldMapProps {
  zones: WorldZoneDef[];
  onZoneChange?: (zone: WorldZoneDef) => void;
}

const accentColor: Record<WorldZoneDef["accent"], string> = {
  purple: "hsl(var(--primary))",
  teal: "hsl(var(--secondary))",
  orange: "hsl(var(--kid-orange))",
  pink: "hsl(var(--accent))",
};

/**
 * WorldMap — horizontal scrollable world built of distinct zones.
 * Drag/swipe friendly, parallax decor per zone, journey trail at the bottom,
 * and "You are here" tracking via IntersectionObserver.
 */
const WorldMap = ({ zones, onZoneChange }: WorldMapProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const zoneRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll position for parallax (sky shifts slower than midground)
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const skyX = useTransform(scrollXProgress, [0, 1], ["0%", "-15%"]);
  const midX = useTransform(scrollXProgress, [0, 1], ["0%", "-35%"]);

  // Detect active zone using IntersectionObserver
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = zoneRefs.current.findIndex((el) => el === visible.target);
          if (idx >= 0 && idx !== activeIndex) {
            setActiveIndex(idx);
            onZoneChange?.(zones[idx]);
          }
        }
      },
      { root, threshold: [0.4, 0.6, 0.8] }
    );
    zoneRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [zones, activeIndex, onZoneChange]);

  const goTo = (i: number) => {
    const el = zoneRefs.current[i];
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="relative overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex" style={{ width: `${zones.length * 100}vw` }}>
          {zones.map((zone, i) => {
            const isActive = i === activeIndex;
            return (
              <section
                key={zone.id}
                ref={(el) => (zoneRefs.current[i] = el)}
                className="relative w-screen flex-shrink-0 snap-center min-h-[100vh] md:min-h-[90vh] flex items-center justify-center px-4 py-16 overflow-hidden"
              >
                {/* Zone-specific backdrop */}
                <div className={`absolute inset-0 ${zone.backdrop} transition-opacity duration-700`} />

                {/* Parallax sky layer (decor per zone) */}
                <motion.div
                  style={{ x: skyX }}
                  className="absolute inset-0 pointer-events-none opacity-70"
                >
                  <ZoneDecorBack accent={zone.accent} />
                </motion.div>

                {/* Parallax midground layer */}
                <motion.div
                  style={{ x: midX }}
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                >
                  <ZoneDecorMid accent={zone.accent} kind={zone.id} />
                </motion.div>

                {/* Locked overlay */}
                {zone.locked && (
                  <div className="absolute inset-0 backdrop-blur-md bg-background/40 z-20 flex items-center justify-center pointer-events-none">
                    <div className="glass-bubble rounded-3xl px-6 py-4 flex items-center gap-3 shadow-glow-magic">
                      <Lock size={22} className="text-primary" />
                      <div>
                        <p className="text-xs font-extrabold text-foreground">Zona Tersembunyi</p>
                        <p className="text-[11px] text-muted-foreground">Selesaikan 1 cerita untuk membuka 💝</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Zone content */}
                <div className="relative z-10 w-full max-w-5xl mx-auto">
                  {/* Signpost */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-6"
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-3xl glass-bubble flex items-center justify-center text-4xl shadow-glow-magic mb-3"
                      style={{ borderColor: accentColor[zone.accent] }}
                    >
                      {zone.emoji}
                    </motion.div>
                    <div
                      className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border glass-bubble mb-1"
                      style={{ color: accentColor[zone.accent] }}
                    >
                      Zona {i + 1} dari {zones.length}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black font-display text-foreground leading-tight">
                      {zone.name}
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground font-semibold mt-1 max-w-md">
                      {zone.tagline}
                    </p>
                  </motion.div>

                  {/* Story objects cluster */}
                  <div className="flex gap-6 md:gap-8 justify-start md:justify-center overflow-x-auto scrollbar-hide pb-8 px-2 -mx-2 flex-wrap md:flex-nowrap">
                    {zone.children}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => goTo(Math.max(0, activeIndex - 1))}
        disabled={activeIndex === 0}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-bubble items-center justify-center shadow-glow-primary disabled:opacity-30 disabled:cursor-not-allowed bounce-hover z-30"
        aria-label="Zona sebelumnya"
      >
        <ChevronLeft className="text-primary" />
      </button>
      <button
        onClick={() => goTo(Math.min(zones.length - 1, activeIndex + 1))}
        disabled={activeIndex === zones.length - 1}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-bubble items-center justify-center shadow-glow-primary disabled:opacity-30 disabled:cursor-not-allowed bounce-hover z-30"
        aria-label="Zona berikutnya"
      >
        <ChevronRight className="text-primary" />
      </button>

      {/* Journey trail (bottom) */}
      <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <div className="glass-bubble rounded-full px-4 py-2.5 flex items-center gap-3 shadow-glow-magic">
          {zones.map((z, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={z.id}
                onClick={() => goTo(i)}
                className="relative flex items-center gap-1.5 group"
                aria-label={`Pergi ke ${z.name}`}
              >
                {i > 0 && (
                  <span
                    className="absolute right-full mr-1 w-3 h-0.5 rounded-full"
                    style={{ background: i <= activeIndex ? accentColor[z.accent] : "hsl(var(--muted))" }}
                  />
                )}
                <motion.span
                  animate={
                    active
                      ? { scale: [1, 1.25, 1], boxShadow: [`0 0 0px ${accentColor[z.accent]}`, `0 0 14px ${accentColor[z.accent]}`, `0 0 0px ${accentColor[z.accent]}`] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 1.6, repeat: active ? Infinity : 0 }}
                  className="block w-3 h-3 rounded-full"
                  style={{
                    background: i <= activeIndex ? accentColor[z.accent] : "hsl(var(--muted))",
                    border: active ? `2px solid hsl(var(--background))` : "none",
                  }}
                />
                {active && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[11px] font-extrabold text-foreground whitespace-nowrap"
                  >
                    {z.emoji} {z.name}
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>
        {/* You are here label */}
        <p className="text-center text-[10px] font-bold text-muted-foreground mt-1.5 tracking-wider uppercase">
          📍 You are here
        </p>
      </div>
    </div>
  );
};

/* ---------- Decorative parallax layers (per zone) ---------- */

const ZoneDecorBack = ({ accent }: { accent: WorldZoneDef["accent"] }) => {
  // Twinkling stars / sparkles in the back
  const stars = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: (i * 73) % 100,
    top: (i * 41) % 60,
    size: 2 + ((i * 7) % 4),
    delay: (i * 0.3) % 3,
  }));
  return (
    <>
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: accentColor[accent],
            boxShadow: `0 0 ${s.size * 4}px ${accentColor[accent]}`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 2.5, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
};

const ZoneDecorMid = ({ accent, kind }: { accent: WorldZoneDef["accent"]; kind: string }) => {
  const color = accentColor[accent];
  // Different silhouette per zone for variety
  if (kind === "bedtime") {
    return (
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[18vh] block">
        <path
          d="M0,160 C200,90 400,180 700,120 C1000,60 1200,170 1440,140 L1440,220 L0,220 Z"
          fill={color}
          opacity="0.45"
        />
        {/* Moon */}
        <circle cx="1180" cy="60" r="36" fill={color} opacity="0.6" />
        <circle cx="1180" cy="60" r="36" fill="hsl(var(--background))" opacity="0.3" />
      </svg>
    );
  }
  if (kind === "forest") {
    return (
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[20vh] block">
        <path
          d="M0,180 C150,140 300,200 500,150 C700,100 900,180 1100,130 C1280,90 1380,160 1440,150 L1440,220 L0,220 Z"
          fill={color}
          opacity="0.5"
        />
        {[120, 320, 540, 760, 980, 1200, 1380].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${130 - (i % 3) * 10})`}>
            <path d="M0,0 L-14,30 L14,30 Z" fill={color} opacity="0.75" />
            <path d="M0,12 L-18,46 L18,46 Z" fill={color} opacity="0.85" />
            <rect x="-3" y="42" width="6" height="12" fill="hsl(25 50% 30%)" />
          </g>
        ))}
      </svg>
    );
  }
  if (kind === "adventure") {
    return (
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[20vh] block">
        <path
          d="M0,200 L100,120 L200,180 L320,80 L440,160 L560,90 L680,170 L820,70 L960,150 L1080,100 L1200,180 L1320,110 L1440,170 L1440,220 L0,220 Z"
          fill={color}
          opacity="0.55"
        />
        {/* Castle */}
        <g transform="translate(620, 90)" opacity="0.85">
          <rect x="0" y="40" width="80" height="60" fill={color} />
          <rect x="-10" y="20" width="20" height="80" fill={color} />
          <rect x="70" y="20" width="20" height="80" fill={color} />
          <polygon points="-10,20 0,0 10,20" fill={color} />
          <polygon points="70,20 80,0 90,20" fill={color} />
          <rect x="35" y="60" width="10" height="20" fill="hsl(var(--background))" opacity="0.5" />
        </g>
      </svg>
    );
  }
  // heart garden
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[18vh] block">
      <path
        d="M0,170 C200,110 400,190 700,130 C1000,80 1200,180 1440,150 L1440,220 L0,220 Z"
        fill={color}
        opacity="0.45"
      />
      {[100, 260, 430, 600, 780, 960, 1140, 1320].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${140 - (i % 3) * 12})`} opacity="0.85">
          <circle cx="-6" cy="0" r="6" fill={color} />
          <circle cx="6" cy="0" r="6" fill={color} />
          <path d="M-12,2 L0,18 L12,2 Z" fill={color} />
        </g>
      ))}
    </svg>
  );
};

export default WorldMap;
