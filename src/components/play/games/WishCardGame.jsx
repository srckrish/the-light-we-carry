import { useState, useRef, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { WISH_PRESETS } from "../../../data/festivalData";
import { useLight } from "../../../context/LightContext";

const THEMES = [
  { id: "midnight", label: "Midnight Gold", bg1: "#22130A", bg2: "#060509", gold: "#D9A441", flame: "#F2C56E" },
  { id: "sayapatri", label: "Sayapatri Amber", bg1: "#361608", bg2: "#140703", gold: "#F59E0B", flame: "#FEF08A" },
  { id: "himalayan", label: "Himalayan Dawn", bg1: "#1A2238", bg2: "#070B16", gold: "#FBBF24", flame: "#FFEDD5" },
];

export default function WishCardGame() {
  const canvasRef = useRef(null);
  const [name, setName] = useState("");
  const [selectedWishIdx, setSelectedWishIdx] = useState(0);
  const [customWish, setCustomWish] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("midnight");
  const [canShare, setCanShare] = useState(false);

  const { releaseLantern, playChimeNote, showToast } = useLight();

  const currentWishText = customWish.trim() || WISH_PRESETS[selectedWishIdx];
  const themeObj = THEMES.find((t) => t.id === selectedTheme) || THEMES[0];

  const renderCard = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      if (document.fonts) {
        await document.fonts.load('600 70px "Cormorant Garamond"');
      }
    } catch (e) {}

    const w = 1080;
    const h = 1350;
    canvas.width = w;
    canvas.height = h;

    // Background gradient: themed radial
    const bgGrad = ctx.createRadialGradient(w / 2, h * 0.44, 20, w / 2, h * 0.44, 760);
    bgGrad.addColorStop(0, themeObj.bg1);
    bgGrad.addColorStop(0.65, themeObj.bg2);
    bgGrad.addColorStop(1, "#030206");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Starlight dust
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < 95; i++) {
      ctx.globalAlpha = 0.15 + ((i * 37) % 10) / 14;
      ctx.beginPath();
      ctx.arc((i * 389) % w, ((i * 211) % 650) + 60, 1 + (i % 3) * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Outer double ornamental gold border
    ctx.strokeStyle = themeObj.gold;
    ctx.lineWidth = 3.5;
    ctx.strokeRect(50, 50, w - 100, h - 100);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(68, 68, w - 136, h - 136);

    // Corner rosettes
    const corners = [
      [68, 68],
      [w - 68, 68],
      [68, h - 68],
      [w - 68, h - 68],
    ];
    ctx.fillStyle = themeObj.gold;
    for (const [cx, cy] of corners) {
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Warm radial glow behind diya
    const diyaGlow = ctx.createRadialGradient(w / 2, 580, 10, w / 2, 580, 420);
    diyaGlow.addColorStop(0, "rgba(245, 175, 75, 0.65)");
    diyaGlow.addColorStop(0.5, "rgba(231, 116, 46, 0.2)");
    diyaGlow.addColorStop(1, "rgba(231, 116, 46, 0)");
    ctx.fillStyle = diyaGlow;
    ctx.fillRect(0, 160, w, 880);

    // Diya Clay Pot Base
    ctx.fillStyle = "#B85C38";
    ctx.beginPath();
    ctx.moveTo(370, 680);
    ctx.quadraticCurveTo(w / 2, 860, 710, 680);
    ctx.quadraticCurveTo(w / 2, 725, 370, 680);
    ctx.fill();

    // Diya Lip
    ctx.fillStyle = "#D9764A";
    ctx.beginPath();
    ctx.ellipse(w / 2, 680, 170, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Golden Outer Flame
    ctx.fillStyle = themeObj.flame;
    ctx.beginPath();
    ctx.moveTo(w / 2, 450);
    ctx.quadraticCurveTo(630, 580, w / 2, 670);
    ctx.quadraticCurveTo(450, 580, w / 2, 450);
    ctx.fill();

    // Bright Inner Flame Core
    ctx.fillStyle = "#FFFBEB";
    ctx.beginPath();
    ctx.moveTo(w / 2, 560);
    ctx.quadraticCurveTo(578, 615, w / 2, 670);
    ctx.quadraticCurveTo(502, 615, w / 2, 560);
    ctx.fill();

    // Header Text: "T I H A R · C H H A T H"
    ctx.textAlign = "center";
    ctx.fillStyle = themeObj.gold;
    ctx.font = '600 32px "DM Sans", sans-serif';
    ctx.fillText("T I H A R   ·   C H H A T H", w / 2, 180);

    // Recipient Name with dynamic font size reduction
    const recipient = name.trim() || "Dear Friend";
    let nameSize = 100;
    ctx.fillStyle = "#FAF5EE";
    do {
      ctx.font = `600 ${nameSize}px "Cormorant Garamond", Georgia, serif`;
      nameSize -= 4;
    } while (ctx.measureText(recipient).width > 820 && nameSize > 36);
    ctx.fillText(recipient, w / 2, 970);

    // Wish Blessing Text (wrapped)
    ctx.font = '500 42px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = themeObj.gold;
    const words = currentWishText.split(" ");
    let line = "";
    let yPos = 1050;
    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > 780) {
        ctx.fillText(line, w / 2, yPos);
        yPos += 54;
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) {
      ctx.fillText(line, w / 2, yPos);
    }

    // Card Footer Watermark
    ctx.font = '500 24px "DM Sans", sans-serif';
    ctx.fillStyle = "#A89D88";
    ctx.fillText("The Light We Carry · Nepal", w / 2, 1260);
  }, [name, currentWishText, themeObj]);

  useEffect(() => {
    renderCard();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => renderCard());
    }
  }, [renderCard]);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.canShare) {
      setCanShare(true);
    }
  }, []);

  const getCardBlob = () => {
    return new Promise((resolve) => {
      if (!canvasRef.current) return resolve(null);
      canvasRef.current.toBlob((blob) => resolve(blob), "image/png");
    });
  };

  const handleDownload = async () => {
    await renderCard();
    const blob = await getCardBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tihar-chhath-${name.trim().toLowerCase() || "wish"}.png`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 4000);

    releaseLantern();
    playChimeNote(3);
    showToast("Card downloaded! A light was released to the sky.");

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#F59E0B", "#FBBF24", "#F43F5E", "#10B981"],
    });
  };

  const handleShare = async () => {
    try {
      await renderCard();
      const blob = await getCardBlob();
      if (!blob) return;
      const file = new File([blob], "the-light-we-carry.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "The Light We Carry",
          text: currentWishText,
        });
        releaseLantern();
        showToast("Shared with light!");
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.65 },
          colors: ["#F59E0B", "#FBBF24", "#F43F5E"],
        });
      } else {
        handleDownload();
      }
    } catch (err) {
      // User cancelled share
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 max-w-4xl mx-auto">
      {/* Form Controls */}
      <div className="flex-1 space-y-5 text-left w-full">
        {/* Aesthetic Theme Picker */}
        <div>
          <span className="block text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Card Aesthetic
          </span>
          <div className="flex items-center gap-2">
            {THEMES.map((th) => (
              <button
                key={th.id}
                type="button"
                onClick={() => setSelectedTheme(th.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                  selectedTheme === th.id
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] scale-105"
                    : "bg-stone-900 border-amber-500/15 text-stone-400 hover:border-amber-500/40"
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="card-name" className="block text-xs font-semibold tracking-wider uppercase text-amber-400 mb-1.5">
            Recipient Name (up to 24 characters)
          </label>
          <input
            id="card-name"
            type="text"
            maxLength={24}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Dearest Sister, Brother, Friend"
            className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-amber-500/30 text-ivory text-sm placeholder:text-stone-600 focus-visible:outline-none focus-visible:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400/40"
          />
        </div>

        <div>
          <span className="block text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Choose a Sacred Blessing
          </span>
          <div className="space-y-2">
            {WISH_PRESETS.map((preset, idx) => (
              <label
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                  selectedWishIdx === idx && !customWish
                    ? "bg-amber-950/40 border-amber-400 text-amber-200"
                    : "bg-stone-900/60 border-amber-500/15 text-stone-300 hover:border-amber-500/30"
                }`}
              >
                <input
                  type="radio"
                  name="wish"
                  checked={selectedWishIdx === idx && !customWish}
                  onChange={() => {
                    setSelectedWishIdx(idx);
                    setCustomWish("");
                  }}
                  className="mt-0.5 accent-amber-500"
                />
                <span>{preset}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="custom-wish" className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-1.5">
            Or write your own wish
          </label>
          <input
            id="custom-wish"
            type="text"
            maxLength={80}
            value={customWish}
            onChange={(e) => setCustomWish(e.target.value)}
            placeholder="Type your personal message…"
            className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-amber-500/20 text-ivory text-xs sm:text-sm placeholder:text-stone-600 focus-visible:outline-none focus-visible:border-amber-400"
          />
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)]"
          >
            Download PNG
          </button>

          {canShare && (
            <button
              type="button"
              onClick={handleShare}
              className="px-6 py-2.5 rounded-full bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-amber-200 font-medium text-xs sm:text-sm tracking-wide transition-all"
            >
              Share Card
            </button>
          )}
        </div>
      </div>

      {/* Card Canvas Preview */}
      <div className="w-full lg:w-80 shrink-0">
        <p className="text-xs text-stone-400 mb-2 text-center lg:text-left">
          Live Preview (1080 × 1350 HD):
        </p>
        <div className="rounded-2xl p-1 bg-stone-950/90 border border-amber-500/30 shadow-2xl overflow-hidden backdrop-blur-xl">
          <canvas
            ref={canvasRef}
            className="w-full h-auto rounded-xl drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            aria-label="Wish Card Preview"
          />
        </div>
      </div>
    </div>
  );
}
