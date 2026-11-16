import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useLight } from "./context/LightContext";
import NightCanvas from "./components/canvas/NightCanvas";
import Header from "./components/layout/Header";
import MobileNav from "./components/layout/MobileNav";
import HomeView from "./components/home/HomeView";
import StoryView from "./components/story/StoryView";
import PlayView from "./components/play/PlayView";

export default function App() {
  const { lit, light, toast } = useLight();
  const [chhathSlider, setChhathSlider] = useState(0.25);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Soft auto-light if user scrolls on Home
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40 && !lit) {
        light();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lit, light]);

  return (
    <div className="relative min-h-screen bg-[#07050E] text-stone-100 font-body selection:bg-amber-500 selection:text-stone-950 overflow-x-hidden">
      {/* Living Dynamic Celestial & River Canvas */}
      <NightCanvas chhathSlider={chhathSlider} />

      {/* Glassmorphic Header with Brand & Navigation */}
      <Header />

      {/* Main Routed View Container */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route
            path="/story"
            element={
              <StoryView
                chhathSlider={chhathSlider}
                setChhathSlider={setChhathSlider}
              />
            }
          />
          <Route
            path="/story/:dayId"
            element={
              <StoryView
                chhathSlider={chhathSlider}
                setChhathSlider={setChhathSlider}
              />
            }
          />
          <Route path="/play" element={<PlayView />} />
          <Route path="/play/:gameId" element={<PlayView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Mobile Floating Bottom Dock */}
      <MobileNav />

      {/* Global Interactive Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-stone-950/95 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_30px_rgba(245,158,11,0.45)] backdrop-blur-2xl animate-bounce-subtle pointer-events-none flex items-center gap-2"
        >
          <span className="text-amber-400 animate-spin-slow">✦</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
