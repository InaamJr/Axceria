import React, { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Axceria Loader — light theme, signature write-on
 * + Lux gradient border frame (rounded, inset margin)
 * + Animated "silk" background inside the frame
 * + Subtle grain overlay
 */
const WRITE_MS = 3200;        // handwriting duration
const HOLD_MS  = 1000;         // hold after write
const INTRO_MS = WRITE_MS + HOLD_MS;

// Custom easing sequence for the pen path
const handwritingEasing = [
  "linear","easeIn","easeOut","easeInOut","linear","easeIn","easeOut","easeInOut","linear",
  "easeIn","easeOut","easeInOut","linear","easeIn","easeOut","easeInOut","linear",
];

export default function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), INTRO_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  // Key times for the handwriting reveal
  const times = [
    0, 0.05, 0.1, 0.15,      // A
    0.2, 0.25, 0.3, 0.35,    // x
    0.4, 0.45, 0.5, 0.55, 0.6, // c
    0.65, 0.7, 0.75,         // e
    0.8, 0.83, 0.86, 0.89,   // r
    0.92, 0.95, 0.98,        // i
    1                        // a
  ];

  // Pen x positions
  const penLeftStops = [
    "0%","3.5%","7%","14%",
    "17%","23%","30%","36%",
    "40%","45%","52%","59%","64%",
    "68%","72%","76%",
    "79%","81%","83%","86%",
    "89%","91%","93%",
    "100%"
  ];

  // Pen y positions
  const penTopStops = [
    "75%","25%","25%","75%",   // A
    "60%","40%","60%","40%",   // x
    "50%","45%","55%","45%","50%", // c
    "50%","45%","55%",         // e
    "70%","50%","45%","70%",   // r
    "50%","50%","50%",         // i
    "75%"                      // a
  ];

  // Reveal clip-path keyed to pen x
  const clipFrames = penLeftStops.map(
    (stop) => `inset(0% calc(100% - ${stop}) 0% 0%)`
  );

  // Very light SVG noise (for upscale feel)
  const noise = `url("data:image/svg+xml;utf8,` +
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>` +
      `<filter id='n' x='0%' y='0%' width='100%' height='100%'>` +
        `<feTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>` +
        `<feColorMatrix type='saturate' values='0'/>` +
        `<feComponentTransfer><feFuncA type='linear' slope='0.035'/></feComponentTransfer>` +
      `</filter>` +
      `<rect width='100%' height='100%' filter='url(%23n)'/>` +
    `</svg>")`;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Margin from the outside edges */}
      <div className="pointer-events-none absolute inset-0 p-3 sm:p-4 md:p-6">
        {/* Luxe gradient border frame */}
        <div
          className="
            h-full w-full rounded-[28px] p-[1.6px]
            bg-gradient-to-br from-[#F1E2CA] via-[#E6CFAF] to-[#C9A878]
            shadow-[0_10px_40px_rgba(0,0,0,0.15)]
          "
          style={{ backdropFilter: "saturate(110%)" }}
        >
          {/* Inner panel (actual loader stage) */}
          <div
            className="
              relative h-full w-full rounded-[26px] overflow-hidden
              bg-gradient-to-br from-axc.blush/35 via-axc.paper to-axc.gold/20
              [background:linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0)_22%)_0_0/100%_100%_no-repeat]
            "
          >
            {/* Animated “silk” background inside the frame */}
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(60% 50% at 20% 25%, rgba(255, 240, 223, 0.35) 0%, rgba(255, 240, 223, 0) 60%),
                  radial-gradient(45% 40% at 80% 30%, rgba(235, 203, 157, 0.30) 0%, rgba(235, 203, 157, 0) 60%),
                  radial-gradient(50% 55% at 30% 80%, rgba(242, 214, 193, 0.28) 0%, rgba(242, 214, 193, 0) 60%),
                  radial-gradient(55% 45% at 75% 75%, rgba(217, 188, 140, 0.22) 0%, rgba(217, 188, 140, 0) 60%)
                `,
                backgroundSize: "140% 140%, 140% 140%, 140% 140%, 140% 140%",
                filter: "saturate(105%)",
              }}
              initial={{ backgroundPosition: "0% 0%, 100% 0%, 0% 100%, 100% 100%" }}
              animate={{ backgroundPosition: ["0% 0%, 100% 0%, 0% 100%, 100% 100%", "100% 100%, 0% 100%, 100% 0%, 0% 0%"] }}
              transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />

            {/* Ultra-subtle diagonal sheen */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 12px)",
              }}
            />

            {/* Grain overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
              style={{ backgroundImage: noise, backgroundRepeat: "repeat" }}
            />

            {/* Content layer */}
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="relative mx-auto max-w-[92vw] px-6">
                {/* Intrinsic-width block keeps the wordmark perfectly centered */}
                <div className="relative inline-block">
                  {/* Faint outline to stabilize layout while font loads */}
                  <h1
                    aria-hidden
                    className="font-logo leading-none select-none text-[16vw] sm:text-[8rem]"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "0.6px rgba(31,41,55,0.06)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Axceria
                  </h1>

                  {/* Clip-path handwriting reveal */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ clipPath: clipFrames[0] }}
                    animate={{ clipPath: clipFrames }}
                    transition={{ duration: WRITE_MS / 1000, times, ease: handwritingEasing }}
                    style={{ willChange: "clip-path" }}
                  >
                    <h1
                      className="font-logo leading-none select-none text-[16vw] sm:text-[8rem]"
                      style={{
                        background:
                          "linear-gradient(90deg, #1f2937 0%, #7c5a2f 40%, #1f2937 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        letterSpacing: "0.02em",
                        filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.03))",
                      }}
                    >
                      Axceria
                    </h1>
                  </motion.div>

                  {/* Pen bead (2D path) */}
                  <motion.span
                    className="absolute h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0 0 0 3px rgba(214,188,140,0.18)",
                    }}
                    initial={{ left: penLeftStops[0], top: penTopStops[0], opacity: 1 }}
                    animate={{ left: penLeftStops, top: penTopStops }}
                    transition={{ duration: WRITE_MS / 1000, times, ease: handwritingEasing }}
                  />
                </div>

                {/* Tagline */}
                <motion.p
                  className="mt-6 text-sm tracking-wide text-zinc-500 text-center"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: WRITE_MS / 1000 - 0.5, duration: 0.75 }}
                >
                  Curating luxury accessories for the bold &amp; young
                </motion.p>
              </div>
            </div>

            {/* Inner soft vignette for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[26px]"
              style={{
                boxShadow: "inset 0 0 80px rgba(0,0,0,0.08), inset 0 0 160px rgba(0,0,0,0.06)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
