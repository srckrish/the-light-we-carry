import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Diya from "../components/diya/Diya";
import { useLight } from "../context/LightContext";

export default function HeroSection() {
  const { lit, light } = useLight();
  const [hint, setHint] = useState(false);

  const containerRef = useRef(null);
  const flameRef = useRef(null);
  const glowRef = useRef(null);
  const warmOverlayRef = useRef(null);

  useGSAP(
    () => {
      if (!lit) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(flameRef.current, {
          scale: 1,
          opacity: 1,
          transformOrigin: "50% 100%",
        });
        gsap.set(glowRef.current, {
          scale: 1,
          opacity: 1,
          transformOrigin: "50% 50%",
        });
        gsap.set(warmOverlayRef.current, { opacity: 1 });
        gsap.set(".intro-line", { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline();

      gsap.set(flameRef.current, {
        scale: 0,
        opacity: 0,
        transformOrigin: "50% 100%",
      });

      gsap.set(glowRef.current, {
        scale: 0.85,
        opacity: 0,
        transformOrigin: "50% 50%",
      });

      gsap.set(warmOverlayRef.current, { opacity: 0 });

      timeline.to(flameRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.85,
        ease: "back.out(2)",
      });

      timeline.to(
        glowRef.current,
        {
          opacity: 1,
          scale: 1.35,
          duration: 1.2,
          ease: "power2.out",
        },
        "<0.08"
      );

      timeline.to(
        warmOverlayRef.current,
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "<"
      );

      timeline.from(
        ".intro-line",
        {
          y: 18,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: "power2.out",
        },
        "-=0.7"
      );
    },
    {
      dependencies: [lit],
      scope: containerRef,
    }
  );

  useEffect(() => {
    if (lit) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) return;

    const timeout = setTimeout(() => setHint(true), 3000);
    return () => clearTimeout(timeout);
  }, [lit]);

  useEffect(() => {
    if (lit) return;

    const handleScroll = () => {
      if (window.scrollY > 48) light();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lit, light]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh bg-midnight"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.55)_100%)]"
        />

        <div
          ref={warmOverlayRef}
          aria-hidden="true"
          className="absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_50%_38%,rgba(217,164,65,0.2),rgba(159,69,42,0.08)_42%,transparent_68%)]"
        />
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col items-center px-6 py-16 [justify-content:safe_center]">
        <button
          type="button"
          aria-label={lit ? "The first diya is lit" : "Light the first diya"}
          aria-pressed={lit}
          onClick={light}
          className={`w-52 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-diya-gold focus-visible:ring-offset-4 focus-visible:ring-offset-midnight sm:w-64 ${
            hint && !lit ? "diya-hint" : ""
          }`}
        >
          <Diya lit={lit} flameRef={flameRef} glowRef={glowRef} />
        </button>

        <div className="mt-2 h-12">
          {!lit && (
            <button
              type="button"
              onClick={light}
              className="rounded-full border border-diya-gold/70 px-8 py-3 text-sm tracking-wide text-diya-gold transition-colors duration-300 hover:bg-diya-gold hover:text-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-diya-gold focus-visible:ring-offset-4 focus-visible:ring-offset-midnight"
            >
              Light the first diya
            </button>
          )}
        </div>

        <div
          className={`grid w-full max-w-xl text-center ${
            lit ? "mt-6 grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <p className="intro-line text-xs uppercase tracking-[0.35em] text-diya-gold">
              Tihar and Chhath
            </p>

            <h1 className="intro-line mt-4 font-display text-[2.75rem] font-semibold leading-[0.95] text-ivory sm:text-6xl md:text-7xl">
              The Light
              <br />
              We Carry
            </h1>

            <p className="intro-line mt-5 font-display text-xl italic leading-snug text-ivory sm:text-2xl">
              A little light. A thousand reasons to be grateful.
            </p>

            <p className="intro-line mx-auto mt-4 max-w-md text-sm leading-7 text-ivory/80 sm:text-base">
              Every year we pause to honour the lives, bonds and blessings
              around us. It begins with a single flame.
            </p>

            <p className="intro-line mt-8 text-[0.7rem] uppercase tracking-[0.32em] text-ivory/45">
              Scroll
            </p>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {lit ? "The diya is lit" : ""}
      </p>
    </section>
  );
}
