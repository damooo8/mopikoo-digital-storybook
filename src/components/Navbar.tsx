import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, User } from "lucide-react";
import mascot from "@/assets/mopikoo-mascot.png";
import NightModeToggle from "./NightModeToggle";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/library", icon: BookOpen, label: "Library" },
    { to: "/parent", icon: User, label: "Parents" },
  ];

  return (
    <>
      {/* Top bar - desktop */}
      <header className="hidden md:flex items-center justify-between px-6 py-3 glass-card sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src={mascot} alt="Mopikoo" width={40} height={40} className="drop-shadow-md" />
          <span className="text-2xl font-extrabold font-display gradient-text">
            Mopikoo
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm transition-all bounce-hover ${
                location.pathname === to
                  ? "magical-button text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
          <div className="ml-2">
            <NightModeToggle />
          </div>
        </nav>
      </header>

      {/* Mobile top right toggle */}
      <div className="md:hidden fixed top-3 right-3 z-50">
        <NightModeToggle />
      </div>

      {/* Bottom bar - mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50">
        <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {links.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className={`relative ${active ? "scale-110" : ""} transition-transform`}>
                  {active && (
                    <span className="absolute inset-0 -m-1 rounded-full bg-primary/20 blur-md" />
                  )}
                  <Icon size={22} className="relative" />
                </div>
                <span className="text-[10px] font-bold">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
