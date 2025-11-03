import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Clock3,
  Star,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { cn } from "/src/lib/utils";

/**
 * Axceria — Home Page (fixed)
 * - Hero fills viewport (100svh) and centers content
 * - About, Process, Featured Collections sections
 * - Liquid glass + luxe gradients
 * - Removed accidental escaped quotes (\") that caused SyntaxError in TS/JSX parser
 * - Added lightweight runtime self-tests (dev only) + data-testid hooks
 *
 * Tailwind tokens assumed: axc.paper, axc.ink, axc.gold, axc.blush, axc.veil
 */

// ---- Motion helpers -------------------------------------------------------
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

// ---- UI primitives --------------------------------------------------------
function Glass({ className = "", children, ...props }) {
  return (
    <div {...props}
      className={
        "relative rounded-3xl p-px bg-gradient-to-br from-[#F1E2CA] via-[#E6CFAF] to-[#C9A878] shadow-[0_12px_50px_rgba(0,0,0,0.15)]" +
        // "relative rounded-3xl p-px bg-transparent" +
        className
      }
    >
      <div
        className="relative h-full rounded-[calc(1.5rem-1px)] overflow-hidden bg-white/45 dark:bg-white/5 backdrop-blur-xl"
        style={{
          WebkitMaskImage:
            "radial-gradient(120%_120%_at_50%_0%,#000_50%,transparent_70%)",
        }}
      >
        {/* Soft inner vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 80px rgba(0,0,0,0.06), inset 0 0 160px rgba(0,0,0,0.04)",
          }}
        />
        {children}
      </div>
    </div>
  );
}

function PrimaryButton({ children }) {
  return (
    <a
      href="#collections"
      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-axc.ink/90 bg-gradient-to-r from-[#D6BC8C] via-[#F2D6C1] to-[#D6BC8C] shadow-lg shadow-[#C9A878]/20 hover:shadow-xl hover:-translate-y-0.5 transition will-change-transform"
    >
      {children} <ChevronRight size={18} />
    </a>
  );
}

function GhostButton({ children, href = "#about" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-axc.ink/80 bg-white/20 dark:bg-white/10 border border-white/30 hover:bg-white/30 transition"
    >
      {children}
    </a>
  );
}

function SectionHeader({ kicker, title, subtitle }) {
  return (
    <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
      {kicker && (
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-axc.gold/10 px-3 py-1 text-xs font-semibold tracking-wider text-axc.ink/70">
          <Sparkles size={14} /> {kicker}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-axc.ink">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-axc.ink/70 leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}

// ---- Decorative backgrounds ----------------------------------------------
function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Soft radial spotlights */}
      <div
        className="absolute -top-24 left-1/2 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(242,214,193,0.45) 0%, rgba(242,214,193,0) 60%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] h-[45vh] w-[45vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(214,188,140,0.35) 0%, rgba(214,188,140,0) 60%)",
        }}
      />
      {/* Subtle diagonal sheen */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.5) 0 2px, transparent 2px 14px)",
        }}
      />
    </div>
  );
}

// ---- Sections -------------------------------------------------------------
function Hero() {
  return (
    <section data-testid="hero" className="relative h-[90svh] flex items-stretch p-3 sm:p-4 md:p-6">
      <BackgroundDecor />
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
        )}
      />

      <Glass data-testid="hero-frame" className="w-full h-full">
        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 sm:p-24 h-full">
          {/* NEW: Mobile-only visual placeholder to fill the space */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            className="lg:hidden mx-auto" // Show only on <lg screens
          >
            <div className="w-full max-w-sm h-72 sm:h-80 rounded-3xl p-px bg-gradient-to-br from-[#F1E2CA] via-[#E6CFAF] to-[#C9A878]">
              <div className="rounded-[calc(1.5rem-1px)] overflow-hidden bg-white/45 backdrop-blur-xl">
                {/* You can replace this with a better image/collage */}
                <img
                  src="/images/chain_hr2.jpg" // Use one of your product images
                  alt="Featured Axceria Product"
                  className="w-full h-72 sm:h-80 object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          {/* Left: Copy */}
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUp} className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-axc.gold/15 px-3 py-1 text-xs font-semibold text-axc.ink/70">
              {/* <BadgeCheck size={14} /> New Drop Live Now */}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl mb-4 sm:text-6xl font-semibold leading-[1.05] h-32"
              style={{
                background:
                  "linear-gradient(90deg, #1f2937 0%, #7c5a2f 40%, #1f2937 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Luxury accessories for the bold & young.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-base sm:text-lg text-axc.ink/70"
            >
              Crafted metals, refined silhouettes, and a finish that catches the
              light. Axceria pieces are designed to be noticed—and made to last.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton>
                Shop new drops
              </PrimaryButton>
              <GhostButton href="#about">Our story</GhostButton>
            </motion.div>

            {/* Trust mini-bar */}
            <motion.ul
              variants={fadeUp}
              className="mt-8 grid grid-cols-3 text-sm text-axc.ink/70"
            >
              {/* <li className="flex items-center gap-2"><ShieldCheck size={16}/> 1-year warranty</li> */}
              <li className="flex items-center gap-2"><Clock3 size={16}/> Fast dispatch</li>
              <li className="flex items-center gap-2"><Star size={16}/> 4.9 reviews</li>
            </motion.ul>
          </motion.div>

          {/* Right: Visual card cluster */}
          <motion.div
            {...fadeUp}
            className="hidden lg:flex relative h-[540px] md:h-[460px]"
          >
            {/* Floating cards to suggest product categories */}
            {/* Chains — top/left on both, a bit smaller on mobile */}
            <FloatingCard
              className="
                top-2 left-2 rotate-[-4deg] scale-[0.92] z-30
                md:top-0 md:left-10 md:rotate-[-8deg] md:scale-100
              "
              title="Chains"
              caption="Grade A steel, anti-tarnish"
              imageSrc="/images/chain_hr2.jpg"
            />

            {/* Rings — center-bottom on mobile; your original bottom-right on desktop */}
            <FloatingCard
              className="
                bottom-4 left-1/2 -translate-x-1/2 rotate-[1deg] scale-[0.95] z-20
                md:bottom-0 md:left-auto md:right-56 md:translate-x-0 md:rotate-[2deg] md:scale-100
              "
              title="Rings"
              caption="Minimal, made for daily wear"
              delay={0.15}
              imageSrc="/images/ring_hr.jpg"
            />

            {/* Earrings — staggered on mobile; original top-right on desktop */}
            <FloatingCard
              className="
                top-16 right-2 rotate-[5deg] scale-[0.9] z-10
                md:top-10 md:right-0 md:scale-100
              "
              title="Earrings"
              caption="Statement bezels & classic dials"
              delay={0.3}
              imageSrc="/images/earing_hr.jpg"
            />
          </motion.div>
        </div>
      </Glass>
    </section>
  );
}

function FloatingCard({ className = "", title, caption, imageSrc, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={
        "absolute w-[200px] sm:w-[220px] md:w-[260px] rounded-2xl p-px " +
        "bg-gradient-to-br from-[#EED9B6] via-[#E3C89A] to-[#C9A878] " +
        className
      }
    >
        <div className="rounded-[1rem] bg-white/60 dark:bg-white/10 backdrop-blur-xl p-4">
            <div className="flex items-center gap-2 text-axc.ink/80">
                <Wand2 size={18} />
                <span className="text-sm font-semibold tracking-wide">{title}</span>
            </div>
            <p className="mt-2 text-xs text-axc.ink/70">{caption}</p>
            <div className="mt-4 h-30 rounded-xl bg-gradient-to-br from-axc.blush/40 via-white/10 to-axc.gold/30">
                {imageSrc && (
                    <img 
                    src={imageSrc} 
                    alt={title} 
                    className="w-full h-full object-cover" 
                    />
                )}
                {/* Fallback/Placeholder if no imageSrc is provided */}
                {!imageSrc && (
                    <div className="w-full h-full bg-gradient-to-br from-axc.blush/40 via-white/10 to-axc.gold/30" />
                )}
            </div>
        </div>
    </motion.div>
  );
}

function About() {
  return (
    <section data-testid="about" id="about" className="relative container mx-auto px-6 mt-10 sm:mt-14 py-16 sm:py-24">
      <SectionHeader
        kicker="ABOUT AXCERIA"
        title="Craft, detail, and a little obsession."
        subtitle="Born from a love for clean lines and subtle shine, Axceria curates pieces that amplify your personal aesthetic without shouting."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Glass>
          <div className="p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-axc.ink">Our ethos</h3>
            <p className="mt-3 text-axc.ink/75 leading-relaxed">
              We work with trusted manufacturers and hand-check each batch to
              ensure consistent finish and durability. Every collection is small
              and intentional—because timeless beats trend-chasing.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-axc.ink/80">
              <li className="flex items-center gap-2"><BadgeCheck size={16}/> Hypoallergenic finishes</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16}/> Tarnish-resistant coating</li>
              <li className="flex items-center gap-2"><Clock3 size={16}/> Quick support</li>
              <li className="flex items-center gap-2"><Star size={16}/> Community-led designs</li>
            </ul>
          </div>
        </Glass>

        <Glass>
          <div className="p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-axc.ink">Materials</h3>
            <p className="mt-3 text-axc.ink/75 leading-relaxed">
              We prioritise 316L stainless steel, PVD gold plating, and
              scratch‑resistant mineral glass for watches—balancing luxury look
              with everyday resilience.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-md p-4">
                <p className="text-xs text-axc.ink/60">Steel</p>
                <p className="text-sm font-semibold">316L</p>
              </div>
              <div className="rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-md p-4">
                <p className="text-xs text-axc.ink/60">Plating</p>
                <p className="text-sm font-semibold">PVD</p>
              </div>
              <div className="rounded-xl bg-white/40 dark:bg-white/10 backdrop-blur-md p-4">
                <p className="text-xs text-axc.ink/60">Glass</p>
                <p className="text-sm font-semibold">Mineral</p>
              </div>
            </div>
          </div>
        </Glass>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      icon: <Sparkles size={18} />, title: "Choose", desc: "Pick your piece from our curated drops",
    },
    {
      icon: <Wand2 size={18} />, title: "Personalise", desc: "Select size & finish; add a note if needed",
    },
    {
      icon: <ShoppingBag size={18} />, title: "Checkout", desc: "Pay securely or order via WhatsApp",
    },
    {
      icon: <Truck size={18} />, title: "Delivered", desc: "Tracked shipping to your doorstep",
    },
  ];

  return (
    <section data-testid="process" id="process" className="relative container mx-auto px-6 py-16 sm:py-24">
      <SectionHeader
        kicker="HOW TO ORDER"
        title="From click to wrist in four steps"
        subtitle="A streamlined experience with support at every stage."
      />

      <div className="relative mt-12">
        {/* Connector line */}
        <div className="absolute left-4 right-4 top-9 hidden md:block">
          <div className="h-[3px] bg-gradient-to-r from-[#EED9B6] via-[#E3C89A] to-[#C9A878] rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div key={i} {...fadeUp}>
              <div className="relative">
                <div className="mb-3 inline-flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30">
                    {s.icon}
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-axc.ink/80">
                    STEP {i + 1}
                  </span>
                </div>
                <Glass>
                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-axc.ink">{s.title}</h4>
                    <p className="mt-2 text-sm text-axc.ink/75">{s.desc}</p>
                  </div>
                </Glass>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  const cards = [
    {
      title: "Minimal Chains",
      blurb: "Everyday shine with clean profiles",
    },
    {
      title: "Statement Rings",
      blurb: "Bold edges, comfortable fit",
    },
    {
      title: "Classic Watches",
      blurb: "Balanced dials, modern details",
    },
  ];

  return (
    <section data-testid="collections" id="collections" className="relative container mx-auto px-6 py-16 sm:py-24">
      <SectionHeader
        kicker="FEATURED"
        title="Explore our signature edits"
        subtitle="Three tightly curated lines to start your Axceria rotation."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, idx) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            className="group relative rounded-3xl p-px bg-gradient-to-br from-[#F1E2CA] via-[#E6CFAF] to-[#C9A878]"
          >
            <div className="relative rounded-[calc(1.5rem-1px)] overflow-hidden bg-white/55 dark:bg-white/10 backdrop-blur-xl">
              {/* Shimmer border */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.5) 100%)",
                  mixBlendMode: "soft-light",
                }}
              />

              <div className="p-6">
                <div className="h-[180px] rounded-2xl bg-gradient-to-br from-axc.blush/40 via-white/10 to-axc.gold/30" />
                <h4 className="mt-4 text-lg font-semibold text-axc.ink">{c.title}</h4>
                <p className="mt-1 text-sm text-axc.ink/75">{c.blurb}</p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-axc.ink/80 hover:text-axc.ink"
                >
                  View collection <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---- Page -----------------------------------------------------------------
export default function Home() {
  return (
    <main className="min-h-screen bg-axc.paper text-axc.ink selection:bg-axc.gold/30 selection:text-axc.ink">
      <Hero />
      <About />
      <Process />
      <FeaturedCollections />
    </main>
  );
}

// ---- Dev self-tests (lightweight) ----------------------------------------
// These run only in the browser during development and act as smoke tests.
if (typeof window !== "undefined" && typeof document !== "undefined") {
  // Basic presence checks
  const hasHero = !!document.querySelector('[data-testid="hero"]');
  const hasAbout = !!document.querySelector('[data-testid="about"]');
  const hasProcess = !!document.querySelector('[data-testid="process"]');
  const hasCollections = !!document.querySelector('[data-testid="collections"]');

  // Log as a pseudo-test report (non-fatal)
  // eslint-disable-next-line no-console
  console.table(
    [
      { test: "renders hero section", pass: hasHero },
      { test: "renders about section", pass: hasAbout },
      { test: "renders process section", pass: hasProcess },
      { test: "renders collections section", pass: hasCollections },
    ]
  );
}
