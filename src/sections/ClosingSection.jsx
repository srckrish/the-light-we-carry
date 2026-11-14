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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,237,223,0.05),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.16),rgba(217,164,65,0)_68%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
        <div className="closing-diya mb-10 w-52 sm:w-64">
          <Diya lit={lit} className="h-auto w-full" />
        </div>

        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-diya-gold">
          The light remains
        </p>

        <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-ivory sm:text-6xl">
          The festivals may end.
          <span className="mt-3 block text-diya-gold">
            The light we carry stays.
          </span>
        </h2>

        <p className="mt-8 max-w-md font-display text-2xl italic leading-snug text-ivory sm:text-3xl">
          May gratitude find its way into every home.
        </p>

        <button
          type="button"
          onClick={handleLightAgain}
          className="mt-12 rounded-full border border-diya-gold/70 px-8 py-3 text-sm tracking-wide text-diya-gold transition-colors duration-300 hover:bg-diya-gold hover:text-midnight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-diya-gold"
        >
          Light it again
        </button>
      </div>
    </section>
  );
}
