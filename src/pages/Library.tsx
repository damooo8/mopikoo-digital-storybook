import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import StoryCardPremium from "@/components/StoryCardPremium";
import HorizontalStoryRow from "@/components/HorizontalStoryRow";
import MagicalBackground from "@/components/MagicalBackground";
import { stories, categories } from "@/data/stories";

const ageFilters = ["All", "3-5", "6-8", "9-10"];

const Library = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [selectedAge, setSelectedAge] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const isFiltering = search || selectedAge !== "All" || selectedCategory !== "All";

  const filtered = stories.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesAge = selectedAge === "All" || s.ageRange === selectedAge;
    const matchesCat = selectedCategory === "All" || s.category === selectedCategory;
    return matchesSearch && matchesAge && matchesCat;
  });

  return (
    <div className="min-h-screen pb-24 md:pb-0 relative">
      <div className="absolute inset-0 -z-10">
        <MagicalBackground intensity="medium" />
      </div>
      <Navbar />
      <div className="py-6 max-w-5xl mx-auto relative z-10">
        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <h1 className="text-2xl md:text-3xl font-black font-display text-foreground mb-1 flex items-center gap-2">
              <span>📚</span> <span className="gradient-text">Dunia Cerita</span>
            </h1>
            <p className="text-sm text-muted-foreground">Pilih buku ajaib untuk petualangan berikutnya ✨</p>
          </motion.div>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari cerita ajaib..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 glass-bubble rounded-2xl text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
            <FilterChip label="All" icon="✨" active={selectedCategory === "All"} onClick={() => setSelectedCategory("All")} />
            {categories.map((cat) => (
              <FilterChip
                key={cat.name}
                label={cat.name}
                icon={cat.icon}
                active={selectedCategory === cat.name}
                onClick={() => setSelectedCategory(cat.name)}
              />
            ))}
          </div>

          {/* Age filters */}
          <div className="flex gap-2 mb-6">
            {ageFilters.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all bounce-hover ${
                  selectedAge === age
                    ? "magical-button text-primary-foreground"
                    : "glass-bubble text-muted-foreground"
                }`}
              >
                {age === "All" ? "Semua Usia" : `Usia ${age}`}
              </button>
            ))}
          </div>
        </div>

        {/* Curated sections (when no filter active) */}
        {!isFiltering && (
          <>
            <HorizontalStoryRow title="🔥 Populer Minggu Ini" stories={stories} badge="TRENDING" />
            <HorizontalStoryRow title="🌙 Pilihan Tidur" stories={stories.filter(s => s.ageRange === "3-5")} badge="MOST LOVED" />
            <HorizontalStoryRow title="❤️ Favorit Orang Tua" stories={stories} badge="NEW" />
          </>
        )}

        {/* Filtered Grid */}
        {isFiltering && (
          <div className="px-4">
            {filtered.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {filtered.map((story) => (
                  <StoryCardPremium key={story.id} {...story} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-muted-foreground font-semibold">Tidak ada cerita ditemukan. Coba kata lain!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const FilterChip = ({ label, icon, active, onClick }: { label: string; icon: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all bounce-hover ${
      active
        ? "magical-button text-primary-foreground"
        : "glass-bubble text-muted-foreground"
    }`}
  >
    <span>{icon}</span> {label}
  </button>
);

export default Library;
