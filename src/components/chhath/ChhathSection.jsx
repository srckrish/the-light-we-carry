
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import RiverScene from "./RiverScene";
import { chhathPreparation } from "../../data/chhath";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const mobilePanels = [
  {
    id: "mobile-sunset",
    label: "Sandhya Arghya · सन्ध्या अर्घ्य",
    heading: "The Last Light of Day",
    text: "As the sun descends, devotees gather at the water's edge to offer Arghya to Surya and pray to Chhathi Maiya.",
    background:
      "linear-gradient(to bottom, #D96B43, #F2A65A 55%, #416C70)",
  },
  {
    id: "mobile-night",
    label: "Between sunset and sunrise",
    heading: "A Night of Devotion",
    text: "Lamps glow beside the water. Families remain close, while prayers carry through the quiet darkness.",
    background:
      "linear-gradient(to bottom, #0F1B2A, #192D42 60%, #243F50)",
  },
  {
    id: "mobile-sunrise",
    label: "Usha Arghya · उषा अर्घ्य",
    heading: "The First Light of Dawn",
    text: "Devotees return to the water to offer Arghya to the rising sun, welcoming a new day with hope.",
    background:
      "linear-gradient(to bottom, #405B79, #E99B70 55%, #F2C56E)",
  },
];

export default function ChhathSection() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);

  const sunsetSkyRef = useRef(null);
  const nightSkyRef = useRef(null);
  const sunriseSkyRef = useRef(null);
  const sunRef = useRef(null);

  const sunsetTextRef = useRef(null);
  const nightTextRef = useRef(null);
  const sunriseTextRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // =====================================
      // DESKTOP: PINNED SCRUB EXPERIENCE
      // =====================================

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sceneRef.current,
              start: "top top",
              end: "+=300%",
              scrub: true,
              pin: true,
              anticipatePin: 1,
            },
          });

          // Initial states
          gsap.set(sunsetSkyRef.current, { opacity: 1 });
          gsap.set(nightSkyRef.current, { opacity: 0 });
          gsap.set(sunriseSkyRef.current, { opacity: 0 });

          gsap.set(sunRef.current, {
            y: 0,
            opacity: 1,
          });

          gsap.set(sunsetTextRef.current, { opacity: 1 });
          gsap.set(nightTextRef.current, { opacity: 0 });
          gsap.set(sunriseTextRef.current, { opacity: 0 });

          // SUNSET
          timeline.to(
            sunRef.current,
            {
              y: 150,
              duration: 1,
              ease: "none",
            },
            0
          );

          timeline.to(
            sunsetTextRef.current,
            {
              opacity: 0,
              y: -25,
              duration: 0.5,
            },
            0.7
          );

          // SUNSET -> NIGHT
          timeline.to(
            sunsetSkyRef.current,
            {
              opacity: 0,
              duration: 0.8,
            },
            1
          );

          timeline.to(
            nightSkyRef.current,
            {
              opacity: 1,
              duration: 0.8,
            },
            1
          );

          timeline.to(
            sunRef.current,
            {
              opacity: 0,
              duration: 0.4,
            },
            1.2
          );

          timeline.to(
            nightTextRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
            },
            1.25
          );

          // HOLD NIGHT
          timeline.to({}, { duration: 0.7 });

          timeline.to(
            nightTextRef.current,
            {
              opacity: 0,
              y: -25,
              duration: 0.5,
            }
          );

          // NIGHT -> SUNRISE
          timeline.to(
            nightSkyRef.current,
            {
              opacity: 0,
              duration: 0.8,
            },
            2.5
          );

          timeline.to(
            sunriseSkyRef.current,
            {
              opacity: 1,
              duration: 0.8,
            },
            2.5
          );

          timeline.to(
            sunRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "none",
            },
            2.5
          );

          timeline.to(
            sunriseTextRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
            },
            2.9
          );
        }
      );

      // =====================================
      // MOBILE: NO PINNING OR SCRUBBING
      // =====================================

      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray(
            ".chhath-mobile-panel",
            sectionRef.current
          );

          panels.forEach((panel) => {
            gsap.from(panel.querySelector(".chhath-panel-content"), {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
                once: true,
              },
            });
          });
        }
      );

      // =====================================
      // REDUCED MOTION: STATIC PANELS
      // =====================================

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // No pinning, no scrub, no reveal animations.
        // The mobile/static panels remain visible.
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="chhath"
      className="relative overflow-hidden bg-midnight px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* INTRODUCTION */}
        <div className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-diya-gold">
            From courtyard to riverbank
          </p>

          <h2 className="font-display text-5xl font-semibold leading-tight text-ivory sm:text-7xl">
            Where the Sun
            <br />
            Meets the River.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-ivory/70 sm:text-base">
            {chhathPreparation}
          </p>        </div>

        {/* DESKTOP SCRUB SCENE */}
        <div
          ref={sceneRef}
          className="hidden md:block motion-reduce:hidden"
        >
          <RiverScene
            sunsetSkyRef={sunsetSkyRef}
            nightSkyRef={nightSkyRef}
            sunriseSkyRef={sunriseSkyRef}
            sunRef={sunRef}
            sunsetTextRef={sunsetTextRef}
            nightTextRef={nightTextRef}
            sunriseTextRef={sunriseTextRef}
          />
        </div>

        {/* MOBILE / REDUCED-MOTION PANELS */}
        <div className="flex flex-col gap-6 md:hidden motion-reduce:md:flex">
          {mobilePanels.map((panel) => (
            <article
              key={panel.id}
              className="chhath-mobile-panel relative flex min-h-[420px] items-end overflow-hidden rounded-2xl p-6 sm:min-h-[480px] sm:p-10"
              style={{ background: panel.background }}
            >
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[20%] h-24 w-24 -translate-x-1/2 rounded-full bg-[#F2C56E] opacity-80 shadow-[0_0_70px_25px_rgba(242,197,110,0.25)]"
              />

              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[32%] w-full bg-[#416C70]/80"
              />

              <div className="chhath-panel-content relative z-10 max-w-lg">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-ivory/70">
                  {panel.label}
                </p>

                <h3 className="font-display text-4xl font-semibold text-ivory sm:text-5xl">
                  {panel.heading}
                </h3>

                <p className="mt-4 text-sm leading-7 text-ivory/80 sm:text-base">
                  {panel.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
