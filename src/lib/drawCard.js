
const wishes = {
    "subha-tihar": "SUBHA TIHAR",
    "happy-chhath": "HAPPY CHHATH",
    "gratitude-and-light": "GRATITUDE AND LIGHT TO YOUR HOME",
  };
  
  export default async function drawCard(canvas, { name, wish }) {
    if (!canvas) return;
  
    // Wait for the display font before drawing.
    await document.fonts.load('600 96px "Cormorant Garamond"');
  
    const ctx = canvas.getContext("2d");
  
    if (!ctx) return;
  
    const width = 1080;
    const height = 1350;
  
    canvas.width = width;
    canvas.height = height;
  
    // Background
    ctx.fillStyle = "#11110F";
    ctx.fillRect(0, 0, width, height);
  
    // Central radial glow
    const glow = ctx.createRadialGradient(
      width / 2,
      550,
      20,
      width / 2,
      550,
      480
    );
  
    glow.addColorStop(0, "rgba(217, 164, 65, 0.24)");
    glow.addColorStop(0.45, "rgba(184, 92, 56, 0.10)");
    glow.addColorStop(1, "rgba(17, 17, 15, 0)");
  
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  
    // Decorative border
    ctx.strokeStyle = "rgba(217, 164, 65, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, width - 110, height - 110);
  
    // Small decorative corner marks
    ctx.fillStyle = "#D9A441";
  
    [
      [85, 85],
      [width - 85, 85],
      [85, height - 85],
      [width - 85, height - 85],
    ].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  
    // Diya glow
    const diyaGlow = ctx.createRadialGradient(
      width / 2,
      490,
      5,
      width / 2,
      490,
      210
    );
  
    diyaGlow.addColorStop(0, "rgba(242, 197, 110, 0.28)");
    diyaGlow.addColorStop(1, "rgba(242, 197, 110, 0)");
  
    ctx.fillStyle = diyaGlow;
    ctx.fillRect(290, 280, 500, 430);
  
    // Diya flame using Path2D
    const flame = new Path2D(
      "M 540 275 C 485 340 495 390 540 415 C 585 390 595 340 540 275 Z"
    );
  
    ctx.fillStyle = "#E7A33E";
    ctx.fill(flame);
  
    const innerFlame = new Path2D(
      "M 540 330 C 515 365 522 390 540 400 C 558 390 565 365 540 330 Z"
    );
  
    ctx.fillStyle = "#F5EDDF";
    ctx.fill(innerFlame);
  
    // Diya bowl
    const bowl = new Path2D(
      "M 400 440 Q 540 505 680 440 Q 660 565 540 575 Q 420 565 400 440 Z"
    );
  
    ctx.fillStyle = "#B85C38";
    ctx.fill(bowl);
  
    ctx.strokeStyle = "#D9A441";
    ctx.lineWidth = 5;
    ctx.stroke(bowl);
  
    // Bowl highlight
    ctx.beginPath();
    ctx.moveTo(430, 465);
    ctx.quadraticCurveTo(540, 510, 650, 465);
    ctx.strokeStyle = "#F2C56E";
    ctx.lineWidth = 4;
    ctx.stroke();
  
    // Decorative divider
    ctx.beginPath();
    ctx.moveTo(390, 720);
    ctx.lineTo(690, 720);
    ctx.strokeStyle = "rgba(217, 164, 65, 0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();
  
    // Selected wish
    const wishText = wishes[wish] || wishes["subha-tihar"];
  
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#D9A441";
    ctx.font = '500 25px "DM Sans", sans-serif';
    ctx.letterSpacing = "5px";
    ctx.fillText(wishText, width / 2, 800, 850);
  
    // Name
    const displayName = name.trim() || "A Friend of Light";
    const maxNameWidth = 850;
  
    let fontSize = 96;
  
    ctx.font = `600 ${fontSize}px "Cormorant Garamond", serif`;
  
    // Reduce font size until the name fits.
    while (
      ctx.measureText(displayName).width > maxNameWidth &&
      fontSize > 42
    ) {
      fontSize -= 2;
      ctx.font = `600 ${fontSize}px "Cormorant Garamond", serif`;
    }
  
    ctx.fillStyle = "#F5EDDF";
    ctx.fillText(displayName, width / 2, 940, maxNameWidth);
  
    // Closing line
    ctx.fillStyle = "rgba(245, 237, 223, 0.75)";
    ctx.font = '400 27px "DM Sans", sans-serif';
    ctx.letterSpacing = "1px";
  
    ctx.fillText(
      "The light we carry stays.",
      width / 2,
      1080
    );
  
    // Project signature
    ctx.fillStyle = "#D9A441";
    ctx.font = '500 18px "DM Sans", sans-serif';
    ctx.letterSpacing = "4px";
  
    ctx.fillText(
      "THE LIGHT WE CARRY",
      width / 2,
      1200
    );
  }
  