import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowRight, Instagram, Facebook, Youtube } from "lucide-react";

/**
 * Axceria — Footer (Light, Modern-Luxe)
 * - Pastel glass card + soft borders
 * - WhatsApp order CTA (primary)
 * - Quick links (internal NavLink-safe)
 * - Contact block (email / phone / map text)
 * - Socials row
 *
 * Notes:
 * - Replace WHATSAPP_NUMBER with your store number (E.164, no plus signs/spaces in wa.me)
 * - Keep colors aligned with the light palette you set (paper / gold / blush / haze)
 */

const WHATSAPP_NUMBER = "94771425684"; 
const WA_TEXT = encodeURIComponent(
  "Hi Axceria! I'd love to build a custom gift pack. Can you help me pick items?"
);
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`;

export default function Footer() {
  return (
    <footer className="relative mt-24">
        {/* subtle pastel wash */}
        <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            // style={{
            //   background:
            //     "linear-gradient(135deg, rgba(242,214,193,0.18) 0%, rgba(250,247,242,0.6) 55%, rgba(214,188,140,0.14) 100%)",
            // }}
        />

        {/* content */}
        <div className="relative mx-1 max-w-full px-4 pb-6">
            {/* glass card */}
            <div className="rounded-3xl border border-[color:rgba(0,0,0,0.06)] bg-white/70 supports-[backdrop-filter]:backdrop-blur-2xl px-6 sm:px-8 py-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                <div className="grid gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Wordmark className="text-[2.2rem]" />
                        <p className="mt-3 text-sm leading-6 text-zinc-600 max-w-sm">
                            Curated accessories with a modern, youthful luxury vibe. Craft your
                            own gift pack and place the order via WhatsApp - simple.
                        </p>

                        {/* WhatsApp CTA */}
                        <a
                            href={WA_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-[color:rgba(214,188,140,0.45)] bg-[rgba(214,188,140,0.12)] px-4 py-2.5 text-[15px] font-medium text-zinc-800 hover:bg-[rgba(214,188,140,0.18)] transition"
                            aria-label="Order on WhatsApp"
                        >
                            <WhatsAppIcon />
                            Order on WhatsApp
                            <ArrowRight size={16} className="translate-x-0 group-hover:translate-x-0.5 transition" />
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <FooterHeading>Browse</FooterHeading>
                        <ul className="mt-3 space-y-2 text-[15px]">
                            <li><FooterLink to="/">Home</FooterLink></li>
                            <li><FooterLink to="/products">Products</FooterLink></li>
                            <li><FooterLink to="/blog">Blog</FooterLink></li>
                            <li><FooterLink to="/contact">Contact</FooterLink></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <FooterHeading>Help</FooterHeading>
                        <ul className="mt-3 space-y-2 text-[15px]">
                            <li className="text-zinc-700/90">Custom gift packs</li>
                            <li className="text-zinc-700/90">Care & sizing guide (soon)</li>
                            <li className="text-zinc-700/90">Shipping & pickup (DM)</li>
                            <li className="text-zinc-700/90">Returns (case by case)</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <FooterHeading>Contact</FooterHeading>
                        <ul className="mt-3 space-y-2 text-[15px] text-zinc-700/90">
                            <li className="flex items-start gap-2.5">
                                <Mail size={16} className="mt-1 opacity-70" />
                                <a href="mailto:hello@axceria.store" className="hover:underline">hello@axceria.store</a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Phone size={16} className="mt-1 opacity-70" />
                                <a href="tel:+94 77 142 5684" className="hover:underline">+94 77 142 5684</a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MapPin size={16} className="mt-1 opacity-70" />
                                <span>Sri Lanka · DM for pickup</span>
                            </li>
                        </ul>

                        {/* Socials */}
                        <div className="mt-4 flex items-center gap-3">
                            <SocialLink href="https://www.instagram.com/axceria/" label="Instagram">
                                <Instagram size={18} />
                            </SocialLink>
                            <SocialLink href="https://facebook.com/" label="Facebook">
                                <Facebook size={18} />
                            </SocialLink>
                            <SocialLink href="https://youtube.com/" label="YouTube">
                                <Youtube size={18} />
                            </SocialLink>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-[color:rgba(0,0,0,0.06)] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-zinc-500">
                    © {new Date().getFullYear()} Axceria. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5 text-xs text-zinc-500">
                        <Link to="/terms" className="hover:text-zinc-700">Terms</Link>
                        <Link to="/privacy" className="hover:text-zinc-700">Privacy</Link>
                        <span className="text-zinc-400">•</span>
                        <span className="text-zinc-500">Designed & built by Jr</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}

/* ---------- atoms ---------- */

function FooterHeading({ children }) {
  return (
    <h4 className="text-[13px] uppercase tracking-[0.16em] text-zinc-500">
        {children}
    </h4>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-zinc-700/90 hover:text-zinc-900 hover:underline underline-offset-4"
    >
        {children}
    </Link>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:rgba(0,0,0,0.08)] bg-white/70 hover:bg-white transition"
    >
        {children}
    </a>
  );
}

function Wordmark({ className = "" }) {
  return (
    <div className={`select-none leading-none ${className}`}>
        <span
            className="font-semibold"
            style={{
            fontFamily: "'MonteCarlo', cursive",
            background:
                "linear-gradient(90deg, #1f2937 0%, #7c5a2f 40%, #1f2937 100%)",
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

function WhatsAppIcon() {
  // simple WA glyph
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className="text-[#25D366]"
      fill="currentColor"
    >
        <path d="M12.04 2C6.57 2 2.17 6.4 2.17 11.86c0 2.09.6 4.04 1.72 5.74L2 22l4.56-1.82a9.84 9.84 0 0 0 5.48 1.6c5.48 0 9.86-4.4 9.86-9.86C21.9 6.4 17.52 2 12.04 2zm5.68 13.92c-.24.67-1.42 1.3-1.95 1.34-.5.04-1.12.19-3.83-1.27-3.22-1.77-5.27-4.9-5.43-5.13-.16-.23-1.3-1.73-1.3-3.3 0-1.57.83-2.35 1.12-2.67.29-.32.63-.41.84-.41.2 0 .42 0 .61.01.2.01.46-.08.72.55.24.58.82 2 .89 2.15.07.15.11.33.02.53-.08.2-.13.33-.27.51-.14.19-.29.43-.41.58-.14.16-.29.34-.12.64.16.29.71 1.17 1.52 1.89 1.05.94 1.94 1.24 2.24 1.38.3.14.48.12.66-.06.18-.17.76-.84.96-1.14.2-.29.41-.24.68-.14.27.1 1.71.8 2 .95.29.15.48.22.55.34.07.13.07.75-.17 1.42z"/>
    </svg>
  );
}
