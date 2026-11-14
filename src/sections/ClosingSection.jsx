
import Diya from "../components/diya/Diya";
import { useLight } from "../context/LightContext";

export default function ClosingSection() {
  const { lit } = useLight();

  function handleLightAgain() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      id="closing"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-midnight px-6 py-24 text-center"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-diya-gold/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
        {/* Same diya from the hero */}
        <div className="closing-diya mb-12 w-56 sm:w-72">
          <Diya
            lit={lit}
            className="h-auto w-full"
          />
        </div>

        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-diya-gold">
          The light remains
        </p>

        <h2 className="font-display text-5xl font-semibold leading-tight text-ivory sm:text-7xl">
          The Light
          <br />
          We Carry.
        </h2>

        <div className="mt-8 space-y-3 text-sm leading-8 text-ivory/70 sm:text-base">
          <p>
            The lamps may fade, the celebrations may end,
            but the light we share lives on.
          </p>

          <p>
            In every act of kindness, every moment of gratitude,
            and every home we make brighter.
          </p>
        </div>

        <p className="mt-10 font-display text-2xl italic text-diya-gold sm:text-3xl">
          May your light never fade.
        </p>

        <button
          type="button"
          onClick={handleLightAgain}
          className="mt-12 rounded-full border border-diya-gold/60 px-8 py-3 text-sm font-medium text-diya-gold transition-colors duration-300 hover:bg-diya-gold hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-diya-gold"
        >
          Light it again
        </button>
      </div>
    </section>
  );
}
