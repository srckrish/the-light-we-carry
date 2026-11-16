import { NavLink } from "react-router-dom";

export default function MobileNav() {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 bg-stone-950/85 border border-amber-500/25 rounded-full backdrop-blur-2xl shadow-2xl shadow-black/90"
    >
      {[
        { path: "/", label: "Home", icon: "🪔" },
        { path: "/story", label: "Story", icon: "📜" },
        { path: "/play", label: "Play", icon: "✨" },
      ].map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                : "text-stone-300 hover:text-amber-200"
            }`
          }
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
