import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import RiverScene from "./RiverScene";
import { chhathPreparation } from "../../data/chhath";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    id: "sandhya-arghya",
    phase: "sunset",
    label: "Sandhya Arghya",
    devanagari: "सन्ध्या अर्घ्य",
    heading: "The setting sun",
    text: "At the water’s edge, offerings are made to Surya and Chhathi Maiya as the sun goes down.",
  },
  {
    id: "chhath-night",
    phase: "night",
    label: "Between the offerings",
    devanagari: "",
    heading: "The bank stays lit",
    text: "The five lights have come down to the water. The offering waits there through the night.",
  },
  {
    id: "usha-arghya",
    phase: "sunrise",
    label: "Usha Arghya",
    devanagari: "उषा अर्घ्य",
    heading: "The rising sun",
    text: "At sunrise the offering is made again, to the sun as it returns.",
  },
];

function SceneCopy({ label, devanagari, heading, text, copyRef, className = "" }) {
  return (
    <div ref={copyRef} className={`max-w-sm ${className}`}>
      <div className="rounded-2xl bg-[#11110F]/80 px-5 py-5 sm:px-6">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-diya-gold">
          {label}
          {devanagari ? (
            <span lang="ne" className="ml-2 normal-case tracking-normal text-ivory/70">
              {devanagari}
            </span>
          ) : null}
        </p>
        <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl">
          {heading}
        </h3>
        <p className="mt-3 text-sm leading-6 text-ivory/80">{text}</p>
      </div>
    </div>
  );
}

export default function ChhathSection() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);

  const sunsetSkyRef = useRef(null);
  const nightSkyRef = useRef(null);
  const sunriseSkyRef = useRef(null);
  const sunRef = useRef(null);
  const reflectRef = useRef(null);
  const waterShadeRef = useRef(null);
  const diyasRef = useRef(null);
  const courtyardRef = useRef(null);

  const driftTextRef = useRef(null);
  const sunsetTextRef = useRef(null);
  const nightTextRef = useRef(null);
  const sunriseTextRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(courtyardRef.current, { opacity: 1 });
          gsap.set(nightSkyRef.current, { opacity: 0 });
          gsap.set(sunriseSkyRef.current, { opacity: 0 });
          gsap.set(diyasRef.current, { y: -170 });
          gsap.set(sunRef.current, { y: -20, opacity: 1 });
          gsap.set(reflectRef.current, { opacity: 0.15 });
          gsap.set(waterShadeRef.current, { opacity: 0 });
          gsap.set(driftTextRef.current, { opacity: 1, y: 0 });
          gsap.set(sunsetTextRef.current, { opacity: 0, y: 16 });
          gsap.set(nightTextRef.current, { opacity: 0, y: 16 });
          gsap.set(sunriseTextRef.current, { opacity: 0, y: 16 });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sceneRef.current,
              start: "top top",
              end: "+=340%",
              scrub: 0.65,
              pin: true,
              anticipatePin: 1,
            },
          });

          timeline.to(diyasRef.current, { y: 0, duration: 1.15, ease: "none" }, 0);
          timeline.to(courtyardRef.current, { opacity: 0, duration: 1.15, ease: "none" }, 0);
          timeline.to(sunRef.current, { y: 30, duration: 1.15, ease: "none" }, 0);
          timeline.to(reflectRef.current, { opacity: 0.45, duration: 1.15, ease: "none" }, 0);
          timeline.to(driftTextRef.current, { opacity: 0, y: -12, duration: 0.45, ease: "none" }, 0.5);
          timeline.to(sunsetTextRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "none" }, 0.75);

          timeline.to(sunRef.current, { y: 210, duration: 1, ease: "none" }, 1.2);
          timeline.to(sunsetTextRef.current, { opacity: 0, y: -12, duration: 0.4, ease: "none" }, 1.9);

          timeline.to(sunsetSkyRef.current, { opacity: 0, duration: 0.75, ease: "none" }, 2.1);
          timeline.to(nightSkyRef.current, { opacity: 1, duration: 0.75, ease: "none" }, 2.1);
          timeline.to(sunRef.current, { opacity: 0, duration: 0.35, ease: "none" }, 2.2);
          timeline.to(reflectRef.current, { opacity: 0, duration: 0.35, ease: "none" }, 2.2);
          timeline.to(waterShadeRef.current, { opacity: 0.42, duration: 0.75, ease: "none" }, 2.1);
          timeline.to(nightTextRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "none" }, 2.45);
          timeline.to({}, { duration: 0.55 });
          timeline.to(nightTextRef.current, { opacity: 0, y: -12, duration: 0.35, ease: "none" });

          timeline.to(nightSkyRef.current, { opacity: 0, duration: 0.75, ease: "none" });
          timeline.to(sunriseSkyRef.current, { opacity: 1, duration: 0.75, ease: "none" }, "<");
          timeline.to(waterShadeRef.current, { opacity: 0.08, duration: 0.75, ease: "none" }, "<");
          timeline.to(sunRef.current, { opacity: 1, y: 10, duration: 0.9, ease: "none" }, "<");
          timeline.to(reflectRef.current, { opacity: 0.55, duration: 0.75, ease: "none" }, "<");
          timeline.to(sunriseTextRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "none" }, "-=0.4");
        }
      );

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        const cards = gsap.utils.toArray(".chhath-mobile-panel", sectionRef.current);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        cards.forEach((panel) => {
          gsap.from(panel.querySelector(".chhath-panel-content"), {
            y: 24,
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
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="chhath" className="relative bg-midnight">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-24 sm:pb-14 sm:pt-32">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-diya-gold">
            Chhath
          </p>

          <h2 className="font-display text-5xl font-semibold leading-[0.95] text-ivory sm:text-7xl">
            For the setting sun,
            <br />
            and the rising.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-ivory/80 sm:text-base">
            Devotion to Surya, the Sun God, and Chhathi Maiya. The river is
            where the offering is made, not what is worshipped. {chhathPreparation}
          </p>
        </div>
      </div>

      <div ref={sceneRef} className="chhath-scrub relative">
        <RiverScene
          mode="scrub"
          sunsetSkyRef={sunsetSkyRef}
          nightSkyRef={nightSkyRef}
          sunriseSkyRef={sunriseSkyRef}
          sunRef={sunRef}
          reflectRef={reflectRef}
          waterShadeRef={waterShadeRef}
          diyasRef={diyasRef}
          courtyardRef={courtyardRef}
        />

        <div className="pointer-events-none absolute left-6 top-8 z-40 sm:left-12 sm:top-12">
          <SceneCopy
            copyRef={driftTextRef}
            label="From the courtyard"
            heading="Five lights leave home"
            text="The lamps of Tihar travel down to the bank, and another observance begins."
          />
          <SceneCopy
            copyRef={sunsetTextRef}
            className="absolute left-0 top-0 opacity-0"
            label="Sandhya Arghya"
            devanagari="सन्ध्या अर्घ्य"
            heading="The setting sun"
            text="Offerings are made to Surya and Chhathi Maiya as the sun goes down."
          />
          <SceneCopy
            copyRef={nightTextRef}
            className="absolute left-0 top-0 opacity-0"
            label="Between the offerings"
            heading="The bank stays lit"
            text="Small lamps remain beside the water. The morning offering is still ahead."
          />
          <SceneCopy
            copyRef={sunriseTextRef}
            className="absolute left-0 top-0 opacity-0"
            label="Usha Arghya"
            devanagari="उषा अर्घ्य"
            heading="The rising sun"
            text="At sunrise the offering is made again, to the sun as it returns."
          />
        </div>
      </div>

      <div className="chhath-stack flex flex-col">
        {panels.map((panel) => (
          <article
            key={panel.id}
            className="chhath-mobile-panel relative flex min-h-dvh items-end overflow-hidden"
          >
            <RiverScene mode="panel" phase={panel.phase} />
            <div className="chhath-panel-content relative z-10 w-full bg-gradient-to-t from-[#11110F] via-[#11110F]/85 to-transparent px-6 pb-10 pt-28">
              <SceneCopy {...panel} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
