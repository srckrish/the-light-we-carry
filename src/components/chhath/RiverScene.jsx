import Silhouettes from "./Silhouettes";

const skies = {
  sunset:
    "linear-gradient(to bottom, #C45B3E 0%, #E88D45 40%, #F2C56E 64%, #3E6A68 100%)",
  night:
    "linear-gradient(to bottom, #0F1B2A 0%, #163044 62%, #1C3C44 100%)",
  sunrise:
    "linear-gradient(to bottom, #3E5874 0%, #E7A07A 48%, #F2C56E 72%, #3E6A68 100%)",
};

function Stars() {
  const stars = [
    [8, 12], [18, 22], [30, 8], [42, 18], [55, 10], [68, 24],
    [76, 8], [88, 16], [14, 34], [36, 30], [62, 36], [84, 32],
    [24, 14], [48, 8], [92, 12],
  ];

  return (
    <svg
      viewBox="0 0 100 40"
      className="absolute inset-x-0 top-0 h-[46%] w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMin slice"
    >
      {stars.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={x % 3 === 0 ? 0.55 : 0.32} fill="#F5EDDF" opacity={x % 2 === 0 ? 0.85 : 0.45} />
      ))}
    </svg>
  );
}

function BankDiya({ x }) {
  return (
    <g transform={`translate(${x} 690)`}>
      <ellipse cx="0" cy="22" rx="18" ry="4" fill="#000" opacity="0.25" />
      <path d="M-16 0c3 14 29 14 32 0-3 16-12 24-16 24s-13-8-16-24Z" fill="#C9844A" />
      <path d="M-16 0c4 6 28 6 32 0" fill="none" stroke="#E7C98A" strokeWidth="2" />
      <path d="M-9 0c2 5 16 5 18 0" fill="#F2C56E" opacity="0.8" />
      <path
        d="M0 0C-4-14-1-26 0-38c1 12 4 24 0 38Z"
        fill="#F2C56E"
        className="diya-flame-flicker"
      />
      <path d="M0-6c-2-8 0-14 0-18 1 5 2 10 0 18Z" fill="#FFF6D4" />
    </g>
  );
}

function Landscape({ diyasRef, waterShadeRef, reflectRef, live = false, shade = 0, reflect = 0.4 }) {
  return (
    <svg
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M0 430C180 330 320 390 480 410C680 300 820 370 1040 400C1220 330 1340 380 1440 360V560H0Z"
        fill="#243E44"
      />
      <path
        d="M0 490C220 410 380 470 560 480C760 390 940 460 1160 470C1300 440 1380 470 1440 450V640H0Z"
        fill="#1A3338"
      />

      <path
        d="M0 545C260 515 480 590 740 555C980 520 1180 585 1440 530V800H0Z"
        fill="#416C70"
      />
      <path
        d="M0 610C320 575 620 650 940 600C1160 560 1300 630 1440 585V800H0Z"
        fill="#2E5558"
        opacity="0.55"
      />

      <ellipse
        ref={live ? reflectRef : undefined}
        cx="980"
        cy="640"
        rx="90"
        ry="16"
        fill="#F2C56E"
        opacity={live ? 0.4 : reflect}
      />

      <g className="water-ripple" opacity="0.45">
        <path d="M180 600c80-12 140 8 220-4" stroke="#F2C56E" strokeWidth="1.5" />
        <path d="M860 650c90-14 150 10 230-6" stroke="#F5EDDF" strokeWidth="1.4" opacity="0.7" />
      </g>
      <g className="water-ripple water-ripple-delayed" opacity="0.35">
        <path d="M420 680c70-10 120 8 190-4" stroke="#F2C56E" strokeWidth="1.4" />
        <path d="M1040 700c80-8 130 10 180-4" stroke="#F5EDDF" strokeWidth="1.2" />
      </g>

      <rect
        ref={live ? waterShadeRef : undefined}
        x="0"
        y="520"
        width="1440"
        height="280"
        fill="#0F1B2A"
        opacity={live ? 0 : shade}
      />

      <Silhouettes />

      <path
        d="M0 700C240 660 460 730 740 690C1040 648 1220 720 1440 675V800H0Z"
        fill="#3A261E"
      />

      <g ref={live ? diyasRef : undefined} className={live ? "chhath-diyas-start" : undefined}>
        {[150, 390, 680, 980, 1240].map((x) => (
          <BankDiya key={x} x={x} />
        ))}
      </g>
    </svg>
  );
}

function Sun({ sunRef, className = "" }) {
  return (
    <div ref={sunRef} className={`absolute z-10 ${className}`} aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,197,110,0.5),rgba(242,197,110,0)_68%)]" />
      <div className="relative h-24 w-24 rounded-full bg-[radial-gradient(circle_at_38%_36%,#FFF8DE_0%,#F2C56E_46%,#E08A3E_100%)] sm:h-32 sm:w-32" />
    </div>
  );
}

export default function RiverScene({
  mode = "scrub",
  phase = "sunset",
  sunsetSkyRef,
  nightSkyRef,
  sunriseSkyRef,
  sunRef,
  reflectRef,
  waterShadeRef,
  diyasRef,
  courtyardRef,
}) {
  if (mode === "panel") {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: skies[phase] }} />
        {phase === "night" && <Stars />}
        {phase !== "night" && (
          <Sun
            className={
              phase === "sunrise"
                ? "left-[58%] top-[16%]"
                : "left-[64%] top-[30%]"
            }
          />
        )}
        <Landscape
          shade={phase === "night" ? 0.45 : 0}
          reflect={phase === "night" ? 0 : 0.45}
        />
      </div>
    );
  }

  return (
    <div
      className="relative h-dvh min-h-[640px] w-full overflow-hidden bg-[#0F1B2A]"
      aria-label="Chhath at the water, from sunset through night to sunrise"
    >
      <div
        ref={sunsetSkyRef}
        className="absolute inset-0"
        style={{ background: skies.sunset }}
      />
      <div ref={nightSkyRef} className="absolute inset-0 opacity-0">
        <div className="absolute inset-0" style={{ background: skies.night }} />
        <Stars />
      </div>
      <div
        ref={sunriseSkyRef}
        className="absolute inset-0 opacity-0"
        style={{ background: skies.sunrise }}
      />

      <Sun sunRef={sunRef} className="left-[66%] top-[22%]" />

      <div
        ref={courtyardRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(140,62,42,0.92) 0%, rgba(184,92,56,0.72) 42%, rgba(184,92,56,0.15) 100%)",
        }}
      />

      <Landscape
        live
        diyasRef={diyasRef}
        waterShadeRef={waterShadeRef}
        reflectRef={reflectRef}
      />
    </div>
  );
}
