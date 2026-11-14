
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Diya from "../components/diya/Diya";
import { useLight } from "../context/LightContext";

// Register GSAP's React integration.
gsap.registerPlugin(useGSAP);

export default function HeroSection() {
    const { lit, light } = useLight();

    const containerRef = useRef(null);
    const flameRef = useRef(null);
    const glowRef = useRef(null);
    const warmOverlayRef = useRef(null);

    // GSAP ignition and text reveal animation.
    useGSAP(
        () => {
            if (!lit) return;

            const timeline = gsap.timeline();

            // Initially hide the elements that appear during ignition.
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

            gsap.set(warmOverlayRef.current, {
                opacity: 0,
            });

            // 1. Ignite the flame.
            timeline.to(flameRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(2)",
            });

            // 2. Expand the diya glow.
            timeline.to(
                glowRef.current,
                {
                    opacity: 1,
                    scale: 1.4,
                    duration: 1.2,
                    ease: "power2.out",
                },
                "<0.1"
            );

            // 3. Warm up the surroundings.
            timeline.to(
                warmOverlayRef.current,
                {
                    opacity: 1,
                    duration: 1.4,
                    ease: "power2.out",
                },
                "<"
            );

            // 4. Reveal the story.
            timeline.from(
                ".intro-line",
                {
                    y: 16,
                    autoAlpha: 0,
                    duration: 0.8,
                    stagger: 0.25,
                    ease: "power2.out",
                },
                "-=0.6"
            );
        },
        {
            dependencies: [lit],
            scope: containerRef,
        }
    );

    // Safety net 1: Automatically light after 3 seconds.
    useGSAP(
        () => {
            if (lit) return;

            const timeout = setTimeout(() => {
                light();
            }, 3000);

            return () => clearTimeout(timeout);
        },
        {
            dependencies: [lit],
            scope: containerRef,
        }
    );

    // Safety net 2: Light automatically when the visitor scrolls.
    useGSAP(
        () => {
            if (lit) return;

            const handleScroll = () => {
                if (window.scrollY > 10) {
                    light();
                }
            };

            window.addEventListener("scroll", handleScroll, {
                passive: true,
            });

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        },
        {
            dependencies: [lit],
            scope: containerRef,
        }
    );

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-midnight px-6 text-center"
        >
            {/* Warm background overlay */}
            <div
                ref={warmOverlayRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[#9F452A]/15 opacity-0"
            />

            {/* Background glow */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute left-1/2 top-[30%] z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.18)_0%,rgba(217,164,65,0)_70%)] transition-opacity duration-1000 ${lit ? "opacity-100" : "opacity-0"
                    }`}
            />

            <div className="relative z-10 flex flex-col items-center">
                {/* Diya */}
                <button
                    type="button"
                    aria-label={lit ? "The first diya is lit" : "Light the first diya"}
                    aria-pressed={lit}
                    onClick={light}
                    className="mb-10 w-52 rounded-xl outline-none transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-diya-gold focus-visible:ring-offset-4 focus-visible:ring-offset-midnight sm:w-60"
                >
                    <Diya
                        lit={lit}
                        flameRef={flameRef}
                        glowRef={glowRef}
                    />
                </button>

                {/* Story introduction */}
                <p className="intro-line mb-4 text-xs uppercase tracking-[0.35em] text-diya-gold">
                    A celebration of light
                </p>

                <h1 className="intro-line font-display text-5xl font-semibold leading-tight text-ivory sm:text-7xl">
                    The Light
                    <br />
                    We Carry
                </h1>

                <p className="intro-line mt-5 max-w-md text-sm leading-7 text-ivory/65 sm:text-base">
                    A journey through gratitude, hope, and the light that brings us
                    together.
                </p>

                {/* Lighting button - always visible */}
                <button
                    type="button"
                    onClick={light}
                    disabled={lit}
                    className="mt-10 rounded-full border border-diya-gold/60 px-8 py-3 text-sm tracking-wide text-diya-gold transition-colors duration-300 hover:bg-diya-gold hover:text-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-diya-gold focus-visible:ring-offset-4 focus-visible:ring-offset-midnight disabled:cursor-default disabled:opacity-70"
                >
                    {lit ? "The diya is lit" : "Light the first diya"}
                </button>

                {/* Screen reader announcement */}
                <p className="sr-only" aria-live="polite" aria-atomic="true">
                    {lit ? "The diya is lit" : ""}
                </p>
            </div>
        </section>
    );
}
