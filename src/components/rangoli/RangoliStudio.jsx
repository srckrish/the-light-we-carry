import { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { useLight } from "../../context/LightContext";

export const RANGOLI_PALETTE = [
  { name: "Sayapatri Gold", color: "#F59E0B" },
  { name: "Pahadi Ochre", color: "#E7742E" },
  { name: "Sacred Vermillion", color: "#DC2626" },
  { name: "Lotus Rose", color: "#E11D48" },
  { name: "Rice Ivory", color: "#FAF5EE" },
  { name: "Tulsi Green", color: "#10B981" },
  { name: "Peacock Teal", color: "#0D9488" },
  { name: "Makhamali Purple", color: "#8B5CF6" },
];

const CANVAS_SIZE = 720;
const HALF = CANVAS_SIZE / 2;

export default function RangoliStudio({ isHero = false }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // ── All mutable drawing state lives in refs so pointer closures never go stale ──
  const selectedColorRef = useRef(RANGOLI_PALETTE[0].color);
  const brushWidthRef = useRef(4.5);
  const glowModeRef = useRef(true);
  const historyRef = useRef([]);
  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef(null);
  const hasRevealedOnScrollRef = useRef(false);

  // React state is ONLY for triggering re-renders of the UI chrome (swatches, buttons)
  const [selectedColor, _setSelectedColor] = useState(RANGOLI_PALETTE[0].color);
  const [brushWidth, _setBrushWidth] = useState(4.5);
  const [glowMode, _setGlowMode] = useState(true);
  const [historyLen, setHistoryLen] = useState(0); // just the length, for button enable/disable
  const [activePreset, setActivePreset] = useState("sayapatri");
  const stageRef = useRef(null);
  const revealIdRef = useRef(0);

  const { releaseLantern, playChimeNote, showToast } = useLight();

  // ── Synchronised setters that update ref + state together ──
  const setSelectedColor = useCallback((c) => {
    selectedColorRef.current = c;
    _setSelectedColor(c);
  }, []);

  const setBrushWidth = useCallback((w) => {
    brushWidthRef.current = w;
    _setBrushWidth(w);
  }, []);

  const setGlowMode = useCallback((g) => {
    glowModeRef.current = g;
    _setGlowMode(g);
  }, []);

  const pushHistory = useCallback((stroke) => {
    historyRef.current = [...historyRef.current, stroke];
    setHistoryLen(historyRef.current.length);
  }, []);

  // ── Canvas drawing helpers ──
  // Fast single-segment drawing for pointer interaction
  const drawSegment = useCallback((ctx, p1, p2, color, width, glow) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (glow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
    }

    for (let n = 0; n < 8; n++) {
      const angle = (n * Math.PI) / 4;
      for (let m = 0; m < 2; m++) {
        ctx.save();
        ctx.translate(HALF, HALF);
        ctx.rotate(angle);
        if (m === 1) ctx.scale(1, -1);
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.restore();
  }, []);

  // Butter-smooth continuous path vector rendering (zero lag, 60-120fps)
  const drawStrokeContinuous = useCallback((ctx, stroke, progress = 1) => {
    const pts = stroke.points;
    if (!pts || pts.length === 0) return;
    const count = progress >= 1 ? pts.length : Math.max(2, Math.floor(pts.length * progress));

    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (stroke.glow) {
      ctx.shadowColor = stroke.color;
      ctx.shadowBlur = 8;
    }

    for (let n = 0; n < 8; n++) {
      const angle = (n * Math.PI) / 4;
      for (let m = 0; m < 2; m++) {
        ctx.save();
        ctx.translate(HALF, HALF);
        ctx.rotate(angle);
        if (m === 1) ctx.scale(1, -1);

        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        if (pts.length === 1) {
          ctx.lineTo(pts[0][0] + 0.1, pts[0][1]);
        } else {
          for (let i = 1; i < count; i++) {
            ctx.lineTo(pts[i][0], pts[i][1]);
          }
        }
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.restore();
  }, []);

  const paintCanvas = useCallback((progress = 1) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Deep obsidian background fitting the celestial night theme
    ctx.fillStyle = "#0A0710";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Warm concentric guide rings
    ctx.strokeStyle = "rgba(245,158,11,0.14)";
    ctx.lineWidth = 0.8;
    [55, 120, 200, 280, 335].forEach((r) => {
      ctx.beginPath();
      ctx.arc(HALF, HALF, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Symmetry guide rays
    ctx.strokeStyle = "rgba(245,158,11,0.07)";
    ctx.lineWidth = 0.6;
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(HALF + Math.cos(a) * 335, HALF + Math.sin(a) * 335);
      ctx.lineTo(HALF - Math.cos(a) * 335, HALF - Math.sin(a) * 335);
      ctx.stroke();
    }

    // Central Bindu dot
    ctx.fillStyle = "rgba(245,158,11,0.50)";
    ctx.beginPath();
    ctx.arc(HALF, HALF, 4, 0, Math.PI * 2);
    ctx.fill();

    const history = historyRef.current;
    const totalStrokes = history.length;
    if (totalStrokes === 0) return;

    if (progress >= 1) {
      for (let i = 0; i < totalStrokes; i++) {
        drawStrokeContinuous(ctx, history[i], 1);
      }
    } else {
      // Staggered outward blossom: inner petals bloom first, spreading gracefully to the rim
      for (let idx = 0; idx < totalStrokes; idx++) {
        const stroke = history[idx];
        const startT = (idx / totalStrokes) * 0.42;
        const endT = startT + 0.58;
        if (progress <= startT) continue;
        const strokeProgress = Math.min(1, Math.max(0, (progress - startT) / (endT - startT)));
        drawStrokeContinuous(ctx, stroke, strokeProgress);
      }
    }
  }, [drawStrokeContinuous]);

  const cancelReveal = useCallback(() => {
    revealIdRef.current += 1;
  }, []);

  const revealHistory = useCallback(() => {
    const id = ++revealIdRef.current;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      paintCanvas(1);
      return;
    }
    const start = performance.now();
    const duration = 1000;
    const step = (now) => {
      if (id !== revealIdRef.current) return;
      const t = Math.min(1, (now - start) / duration);
      // Smooth cubic-bezier ease out
      const eased = 1 - (1 - t) ** 3;
      paintCanvas(eased);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        paintCanvas(1);
      }
    };
    requestAnimationFrame(step);
  }, [paintCanvas]);

  const replaceHistory = useCallback((strokes, animate = false) => {
    cancelReveal();
    historyRef.current = strokes;
    setHistoryLen(strokes.length);
    if (animate && strokes.length > 0) revealHistory();
    else paintCanvas(1);
  }, [cancelReveal, paintCanvas, revealHistory]);

  const bloomStage = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    el.classList.remove("rangoli-bloom");
    void el.offsetWidth;
    el.classList.add("rangoli-bloom");
  }, []);

  // Initial mount: render background guides immediately, then smoothly bloom preset on scroll
  useEffect(() => {
    paintCanvas(0);

    // If IntersectionObserver is unavailable, load immediately
    if (typeof IntersectionObserver === "undefined") {
      loadPreset("sayapatri", false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasRevealedOnScrollRef.current) {
          hasRevealedOnScrollRef.current = true;
          // Smoothly bloom and load the predefined Sayapatri rangoli as the user scrolls into view
          loadPreset("sayapatri", false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const target = containerRef.current || stageRef.current;
    if (target) observer.observe(target);

    return () => {
      observer.disconnect();
      revealIdRef.current += 1;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Pointer event handlers ──
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    return [
      ((cx - rect.left) * CANVAS_SIZE) / rect.width - HALF,
      ((cy - rect.top) * CANVAS_SIZE) / rect.height - HALF,
    ];
  };

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try { canvas.setPointerCapture?.(e.pointerId); } catch {}

    const coords = getCanvasCoords(e);
    const color = selectedColorRef.current;
    const width = brushWidthRef.current;
    const glow = glowModeRef.current;

    cancelReveal();
    setActivePreset(null);
    isDrawingRef.current = true;
    currentStrokeRef.current = { color, width, glow, points: [coords] };

    const ctx = canvas.getContext("2d");
    if (ctx) drawSegment(ctx, coords, [coords[0] + 0.1, coords[1]], color, width, glow);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const coords = getCanvasCoords(e);
    const stroke = currentStrokeRef.current;
    const prev = stroke.points[stroke.points.length - 1];
    stroke.points.push(coords);

    const ctx = canvas.getContext("2d");
    if (ctx) drawSegment(ctx, prev, coords, stroke.color, stroke.width, stroke.glow);
  };

  const finishStroke = () => {
    if (isDrawingRef.current && currentStrokeRef.current) {
      pushHistory(currentStrokeRef.current);
      currentStrokeRef.current = null;
      isDrawingRef.current = false;
    }
  };

  const handlePointerUp = (e) => {
    try { canvasRef.current?.releasePointerCapture?.(e.pointerId); } catch {}
    finishStroke();
  };

  // Global cleanup
  useEffect(() => {
    const handler = () => finishStroke();
    window.addEventListener("pointerup", handler);
    window.addEventListener("pointercancel", handler);
    return () => {
      window.removeEventListener("pointerup", handler);
      window.removeEventListener("pointercancel", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Actions ──
  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
    playChimeNote(RANGOLI_PALETTE.findIndex((p) => p.color === newColor) % 6);
  };

  const handleRecolorAll = () => {
    if (historyRef.current.length === 0) return;
    const color = selectedColorRef.current;
    setActivePreset(null);
    replaceHistory(historyRef.current.map((s) => ({ ...s, color })));
    playChimeNote(3);
    showToast("All strokes recolored.");
  };

  const handleUndo = () => {
    setActivePreset(null);
    replaceHistory(historyRef.current.slice(0, -1));
  };

  const handleClear = () => {
    setActivePreset(null);
    currentStrokeRef.current = null;
    isDrawingRef.current = false;
    replaceHistory([]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function loadPreset(name, notify = true) {
    const strokes = [];
    const gen = (layers, colorSet, opts) => {
      for (let layer = 0; layer < layers; layer++) {
        const pts = [];
        const color = colorSet[layer % colorSet.length];
        const base = opts.baseR + layer * opts.step;
        const count = opts.count || 60;
        const phase = (opts.phaseStep || 0) * layer;
        for (let i = 0; i <= count; i++) {
          const a = (i / count) * Math.PI * (opts.arc || 0.45) + phase;
          const r = base + Math.sin(i * (opts.freq || 0.5) + layer) * (opts.amp || 32);
          pts.push([Math.cos(a) * r * (opts.sx || 0.7), Math.sin(a) * r * (opts.sy || 1)]);
        }
        strokes.push({ color, width: opts.w || 4.5, glow: true, points: pts });
      }
    };

    if (name === "lotus") {
      gen(4, ["#E11D48", "#F59E0B", "#E7742E", "#FAF5EE"], { baseR: 50, step: 55, amp: 32, sx: 0.7 });
    } else if (name === "sayapatri") {
      gen(5, ["#F59E0B", "#E7742E", "#DC2626", "#FAF5EE", "#10B981"], { baseR: 40, step: 50, count: 64, arc: 0.5, freq: 0.6, amp: 25, sx: 0.8, phaseStep: 0.4, w: 4 });
    } else if (name === "diya") {
      gen(4, ["#F59E0B", "#DC2626", "#0D9488", "#F59E0B"], { baseR: 60, step: 60, count: 50, arc: 0.5, freq: 0.4, amp: 20, sx: 0.65, sy: 0.9, w: 5 });
    }

    setActivePreset(name);
    replaceHistory(strokes, true);
    bloomStage();
    if (notify) {
      playChimeNote(3);
      const label = name.charAt(0).toUpperCase() + name.slice(1);
      showToast(`${label} mandala is ready.`);
    }
  }

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "nepal-tihar-rangoli.png";
    link.click();
    releaseLantern();
    playChimeNote(4);
    showToast("Rangoli saved! A light rises to the sky.");
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 }, colors: ["#F59E0B", "#FBBF24", "#F43F5E", "#10B981"] });
  };

  // ── UI ──
  const containerClass = isHero
    ? "flex flex-col items-center mx-auto w-full max-w-xl select-none gap-5"
    : "flex flex-col items-center mx-auto max-w-2xl select-none gap-5";

  return (
    <div ref={containerRef} className={containerClass}>
      {/* Canvas */}
      <div className="relative p-1.5 sm:p-2 rounded-[22px] bg-gradient-to-br from-amber-500/25 via-amber-950/20 to-amber-500/25 shadow-[0_0_50px_rgba(245,158,11,0.18)] border border-amber-500/30">
        <div ref={stageRef} className="rounded-2xl overflow-hidden bg-[#0A0710] rangoli-bloom shadow-2xl">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-[min(85vw,400px)] sm:w-[420px] aspect-square cursor-crosshair touch-none select-none bg-[#0A0710]"
            aria-label="Rangoli drawing canvas"
          />
        </div>
      </div>

      {/* Color palette */}
      <div className="flex items-center justify-center gap-2 sm:gap-2.5">
        {RANGOLI_PALETTE.map((item) => {
          const active = selectedColor === item.color;
          return (
            <button
              key={item.color}
              type="button"
              onClick={() => handleColorChange(item.color)}
              style={{ backgroundColor: item.color }}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-[transform,opacity,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none active:scale-95 ${
                active
                  ? "scale-[1.3] ring-2 ring-white ring-offset-2 ring-offset-stone-950 shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                  : "opacity-70 hover:opacity-100 hover:scale-110"
              }`}
              aria-label={item.name}
              aria-pressed={active}
              title={item.name}
            />
          );
        })}
      </div>

      {/* Toolbar – compact row */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
        {/* Presets */}
        {[
          { id: "sayapatri", label: "🌼 Sayapatri" },
          { id: "lotus", label: "🌸 Lotus" },
          { id: "diya", label: "🪔 Diya" },
        ].map((pr) => {
          const selected = activePreset === pr.id;
          return (
            <button
              key={pr.id}
              type="button"
              onClick={() => loadPreset(pr.id)}
              aria-pressed={selected}
              className={`px-2.5 py-1 rounded-full border transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 ${
                selected
                  ? "bg-amber-400 text-stone-950 border-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.45)] scale-[1.04]"
                  : "bg-stone-900/80 hover:bg-amber-900/40 border-stone-700/60 hover:border-amber-500/40 text-stone-300 hover:text-amber-200"
              }`}
            >
              {pr.label}
            </button>
          );
        })}

        <span className="w-px h-5 bg-stone-700/50 mx-0.5 hidden sm:block" />

        <button type="button" onClick={handleUndo} disabled={historyLen === 0}
          className="px-2.5 py-1 rounded-full border border-stone-700/60 text-stone-400 hover:text-amber-200 hover:border-amber-500/40 transition-[transform,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100">
          ↩ Undo
        </button>
        <button type="button" onClick={handleClear} disabled={historyLen === 0}
          className="px-2.5 py-1 rounded-full border border-stone-700/60 text-stone-400 hover:text-amber-200 hover:border-amber-500/40 transition-[transform,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100">
          Clear
        </button>

        {historyLen > 0 && (
          <button type="button" onClick={handleRecolorAll}
            className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95">
            🎨 Recolor
          </button>
        )}

        <button type="button" onClick={() => setGlowMode(!glowMode)}
          className={`px-2.5 py-1 rounded-full border transition-[transform,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 ${
            glowMode ? "bg-amber-500/15 border-amber-500/40 text-amber-300" : "border-stone-700/60 text-stone-500"
          }`}>
          {glowMode ? "✦ Glow" : "✧ Flat"}
        </button>

        <select value={brushWidth} onChange={(e) => setBrushWidth(Number(e.target.value))}
          className="bg-stone-900 border border-stone-700/60 rounded-full px-2.5 py-1 text-stone-300 text-[11px] sm:text-xs focus-visible:outline-none"
          aria-label="Brush size">
          <option value="3">Fine</option>
          <option value="4.5">Medium</option>
          <option value="8">Bold</option>
        </select>

        <button type="button" onClick={handleDownload}
          className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold tracking-wide hover:scale-105 active:scale-95 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_12px_rgba(245,158,11,0.35)]">
          ↓ Save
        </button>
      </div>
    </div>
  );
}
