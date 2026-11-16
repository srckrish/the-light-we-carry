import { Link, NavLink, useLocation } from "react-router-dom";
import { useLight } from "../../context/LightContext";

export default function Header() {
  const { soundEnabled, toggleSound, releasedLights } = useLight();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3 bg-gradient-to-b from-[#06040A]/90 via-[#06040A]/60 to-transparent backdrop-blur-md border-b border-amber-500/10">
      {/* Brand logo */}
      <Link
        to="/"
        className="flex items-center gap-2.5 text-stone-100 hover:text-amber-300 transition-colors group focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full"
        aria-label="The Light We Carry, go to home"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-500/25 blur-md group-hover:bg-amber-400/40 transition-all" />
          <svg
            width="28"
            height="28"
            viewBox="0 0 64 64"
            aria-hidden="true"
            className="relative drop-shadow-[0_0_10px_rgba(245,158,11,0.7)]"
          >
            <path
              d="M32 6c-9 11-3 18 0 23 3-5 9-12 0-23z"
              fill="#F2C56E"
              className="animate-pulse"
            />
            <path d="M8 34q24 28 48 0q-24 10-48 0z" fill="#B85C38" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-semibold text-lg sm:text-xl tracking-wide leading-none text-stone-100">
            The Light We Carry
          </span>
          <span className="text-[9px] uppercase tracking-widest text-amber-400/80 font-medium hidden sm:inline">
            Tihar · Chhath
          </span>
        </div>
      </Link>

      {/* Center Nav pills */}
      <nav
        aria-label="Main Navigation"
        className="flex items-center gap-1 p-1 bg-amber-950/35 border border-amber-500/20 rounded-full backdrop-blur-2xl shadow-xl shadow-black/40"
      >
        {[
          { path: "/", label: "Home", exact: true },
          { path: "/story", label: "Story" },
          { path: "/play", label: "Play" },
        ].map((item) => {
          const isActive = item.exact
            ? location.pathname === "/"
            : location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105"
                  : "text-stone-300 hover:text-amber-200 hover:bg-white/5"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Right controls: Sound & Floating Lights Counter */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Sound toggle button */}
        <button
          type="button"
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/20 text-xs sm:text-sm text-stone-300 transition-all hover:border-amber-400/40"
          aria-pressed={soundEnabled}
          title={soundEnabled ? "Mute temple chimes" : "Enable temple chimes"}
        >
          <div className="flex items-end gap-0.5 h-3.5 w-3.5" aria-hidden="true">
            <span
              className={`w-0.5 bg-amber-400 rounded-full transition-all ${
                soundEnabled ? "h-3 animate-pulse" : "h-1 bg-stone-500"
              }`}
            />
            <span
              className={`w-0.5 bg-amber-400 rounded-full transition-all ${
                soundEnabled ? "h-2 animate-bounce" : "h-2 bg-stone-500"
              }`}
            />
            <span
              className={`w-0.5 bg-amber-400 rounded-full transition-all ${
                soundEnabled ? "h-3.5 animate-pulse" : "h-1 bg-stone-500"
              }`}
            />
          </div>
          <span className="hidden sm:inline text-xs font-medium">
            {soundEnabled ? "Chimes on" : "Chimes off"}
          </span>
        </button>

        {/* Released lights counter pill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all ${
            releasedLights > 0 ? "opacity-100 scale-100 ring-1 ring-amber-400/30" : "opacity-80"
          }`}
          aria-label={`${releasedLights} lights released into the sky`}
          title={`${releasedLights} lights released into the sky`}
        >
          <span className="text-amber-400 animate-spin-slow">✦</span>
          <span>{releasedLights}</span>
        </div>
      </div>
    </header>
  );
}
