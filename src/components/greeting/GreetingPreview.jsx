
import { useEffect, useRef, useState } from "react";
import drawCard from "../../lib/drawCard.js";

// Convert the canvas into a PNG Blob.
function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Could not generate the greeting card."));
      }
    }, "image/png");
  });
}

export default function GreetingPreview({ name, wish }) {
  const canvasRef = useRef(null);
  const [canShare, setCanShare] = useState(false);

  // Redraw whenever the name or wish changes.
  useEffect(() => {
    let cancelled = false;

    async function renderCard() {
      try {
        const canvas = canvasRef.current;

        if (!canvas) return;

        await drawCard(canvas, { name, wish });

        if (cancelled) return;

        // Check whether this browser supports sharing image files.
        if (
          typeof File !== "undefined" &&
          navigator.canShare &&
          navigator.share
        ) {
          const blob = await canvasToBlob(canvas);

          const file = new File(
            [blob],
            "light-card.png",
            { type: "image/png" }
          );

          if (!cancelled) {
            setCanShare(
              navigator.canShare({ files: [file] })
            );
          }
        } else {
          setCanShare(false);
        }
      } catch (error) {
        console.error("Card rendering failed:", error);
        setCanShare(false);
      }
    }

    renderCard();

    return () => {
      cancelled = true;
    };
  }, [name, wish]);

  // Download the greeting card.
  async function handleDownload() {
    try {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const blob = await canvasToBlob(canvas);
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "light-card.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      // Release the temporary object URL.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Card download failed:", error);
    }
  }

  // Share the greeting card where supported.
  async function handleShare() {
    try {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const blob = await canvasToBlob(canvas);

      const file = new File(
        [blob],
        "light-card.png",
        { type: "image/png" }
      );

      if (!navigator.canShare?.({ files: [file] })) {
        setCanShare(false);
        return;
      }

      await navigator.share({
        files: [file],
        title: "The Light We Carry",
      });
    } catch (error) {
      // Closing the native share dialog is not an application error.
      if (error.name !== "AbortError") {
        console.error("Card sharing failed:", error);
      }
    }
  }

  const wishLabels = {
    "subha-tihar": "Subha Tihar",
    "happy-chhath": "Happy Chhath",
    "gratitude-and-light": "Gratitude and light to your home",
  };

  return (
    <div className="mx-auto w-full max-w-[540px] space-y-6">
      {/* CARD PREVIEW */}
      <canvas
        ref={canvasRef}
        aria-label={`Greeting card for ${name || "a friend"}: ${
          wishLabels[wish] || "Subha Tihar"
        }`}
        className="block h-auto w-full rounded-lg shadow-2xl shadow-black/40"
      />

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-full bg-diya-gold px-7 py-3 text-sm font-medium text-midnight transition-colors hover:bg-sunset"
        >
          Download card
        </button>

        {canShare && (
          <button
            type="button"
            onClick={handleShare}
            className="rounded-full border border-ivory/30 px-7 py-3 text-sm font-medium text-ivory transition-colors hover:border-diya-gold hover:text-diya-gold"
          >
            Share card
          </button>
        )}
      </div>

      {/* IPHONE FALLBACK */}
      <p className="text-center text-xs leading-6 text-ivory/45">
        On iPhone, press and hold the image to save it.
      </p>
    </div>
  );
}
