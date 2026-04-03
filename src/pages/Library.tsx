import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import StoryCard from "@/components/StoryCard";
import { stories, categories } from "@/data/stories";

const ageFilters = ["All", "3-5", "6-8", "9-10"];

const Library = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [selectedAge, setSelectedAge] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filtered = stories.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesAge = selectedAge === "All" || s.ageRange === selectedAge;
    const matchesCat = selectedCategory === "All" || s.category === selectedCategory;
    return matchesSearch && matchesAge && matchesCat;
  });

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="px-4 py-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-black text-foreground mb-4">📚 Story Library</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-2xl text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
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
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {age === "All" ? "All Ages" : `Ages ${age}`}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-muted-foreground font-semibold">No stories found. Try a different search!</p>
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
        ? "bg-secondary text-secondary-foreground"
        : "bg-card text-muted-foreground border border-border"
    }`}
  >
    <span>{icon}</span> {label}
  </button>
);

export default Library;
