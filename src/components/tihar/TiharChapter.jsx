
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

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TiharChapter({ day, index }) {
  const chapterRef = useRef(null);
  const Illustration = illustrations[day.id];

  useGSAP(
    () => {
      // Respect the visitor's reduced-motion preference.
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      gsap.from("[data-reveal]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",

        scrollTrigger: {
          trigger: chapterRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    {
      scope: chapterRef,
    }
  );

  return (
    <article
      ref={chapterRef}
      id={day.id}
      data-tihar-chapter
      className="group relative grid grid-cols-1 gap-6 border-t border-ivory/15 py-10 md:gap-8 md:py-12"
      style={{ "--chapter-accent": day.accent }}
    >
      {/* Chapter information */}
      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <span
            className="font-body text-sm tabular-nums"
            style={{ color: day.accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-10 bg-ivory/25" />

          <span className="text-xs uppercase tracking-[0.2em] text-ivory/50">
            {day.honored}
          </span>
        </div>

        <h3
          data-reveal
          className="font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl lg:text-6xl"
        >
          {day.name}
        </h3>

        <p
          data-reveal
          className="mt-3 font-body text-base"
          style={{ color: day.accent }}
        >
          {day.devanagari}
        </p>

        <p
          data-reveal
          className="mt-5 max-w-lg text-sm leading-7 text-ivory/70 sm:text-base"
        >
          {day.line}
        </p>
      </div>

      {/* Chapter illustration */}
      <div
        data-reveal
        className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-ivory/10 bg-[#191713]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle, ${day.accent} 0%, transparent 65%)`,
          }}
        />

        {Illustration && (
          <Illustration className="relative z-10 h-full w-full max-w-[280px] p-5" />
        )}
      </div>
    </article>
  );
}
