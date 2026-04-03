import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, User } from "lucide-react";
import mascot from "@/assets/mopikoo-mascot.png";

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
      <header className="hidden md:flex items-center justify-between px-6 py-3 bg-card shadow-card sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src={mascot} alt="Mopikoo" width={40} height={40} />
          <span className="text-2xl font-extrabold text-foreground">
            Mopi<span className="text-secondary">koo</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm transition-all bounce-hover ${
                location.pathname === to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Bottom bar - mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-card">
        <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                location.pathname === to
                  ? "text-secondary"
                  : "text-muted-foreground"
              }`}
            >
              <Icon size={22} />
              <span className="text-xs font-bold">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
