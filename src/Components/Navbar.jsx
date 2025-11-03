import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useBox } from "../Context/BoxContext";

/**
 * Axceria — Navbar (Light theme + Transparent Glass)
 * - Sticky, transparent **liquid-glass** bar (no gold gradient)
 * - Axceria monogram + MonteCarlo wordmark
 * - Responsive links + animated mobile drawer
 * - Subtle shadow once scrolled
 *
 * Tailwind tokens assumed: axc.paper, axc.ink, axc.gold, axc.blush, axc.veil
 * Be sure to load MonteCarlo (e.g., via Google Fonts) and add it to Tailwind or use inline style.
 */

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setOpen: setBoxOpen } = useBox();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div data-testid="navbar" className="sticky top-0 z-[200] px-3 sm:px-4 md:px-6 pt-[max(0px,env(safe-area-inset-top))]">
        {/* Transparent container with only a shadow on scroll */}
        <div
            className={
            "rounded-2xl transition-shadow mt-5" +
            (scrolled ? " shadow-[0_10px_40px_rgba(0,0,0,0.08)]" : "")
            }
        >
            <div
            className="rounded-2xl bg-slate-300 supports-[backdrop-filter]:backdrop-blur-2xl"
            >
                <nav className="h-[64px] md:h-[72px] px-3 sm:px-4 md:px-6 flex items-center justify-between">
                    {/* Left: Logo */}
                    <Link to="/" className="flex items-center gap-3">
                    <Monogram />
                    <Wordmark />
                    </Link>

                    {/* Center: links (desktop) */}
                    <ul className="hidden md:flex items-center gap-8 text-sm font-light">
                        {LINKS.map((l) => (
                            <li key={l.label}>
                                <NavLink
                                    data-testid={`nav-${l.label.toLowerCase()}`}
                                    to={l.href}
                                    className={({ isActive }) =>
                                        "transition" +
                                        (isActive ? "text-axc.ink font-semibold" : "text-axc.ink/80 hover:text-axc.ink")
                                    }
                                    style={{fontFamily: "'Poppins', sans-serif"}}
                                >
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Right: actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <IconButton aria-label="Search">
                            <Search size={18} />
                        </IconButton>
                        <IconButton aria-label="Cart" onClick={() => setBoxOpen(true)}>
                            <ShoppingBag size={18} />
                        </IconButton>
                    </div>

                    {/* Mobile burger */}
                    <button
                        aria-expanded={open}
                        aria-controls="axc-mobile-drawer"
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/50 border border-white/30 supports-[backdrop-filter]:backdrop-blur-xl text-axc.ink/80"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </nav>
            </div>
        </div>

        {/* Mobile drawer (transparent glass) */}
        <AnimatePresence>
            {open && (
                <motion.div
                    id="axc-mobile-drawer"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="fixed md:hidden z-[300] left-3 right-3 sm:left-4 sm:right-4"
                    style={{ top: 94 }} // ~64px nav + margins; tweak to 80–96 if needed
                >
                    {/* optional: click-outside to close; keep page scrollable */}
                    <div className="pointer-events-none">
                        <div className="pointer-events-auto rounded-2xl bg-zinc-400/80 border border-white/30 text-black font-thin supports-[backdrop-filter]:backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                            <ul className="p-3">
                                {LINKS.map((l) => (
                                    <li key={l.label}>
                                        <NavLink
                                            to={l.href}
                                            onClick={() => setOpen(false)}
                                            className={({ isActive }) =>
                                                "block rounded-xl px-4 py-3 " +
                                                (isActive
                                                ? "bg-zinc-100/40 text-axc.ink"
                                                : "text-axc.ink/80 hover:bg-white/60")
                                            }
                                        >
                                            {l.label}
                                        </NavLink>
                                    </li>
                                ))}
                                <li className="mt-1 grid grid-cols-2 gap-2">
                                    <button className="rounded-xl px-4 py-3 bg-zinc-100 text-black flex items-center justify-center gap-2">
                                        <Search size={16} /> Search
                                    </button>
                                    <button
                                        className="rounded-xl px-4 py-3 bg-zinc-100 text-black flex items-center justify-center gap-2"
                                        onClick={() => {
                                            setBoxOpen(true);
                                            setOpen(false); // close drawer
                                        }}
                                    >
                                        <ShoppingBag size={16} /> Cart
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}

function IconButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/40 dark:bg-white/10 border border-white/30 supports-[backdrop-filter]:backdrop-blur-xl text-axc.ink/80 hover:bg-white/55 transition"
    >
        {children}
    </button>
  );
}

function Monogram() {
  return (
    <div
      aria-hidden
      className="grid place-items-center h-9 w-9 rounded-xl border border-white/30 bg-white/60 supports-[backdrop-filter]:backdrop-blur-xl"
    >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-axc.ink">
            <path d="M12 4l6.5 16h-2.6l-1.5-3.9H9.6L8.1 20H5.5L12 4zm0 5.1L10.1 13h3.8L12 9.1z" fill="currentColor"/>
        </svg>
    </div>
  );
}

function Wordmark() {
  return (
    <div className="select-none leading-none">
        <span
            className="text-2xl md:text-[2.3rem] font-semibold"
            style={{
            fontFamily: "'MonteCarlo', cursive",
            background: "linear-gradient(90deg, #1f2937 0%, #7c5a2f 40%, #1f2937 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "0.01em",
            }}
        >
            Axceria
        </span>
    </div>
  );
}

// ---- Dev self-tests (smoke) ----------------------------------------------
if (typeof window !== "undefined" && typeof document !== "undefined") {
  const node = document.querySelector('[data-testid="navbar"]');
  // eslint-disable-next-line no-console
  console.table([
    { test: "navbar renders", pass: !!node },
  ]);
}
