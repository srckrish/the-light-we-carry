import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import tiharDays from "../../data/tihar";
import TiharChapter from "./TiharChapter";
import TiharTimeline from "./TiharTimeline";

gsap.registerPlugin(ScrollTrigger);

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
      className="relative bg-midnight px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl sm:mb-16">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-diya-gold">
            Tihar
          </p>

          <h2 className="font-display text-5xl font-semibold leading-[0.95] text-ivory sm:text-7xl">
            Five days,
            <br />
            five lights.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-ivory/80 sm:text-base">
            Thanks, in turn, for crows, dogs, cows, oxen, the self and
            siblings. The row of lights is a way through the story. Traditions
            overlap, and they differ from home to home.
          </p>
        </div>

        <div className="sticky top-0 z-30 -mx-6 mb-6 border-b border-ivory/10 bg-midnight/95 px-6 py-4">
          <TiharTimeline activeDay={activeDay} />
        </div>

        <div>
          {tiharDays.map((day, index) => (
            <TiharChapter key={day.id} day={day} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
