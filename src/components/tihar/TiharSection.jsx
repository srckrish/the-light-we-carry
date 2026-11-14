import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import tiharDays from "../../data/tihar";
import TiharChapter from "./TiharChapter";
import TiharTimeline from "./TiharTimeline";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TiharSection() {
  const [activeDay, setActiveDay] = useState(-1);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const chapters = sectionRef.current.querySelectorAll(
        "[data-tihar-chapter]"
      );

      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 60%",

          onEnter: () => {
            setActiveDay(index);
          },

          onEnterBack: () => {
            setActiveDay(index);
          },
        });
      });

      // Refresh ScrollTrigger after the fonts have loaded.
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (!cancelled) {
          ScrollTrigger.refresh();
        }
      });

      return () => {
        cancelled = true;
      };
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="tihar"
      className="relative overflow-hidden bg-midnight px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section introduction */}
        <div className="mb-16 max-w-2xl sm:mb-20">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-diya-gold">
            Five days of gratitude
          </p>

          <h2 className="font-display text-5xl font-semibold leading-tight text-ivory sm:text-7xl">
            Five Days,
            <br />
            Five Lights.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-ivory/65 sm:text-base">
            A celebration of the lives, bonds, and blessings around us.
            Each day of Tihar carries its own meaning, its own tradition,
            and a reason to be grateful.
          </p>
        </div>

        {/* Five-day timeline */}
        <TiharTimeline activeDay={activeDay} />

        {/* Tihar chapters */}
        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2 md:gap-x-16">
          {tiharDays.map((day, index) => (
            <TiharChapter
              key={day.id}
              day={day}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
