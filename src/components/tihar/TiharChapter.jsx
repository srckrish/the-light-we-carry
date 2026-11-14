import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Crow from "../svg/Crow";
import Dog from "../svg/Dog";
import Cow from "../svg/Cow";
import Ox from "../svg/Ox";
import TikaPlate from "../svg/TikaPlate";

const illustrations = {
  "kaag-tihar": Crow,
  "kukur-tihar": Dog,
  "gai-tihar": Cow,
  "goru-tihar": Ox,
  "bhai-tika": TikaPlate,
};

gsap.registerPlugin(ScrollTrigger);

export default function TiharChapter({ day, index }) {
  const chapterRef = useRef(null);
  const Illustration = illustrations[day.id];
  const flipped = index % 2 === 1;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      gsap.from("[data-reveal]", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: chapterRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: chapterRef }
  );

  return (
    <article
      ref={chapterRef}
      id={day.id}
      data-tihar-chapter
      className="scroll-mt-36 grid items-center gap-8 border-t border-ivory/10 py-16 md:grid-cols-12 md:gap-10 md:py-24 lg:scroll-mt-40"
    >
      <div className={`md:col-span-5 ${flipped ? "md:order-2" : ""}`}>
        <div className="mb-5 flex items-center gap-3">
          <span
            className="text-sm tabular-nums"
            style={{ color: day.accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-10 bg-ivory/25" />
          <span className="text-xs uppercase tracking-[0.2em] text-ivory/55">
            {day.honored}
          </span>
        </div>

        <h3
          data-reveal
          className="font-display text-4xl font-semibold leading-[1.05] text-ivory sm:text-5xl lg:text-6xl"
        >
          {day.name}
        </h3>

        <p
          data-reveal
          lang="ne"
          className="mt-3 text-base"
          style={{ color: day.accent }}
        >
          {day.devanagari}
        </p>

        <p
          data-reveal
          className="mt-5 max-w-md text-sm leading-7 text-ivory/80 sm:text-base"
        >
          {day.line}
        </p>
      </div>

      <div
        data-reveal
        className={`md:col-span-7 ${flipped ? "md:order-1" : ""}`}
      >
        <div className="relative mx-auto w-full max-w-xl">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
            style={{
              background: `radial-gradient(circle, ${day.accent}33 0%, transparent 68%)`,
            }}
          />
          {Illustration && (
            <Illustration className="relative z-10 h-auto w-full" />
          )}
        </div>
      </div>
    </article>
  );
}
