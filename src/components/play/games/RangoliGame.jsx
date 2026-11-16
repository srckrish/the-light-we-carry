import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useLight } from "../../../context/LightContext";

const PALETTE = [
  { name: "Sayapatri Gold", color: "#F2C56E" },
  { name: "Pahadi Ochre", color: "#E7742E" },
  { name: "Sacred Vermillion", color: "#C2412D" },
  { name: "Lotus Crimson", color: "#E11D48" },
  { name: "Rice Ivory", color: "#F5EDDF" },
  { name: "Tulsi Green", color: "#7BAE5A" },
  { name: "Peacock Teal", color: "#14B8A6" },
  { name: "Makhamali Purple", color: "#A855F7" },
];

export default function RangoliGame() {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(PALETTE[0].color);
  const [brushWidth, setBrushWidth] = useState(5);
  const [glowMode, setGlowMode] = useState(true);
  const [history, setHistory] = useState([]);
  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef(null);

  const { releaseLantern, playChimeNote, showToast } = useLight();

  const drawSegment = (ctx, p1, p2, color, width, glow) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (glow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
    } else {
      ctx.shadowBlur = 0;
    }

    const cx = 360;
    const cy = 360;

    // 8-fold radial symmetry with bilateral mirror reflection (16 symmetry axes)
    for (let n = 0; n < 8; n++) {
      for (let m = 0; m < 2; m++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((n * Math.PI) / 4);
        if (m === 1) {
          ctx.scale(1, -1);
        }
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.restore();
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Velvet Obsidian Background
    ctx.fillStyle = "#0D0914";
    ctx.fillRect(0, 0, 720, 720);

    // Sacred Concentric Circles
    ctx.strokeStyle = "rgba(245, 158, 11, 0.16)";
    ctx.lineWidth = 1.2;
    [55, 120, 200, 280, 330].forEach((r) => {
      ctx.beginPath();
      ctx.arc(360, 360, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Symmetry Guideline Rays
    ctx.strokeStyle = "rgba(245, 158, 11, 0.09)";
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(360 + Math.cos((i * Math.PI) / 4) * 330, 360 + Math.sin((i * Math.PI) / 4) * 330);
      ctx.lineTo(360 - Math.cos((i * Math.PI) / 4) * 330, 360 - Math.sin((i * Math.PI) / 4) * 330);
      ctx.stroke();
    }

    // Central Sacred Dot (Bindu)
    ctx.fillStyle = "rgba(245, 158, 11, 0.4)";
    ctx.beginPath();
    ctx.arc(360, 360, 4, 0, Math.PI * 2);
    ctx.fill();

    // Redraw all strokes
    for (const stroke of history) {
      for (let i = 1; i < stroke.points.length; i++) {
        drawSegment(ctx, stroke.points[i - 1], stroke.points[i], stroke.color, stroke.width, stroke.glow);
      }
      if (stroke.points.length === 1) {
        drawSegment(
          ctx,
          stroke.points[0],
          [stroke.points[0][0] + 0.1, stroke.points[0][1]],
          stroke.color,
          stroke.width,
          stroke.glow
        );
      }
    }
  };

  useEffect(() => {
    redrawCanvas();
  }, [history]);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    return [
      ((clientX - rect.left) * 720) / rect.width - 360,
      ((clientY - rect.top) * 720) / rect.height - 360,
    ];
  };

  const handlePointerDown = (e) => {
    if (e.target.setPointerCapture && e.pointerId) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {}
    }
    const coords = getCanvasCoords(e);
    isDrawingRef.current = true;
    currentStrokeRef.current = {
      color: selectedColor,
      width: brushWidth,
      glow: glowMode,
      points: [coords],
    };
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawSegment(ctx, coords, [coords[0] + 0.1, coords[1]], selectedColor, brushWidth, glowMode);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    const coords = getCanvasCoords(e);
    const pts = currentStrokeRef.current.points;
    const prev = pts[pts.length - 1];
    pts.push(coords);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawSegment(ctx, prev, coords, selectedColor, brushWidth, glowMode);
  };

  const handlePointerUp = (e) => {
    if (e.target.releasePointerCapture && e.pointerId) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    if (isDrawingRef.current && currentStrokeRef.current) {
      setHistory((prev) => [...prev, currentStrokeRef.current]);
      currentStrokeRef.current = null;
      isDrawingRef.current = false;
    }
  };

  const handleUndo = () => {
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setHistory([]);
  };

  const loadPreset = (presetName) => {
    const newStrokes = [];
    if (presetName === "lotus") {
      // Sacred Lotus Bloom (पद्म)
      const colors = ["#E11D48", "#F2C56E", "#E7742E", "#F5EDDF"];
      for (let layer = 0; layer < 4; layer++) {
        const pts = [];
        const baseR = 50 + layer * 55;
        const color = colors[layer % colors.length];
        for (let i = 0; i <= 60; i++) {
          const a = (i / 60) * Math.PI * 0.45;
          const r = baseR + Math.sin(i * 0.5) * 32;
          pts.push([Math.cos(a) * r * 0.7, Math.sin(a) * r]);
        }
        newStrokes.push({ color, width: 4.5, glow: true, points: pts });
      }
    } else if (presetName === "sayapatri") {
      // Sayapatri Marigold Mandala (सयपत्री)
      const colors = ["#F2C56E", "#E7742E", "#C2412D", "#F5EDDF", "#7BAE5A"];
      for (let layer = 0; layer < 5; layer++) {
        const pts = [];
        const baseR = 40 + layer * 50;
        const phase = layer * 0.4;
        const color = colors[layer % colors.length];
        for (let i = 0; i <= 64; i++) {
          const a = (i / 64) * Math.PI * 0.5 + phase;
          const r = baseR + Math.sin(i * 0.6 + layer) * 25;
          pts.push([Math.cos(a) * r * 0.8, Math.sin(a) * r]);
        }
        newStrokes.push({ color, width: 4, glow: true, points: pts });
      }
    } else if (presetName === "diya") {
      // Diya Rosette (दियो)
      const colors = ["#F2C56E", "#C2412D", "#14B8A6", "#F2C56E"];
      for (let layer = 0; layer < 4; layer++) {
        const pts = [];
        const baseR = 60 + layer * 60;
        const color = colors[layer % colors.length];
        for (let i = 0; i <= 50; i++) {
          const a = (i / 50) * Math.PI * 0.5;
          const r = baseR + Math.cos(i * 0.4) * 20;
          pts.push([Math.cos(a) * r * 0.65, Math.sin(a) * r * 0.9]);
        }
        newStrokes.push({ color, width: 5, glow: true, points: pts });
      }
    }
    setHistory(newStrokes);
    playChimeNote(3);
    showToast(`Loaded ${presetName} mandala rosette.`);
  };

  const handleSurpriseMe = () => {
    const presets = ["lotus", "sayapatri", "diya"];
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    loadPreset(randomPreset);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.65 },
      colors: ["#F59E0B", "#FBBF24", "#F43F5E", "#10B981"],
    });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "nepal-tihar-rangoli.png";
    link.click();

    releaseLantern();
    playChimeNote(4);
    showToast("Rangoli downloaded! A golden light released to the sky.");

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#F59E0B", "#FBBF24", "#F43F5E", "#10B981"],
    });
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto space-y-4">
      <p className="text-xs sm:text-sm text-stone-300 text-center font-light">
        Draw with finger or mouse. Your lines seamlessly blossom into a 16-axis sacred rosette mandala.
      </p>

      {/* Preset Inspirations Bar */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-stone-400 font-medium">Motifs:</span>
        {[
          { id: "lotus", label: "🌸 Lotus" },
          { id: "sayapatri", label: "🌼 Sayapatri" },
          { id: "diya", label: "🪔 Diya Star" },
        ].map((pr) => (
          <button
            key={pr.id}
            type="button"
            onClick={() => loadPreset(pr.id)}
            className="px-3 py-1 rounded-full bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/25 text-amber-300 text-[11px] font-medium transition-all"
          >
            {pr.label}
          </button>
        ))}
      </div>

      {/* Drawing Canvas Container */}
      <div className="relative p-2 rounded-3xl bg-stone-950/90 border border-amber-500/30 shadow-2xl backdrop-blur-2xl">
        <canvas
          ref={canvasRef}
          width={720}
          height={720}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full max-w-[420px] aspect-square rounded-2xl cursor-crosshair touch-none select-none drop-shadow-[0_0_25px_rgba(0,0,0,0.9)]"
          aria-label="Rangoli drawing pad"
        />
      </div>

      {/* Color Palette Swatches */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {PALETTE.map((item) => (
          <button
            key={item.color}
            type="button"
            onClick={() => setSelectedColor(item.color)}
            style={{ backgroundColor: item.color }}
            className={`w-8 h-8 rounded-full transition-transform focus-visible:outline-none ${
              selectedColor === item.color
                ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-black shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                : "opacity-85 hover:opacity-100 hover:scale-110"
            }`}
            aria-label={`Color ${item.name}`}
            aria-pressed={selectedColor === item.color}
            title={item.name}
          />
        ))}
      </div>

      {/* Brush Settings */}
      <div className="flex items-center gap-4 text-xs text-stone-400">
        <label className="flex items-center gap-2">
          <span>Width:</span>
          <select
            value={brushWidth}
            onChange={(e) => setBrushWidth(Number(e.target.value))}
            className="bg-stone-900 border border-amber-500/30 rounded-lg px-2.5 py-1 text-ivory text-xs"
          >
            <option value="3">Fine (3px)</option>
            <option value="5">Medium (5px)</option>
            <option value="9">Bold (9px)</option>
          </select>
        </label>

        <button
          type="button"
          onClick={() => setGlowMode(!glowMode)}
          className={`px-3 py-1 rounded-full border text-xs transition-all ${
            glowMode
              ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.35)]"
              : "border-stone-700 text-stone-500"
          }`}
        >
          {glowMode ? "✦ Glow on" : "✦ Glow off"}
        </button>
      </div>

      {/* Tool Actions */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-4 py-1.5 rounded-full border border-amber-500/30 text-stone-300 hover:text-amber-200 hover:border-amber-400 text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Undo
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={history.length === 0}
          className="px-4 py-1.5 rounded-full border border-amber-500/30 text-stone-300 hover:text-amber-200 hover:border-amber-400 text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={handleSurpriseMe}
          className="px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 text-xs font-medium transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]"
        >
          ✨ Surprise me
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-xs tracking-wide hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.45)]"
        >
          Save PNG
        </button>
      </div>
    </div>
  );
}
