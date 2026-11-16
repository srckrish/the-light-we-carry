import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLight } from "../../context/LightContext";
import { CONSTELLATIONS } from "../../data/festivalData";

// Sky keyframes: [timeIndex, topHex, bottomHex]
const SKY_KEYFRAMES = [
  [0, "#050408", "#120B07"],     // Home midnight
  [1, "#0A0812", "#221108"],     // Day 1 Kaag dawn
  [2, "#0F0813", "#2A1111"],     // Day 2 Kukur
  [3, "#140D07", "#381C0B"],     // Day 3 Gai & Laxmi Puja
  [4, "#160C07", "#34150C"],     // Day 4 Goru & Mha Puja
  [5, "#180F22", "#3D1818"],     // Day 5 Bhai Tika
  [5.9, "#07060D", "#1C1226"],   // Play Hub
  [6.8, "#16182B", "#6B2A1A"],   // Chhath Sunset (Sandhya)
  [7.6, "#201B34", "#BF5A28"],   // Chhath Sun setting
  [8.4, "#050A14", "#132332"],   // Chhath Night vigil
  [9.6, "#2A374D", "#DE8C36"],   // Chhath Dawn break (Usha)
  [10.8, "#120E1C", "#F5A13F"],  // Chhath Golden river sunrise
];

function hexToRgb(h) {
  return [1, 3, 5].map((i) => parseInt(h.substring(i, i + 2), 16));
}

function mixColor(c1, c2, t) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function smoothstep(t) {
  const c = clamp(t);
  return c * c * (3 - 2 * c);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function keyframeVal(t, kf) {
  let i = 0;
  while (i < kf.length - 2 && t > kf[i + 1][0]) i++;
  const a = kf[i];
  const b = kf[i + 1];
  return lerp(a[1], b[1], smoothstep((t - a[0]) / (b[0] - a[0])));
}

export default function NightCanvas({ chhathSlider = 0.5 }) {
  const canvasRef = useRef(null);
  const location = useLocation();
  const { lit, lanternQueue, releaseLantern } = useLight();

  // Extract story step from URL path
  let currentStep = 0;
  let isStory = false;
  if (location.pathname.startsWith("/story")) {
    isStory = true;
    const parts = location.pathname.split("/story/")[1];
    if (parts) {
      const parsed = parseInt(parts, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 6) {
        currentStep = parsed - 1;
      }
    }
  }

  const stateRef = useRef({
    lit,
    pathname: location.pathname,
    isStory,
    currentStep,
    chhathSlider,
    litProgress: lit ? 1 : 0,
    time: 0,
    targetSky: 0,
    currentSky: 0,
    stars: [],
    lanterns: [],
    sparks: [],
    pointer: { x: 0, y: 0, isHovering: false },
    glowSprite: null,
  });

  useEffect(() => {
    stateRef.current.lit = lit;
    stateRef.current.pathname = location.pathname;
    stateRef.current.isStory = isStory;
    stateRef.current.currentStep = currentStep;
    stateRef.current.chhathSlider = chhathSlider;
  }, [lit, location.pathname, isStory, currentStep, chhathSlider]);

  // Handle incoming lantern queue
  useEffect(() => {
    if (lanternQueue.length === 0) return;
    const latest = lanternQueue[lanternQueue.length - 1];
    stateRef.current.lanterns.push({
      x: latest.x,
      y: latest.y,
      top: window.innerHeight * 0.05 + Math.random() * (window.innerHeight * 0.22),
      vy: -(22 + Math.random() * 18),
      phase: Math.random() * 6.28,
      alpha: 0,
      scale: 0.85 + Math.random() * 0.35,
    });
    if (stateRef.current.lanterns.length > 120) {
      stateRef.current.lanterns.shift();
    }
  }, [lanternQueue]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let lastTime = performance.now();

    // Create radial glow sprite
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 128;
    glowCanvas.height = 128;
    const gCtx = glowCanvas.getContext("2d");
    const radGlow = gCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    radGlow.addColorStop(0, "rgba(255, 245, 200, 1)");
    radGlow.addColorStop(0.22, "rgba(245, 185, 75, 0.65)");
    radGlow.addColorStop(0.55, "rgba(217, 105, 35, 0.22)");
    radGlow.addColorStop(1, "rgba(217, 80, 20, 0)");
    gCtx.fillStyle = radGlow;
    gCtx.fillRect(0, 0, 128, 128);
    stateRef.current.glowSprite = glowCanvas;

    // Initialize 240 stars
    if (stateRef.current.stars.length === 0) {
      stateRef.current.stars = Array.from({ length: 240 }, () => ({
        x: Math.random(),
        y: Math.random() * 0.65,
        radius: Math.random() * 1.35 + 0.35,
        twinkleSpeed: Math.random() * 1.4 + 0.6,
        phase: Math.random() * 6.28,
        color: Math.random() > 0.75 ? "#FDE68A" : "#FFFFFF",
      }));
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const drawGlow = (px, py, r, a) => {
      if (a <= 0.001 || !stateRef.current.glowSprite) return;
      ctx.globalAlpha = clamp(a);
      ctx.drawImage(stateRef.current.glowSprite, px - r, py - r, r * 2, r * 2);
      ctx.globalAlpha = 1;
    };

    const drawDevoteeFigure = (px, py, f) => {
      ctx.fillStyle = "#0A0807";
      ctx.strokeStyle = "#0A0807";

      ctx.beginPath();
      ctx.arc(px, py, 7 * f, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(px - 10 * f, py + 9 * f);
      ctx.quadraticCurveTo(px - 13 * f, py + 60 * f, px - 21 * f, py + 110 * f);
      ctx.lineTo(px + 21 * f, py + 110 * f);
      ctx.quadraticCurveTo(px + 13 * f, py + 60 * f, px + 10 * f, py + 9 * f);
      ctx.fill();

      ctx.lineWidth = 4 * f;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(px - 9 * f, py + 22 * f);
      ctx.quadraticCurveTo(px - 26 * f, py + 2 * f, px - 9 * f, py - 20 * f);
      ctx.moveTo(px + 9 * f, py + 22 * f);
      ctx.quadraticCurveTo(px + 26 * f, py + 2 * f, px + 9 * f, py - 20 * f);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(px, py - 22 * f, 24 * f, 6 * f, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const getTargetSky = () => {
      const { pathname, isStory: isSt, currentStep: step, chhathSlider: sl } = stateRef.current;
      if (pathname === "/") return 0;
      if (pathname.startsWith("/play")) return 5.9;
      if (isSt) {
        if (step < 5) return 1 + step;
        if (sl < 0.5) {
          return lerp(6.8, 8.4, sl * 2);
        } else {
          return lerp(8.4, 10.8, (sl - 0.5) * 2);
        }
      }
      return 0;
    };

    const render = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000 || 0);
      lastTime = now;
      const s = stateRef.current;
      s.time += dt;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const riverY = h * 0.65;

      if (s.lit && s.litProgress < 1) {
        s.litProgress = Math.min(1, s.litProgress + dt * 0.8);
      }

      s.targetSky = getTargetSky();
      s.currentSky += (s.targetSky - s.currentSky) * Math.min(1, dt * 2.4);
      const t = s.currentSky;

      let idx = 0;
      while (idx < SKY_KEYFRAMES.length - 2 && t > SKY_KEYFRAMES[idx + 1][0]) {
        idx++;
      }
      const stopA = SKY_KEYFRAMES[idx];
      const stopB = SKY_KEYFRAMES[idx + 1];
      const progress = smoothstep((t - stopA[0]) / (stopB[0] - stopA[0]));
      const topColor = mixColor(stopA[1], stopB[1], progress);
      const bottomColor = mixColor(stopA[2], stopB[2], progress);

      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, topColor);
      skyGrad.addColorStop(1, bottomColor);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      const starVisibility = keyframeVal(t, [
        [0, 1],
        [6.6, 1],
        [7.5, 0.1],
        [8.4, 1],
        [9.2, 0.9],
        [10.2, 0.05],
        [11, 0],
      ]);

      for (const star of s.stars) {
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(s.time * star.twinkleSpeed + star.phase));
        const fadeHorizon = star.y < 0.45 ? 1 : clamp(1 - (star.y - 0.45) * 4);
        ctx.globalAlpha = starVisibility * twinkle * fadeHorizon * (0.3 + 0.7 * s.litProgress);
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Constellations for Tihar days 1 to 5
      if (s.isStory && s.currentStep < 5) {
        const constel = CONSTELLATIONS[s.currentStep];
        if (constel) {
          const cx = w * 0.5;
          const cy = h * 0.33;
          const scale = Math.min(w * 0.36, h * 0.22);
          const constelAlpha = 0.9;

          drawGlow(cx, cy, scale * 1.4, 0.26 * constelAlpha);

          ctx.strokeStyle = `rgba(251, 191, 36, ${0.5 * constelAlpha})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();

          for (const poly of constel) {
            for (let i = 0; i < poly.length - 1; i++) {
              const p1 = poly[i];
              const p2 = poly[i + 1];
              ctx.moveTo(cx + p1[0] * scale, cy + p1[1] * scale);
              ctx.lineTo(cx + p2[0] * scale, cy + p2[1] * scale);
            }
          }
          ctx.stroke();

          for (const poly of constel) {
            for (let i = 0; i < poly.length; i++) {
              const pt = poly[i];
              const px = cx + pt[0] * scale;
              const py = cy + pt[1] * scale;
              const pulse = 7 + 2.5 * Math.sin(s.time * 2.5 + i);
              drawGlow(px, py, pulse, 0.85);
            }
          }
        }
      }

      // CHHATH RIVER SCENE
      const chhathAlpha = clamp((t - 6.1) / 0.7);
      if (chhathAlpha > 0) {
        ctx.globalAlpha = chhathAlpha;

        const sunRadius = Math.min(w, h) * 0.085;
        const sunX = w * 0.5;
        const sunY = h * keyframeVal(t, [
          [0, 0.3],
          [6.8, 0.38],
          [7.6, 0.62],
          [8.4, 0.82],
          [9.4, 0.72],
          [10.4, 0.44],
          [11, 0.34],
        ]);

        drawGlow(sunX, sunY, sunRadius * 5.2, 0.9);

        const sunColor = mixColor("#F08A3E", "#FDE68A", clamp((t - 7.6) / 2.4));
        ctx.fillStyle = sunColor;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#180F0C";
        ctx.beginPath();
        ctx.moveTo(0, riverY + 2);
        for (let xPos = 0; xPos <= w; xPos += 16) {
          const wave = Math.sin(xPos * 0.006 + 1.3) * 26 + Math.sin(xPos * 0.017) * 10 + 34;
          ctx.lineTo(xPos, riverY - wave);
        }
        ctx.lineTo(w, riverY + 2);
        ctx.fill();

        ctx.fillStyle = "#0C0706";
        ctx.beginPath();
        ctx.moveTo(0, riverY + 2);
        for (let xPos = 0; xPos <= w; xPos += 16) {
          const wave = Math.sin(xPos * 0.01 + 4) * 14 + Math.sin(xPos * 0.03) * 5 + 14;
          ctx.lineTo(xPos, riverY - wave);
        }
        ctx.lineTo(w, riverY + 2);
        ctx.fill();

        const waterGrad = ctx.createLinearGradient(0, riverY, 0, h);
        waterGrad.addColorStop(0, mixColor("#23484C", bottomColor, 0.4));
        waterGrad.addColorStop(1, "#0A1416");
        ctx.fillStyle = waterGrad;
        ctx.fillRect(0, riverY, w, h - riverY);

        const sunElevationFactor = clamp((riverY + sunRadius * 0.4 - sunY) / (sunRadius * 2));
        for (let i = 0; i < 42; i++) {
          const rippleY = riverY + 5 + i * i * 0.07 + i * 1.6;
          if (rippleY > h) break;
          const rippleLen = sunRadius * (0.35 + 0.65 * Math.abs(Math.sin(i * 1.7 + s.time))) * (1.1 + i * 0.05);
          const rippleAlpha = sunElevationFactor * (1 - i / 48) * 0.75 * chhathAlpha;
          ctx.strokeStyle = `rgba(255, 214, 140, ${rippleAlpha})`;
          ctx.lineWidth = 1.6 + i * 0.04;
          ctx.beginPath();
          ctx.moveTo(sunX - rippleLen + Math.sin(s.time + i) * 6, rippleY);
          ctx.lineTo(sunX + rippleLen + Math.sin(s.time + i) * 6, rippleY);
          ctx.stroke();
        }

        const devoteeScale = h / 760;
        const figAlpha = chhathAlpha * keyframeVal(t, [
          [0, 0],
          [6.8, 0],
          [7.3, 1],
          [10.8, 1],
          [11.2, 0.5],
        ]);
        ctx.globalAlpha = figAlpha;
        [0.26, 0.5, 0.74].forEach((q) => {
          const isCenter = q === 0.5;
          const scale = devoteeScale * (isCenter ? 1.15 : 0.95);
          drawDevoteeFigure(w * q, riverY - 68 * scale, scale);
        });

        ctx.globalAlpha = chhathAlpha;
        [0.14, 0.32, 0.48, 0.68, 0.86].forEach((q, idxx) => {
          const diyaY = riverY + h * 0.05 + (idxx % 2) * 12 + Math.sin(s.time * 1.4 + idxx) * 3;
          const diyaX = w * q + Math.sin(s.time * 0.8 + idxx) * 8;
          drawGlow(diyaX, diyaY, 26 + 3 * Math.sin(s.time * 6 + idxx), 0.9);
          drawGlow(diyaX, diyaY + h * 0.02, 14, 0.4);
        });

        ctx.globalAlpha = 1;
      }

      // Floating Sky Lanterns
      for (let i = s.lanterns.length - 1; i >= 0; i--) {
        const l = s.lanterns[i];
        l.alpha = Math.min(1, l.alpha + dt * 1.6);
        if (l.y > l.top) {
          l.y += l.vy * dt;
        }
        const sway = Math.sin(s.time * 0.9 + l.phase) * 10;
        const lx = l.x + sway;

        const glowPulse = 20 * l.scale + 3 * Math.sin(s.time * 5 + l.phase);
        drawGlow(lx, l.y, glowPulse, 0.85 * l.alpha);

        ctx.fillStyle = `rgba(184, 92, 56, ${0.85 * l.alpha})`;
        ctx.beginPath();
        ctx.ellipse(lx, l.y + 4 * l.scale, 7 * l.scale, 3 * l.scale, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 246, 210, ${l.alpha})`;
        ctx.beginPath();
        ctx.arc(lx, l.y, 2.4 * l.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sparks
      for (let i = s.sparks.length - 1; i >= 0; i--) {
        const p = s.sparks[i];
        p.life -= dt;
        if (p.life <= 0) {
          s.sparks.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 85 * dt;
        drawGlow(p.x, p.y, 8, p.life * 0.9);
      }

      if (s.pointer.isHovering) {
        drawGlow(s.pointer.x, s.pointer.y, 65, 0.22 * s.litProgress);
      }

      if (s.litProgress < 1) {
        ctx.fillStyle = "#050407";
        ctx.globalAlpha = (1 - s.litProgress) * 0.93;
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handlePointerMove = (e) => {
      stateRef.current.pointer.x = e.clientX;
      stateRef.current.pointer.y = e.clientY;
      stateRef.current.pointer.isHovering = true;

      if (stateRef.current.lit && Math.random() < 0.25 && e.pointerType !== "touch") {
        stateRef.current.sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 40,
          vy: -Math.random() * 45,
          life: 0.65,
        });
      }
    };

    const handlePointerLeave = () => {
      stateRef.current.pointer.isHovering = false;
    };

    const handleCanvasClick = (e) => {
      if (e.target === canvas) {
        releaseLantern(e.clientX, e.clientY);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("pointerdown", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointerdown", handleCanvasClick);
    };
  }, [releaseLantern]);

  return (
    <canvas
      ref={canvasRef}
      id="cv"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
    />
  );
}
