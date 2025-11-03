import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import { useBox } from "../Context/BoxContext";
import LiveMap from "../Components/LiveMap";


export default function Contact() {
  const { owner } = useBox?.() || { owner: "" };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General enquiry",
    message: "",
    via: "whatsapp", // 'whatsapp' | 'email'
  });

  const [touched, setTouched] = useState({});
  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const onBlur = (k) => setTouched((t) => ({ ...t, [k]: true }));

  const hasOwner = owner && owner.replace(/\D/g, "").length >= 10;

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!form.message.trim()) e.message = "A short message helps us assist you.";
    if (!form.email.trim() && !form.phone.trim())
      e.contact = "Provide an email or a phone number.";
    return e;
  }, [form]);

  function buildWhatsAppURL() {
    if (!hasOwner) return null;
    const lines = [];
    lines.push("Hi Axceria! I’d like to get in touch ✨");
    lines.push("");
    lines.push(`Name: ${form.name || "—"}`);
    if (form.email) lines.push(`Email: ${form.email}`);
    if (form.phone) lines.push(`Phone: ${form.phone}`);
    if (form.subject) lines.push(`Subject: ${form.subject}`);
    lines.push("");
    lines.push("Message:");
    lines.push(form.message || "—");
    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${owner}?text=${text}`;
  }

  function buildMailtoURL() {
    const subject = encodeURIComponent(
      `[Axceria] ${form.subject || "Enquiry"} — ${form.name || "Customer"}`
    );
    const body = encodeURIComponent(
      `Hi Axceria,\n\n${form.message}\n\n—\nName: ${form.name}\nEmail: ${form.email || "—"}\nPhone: ${form.phone || "—"}`
    );
    // Replace with your real mailbox
    return `inaamjr29@gmail.com?subject=${subject}&body=${body}`;
  }

  const waURL = buildWhatsAppURL();
  const emailURL = buildMailtoURL();

  const canSubmit =
    Object.keys(errors).length === 0 &&
    ((form.via === "whatsapp" && hasOwner) || form.via === "email");

  function handleSubmit(e) {
    e.preventDefault();
    // mark all as touched so errors show if any
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });
    if (!canSubmit) return;

    const url = form.via === "whatsapp" ? waURL : emailURL;
    if (url) {
      window.open(url, "_blank");
      // optional: clear after launch
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "General enquiry",
        message: "",
        via: form.via,
      });
      setTouched({});
    }
  }

  return (
    <div className="min-h-screen text-zinc-900">
      {/* --- Hero --- */}
      <section className="relative overflow-hidden -mt-[92px] h-[85vh] md:h-[70vh]">
        {/* Background: Deeper, Warmer Gold/Cream Gradient */}
        <div className="hidden lg:flex absolute inset-0 bg-gradient-to-b from-[#FFFDFB] via-[#F8F5EE] to-[#EAE0CD] opacity-90" />
        
        {/* Optional: Subtle Texture Overlay for Depth */}
        <div className="absolute inset-0 z-0 opacity-10" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C9288' fill-opacity='0.15' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")` }} 
        />

        <div className="relative z-10 mx-auto lg:mt-24 mt-72 max-w-6xl px-8 lg:py-52 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-7xl font-[MonteCarlo] tracking-widest text-[#3A332C]" 
          >
            <span className="inline-block relative">
              Let’s Talk
              {/* Subtle Gold Underline/Swoop for Luxury */}
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#C3A575] to-transparent"></span>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="mt-6 text-lg text-zinc-700 max-w-xl mx-auto font-light leading-relaxed" 
          >
            Questions, custom requests, or potential collaborations — we're here to listen and ready to help bring your vision to life.
          </motion.p>
        </div>
      </section>

      {/* --- Two-column content --- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24 grid lg:grid-cols-2 gap-8">
        {/* Info Card */}
        <div className="rounded-3xl border border-zinc-200 bg-white/70 backdrop-blur-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold">Axceria Studio</h2>
          <p className="text-sm text-zinc-600 mt-1">Sri Lanka · DM for pickup</p>

          <div className="mt-6 space-y-4 text-[15px]">
            <div className="flex items-start gap-3">
              <MessageSquare size={18} className="text-emerald-600 mt-0.5" />
              <div>
                <div className="text-zinc-700">WhatsApp</div>
                <a
                  href={hasOwner ? `https://wa.me/${owner}` : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 mt-1 rounded-xl px-3 py-2 text-sm ${
                    hasOwner
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-emerald-500/40 text-white/80 cursor-not-allowed"
                  }`}
                  onClick={(e) => !hasOwner && e.preventDefault()}
                >
                  Start a chat <ArrowRight size={14} />
                </a>
                {!hasOwner && (
                  <p className="text-xs text-red-600 mt-1">
                    Owner phone not configured. Set it in <code>BoxContext.jsx</code>.
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-zinc-700 mt-0.5" />
              <div>
                <div className="text-zinc-700">Email</div>
                <a href="mailto:hello@axceria.store" className="text-[#A88450] hover:text-[#8C6E35]">
                  axaria@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-zinc-700 mt-0.5" />
              <div>
                <div className="text-zinc-700">Phone</div>
                <span className="text-zinc-600">+94 77 142 5684</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-zinc-700 mt-0.5" />
              <div>
                <div className="text-zinc-700">Location</div>
                <span className="text-zinc-600">Colombo</span>
              </div>
            </div>
          </div>

          {/* Map preview (static aesthetic block) */}
          <div className="mt-20 rounded-2xl overflow-hidden border border-zinc-200">
            <LiveMap query="Colombo" />
          </div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-zinc-200 bg-white/70 backdrop-blur-xl shadow-sm p-6 md:p-8"
        >
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <p className="text-sm text-zinc-600 mt-1">
            We typically reply within a few hours.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Your name"
              id="name"
              value={form.name}
              onChange={(v) => onChange("name", v)}
              onBlur={() => onBlur("name")}
              error={touched.name && errors.name}
              required
            />
            <Field
              label="Email"
              id="email"
              type="email"
              value={form.email}
              onChange={(v) => onChange("email", v)}
              onBlur={() => onBlur("email")}
              placeholder="you@example.com"
            />
            <Field
              label="Phone"
              id="phone"
              value={form.phone}
              onChange={(v) => onChange("phone", v)}
              onBlur={() => onBlur("phone")}
              placeholder="+94 …"
            />
            <Field
              label="Subject"
              id="subject"
              value={form.subject}
              onChange={(v) => onChange("subject", v)}
            />
            <div className="md:col-span-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
                onBlur={() => onBlur("message")}
                rows={6}
                className={`mt-2 w-full rounded-2xl border bg-white/80 p-3 text-sm outline-none ${
                  touched.message && errors.message
                    ? "border-red-300 focus:border-red-400"
                    : "border-zinc-200 focus:border-zinc-300"
                }`}
                placeholder="Tell us a bit about what you need…"
                required
              />
              {touched.message && errors.message && (
                <p className="text-xs text-red-600 mt-1">{errors.message}</p>
              )}
            </div>
          </div>

          {/* Routing choice */}
          <div className="mt-4 flex gap-3">
            <Choice
              label="WhatsApp"
              value="whatsapp"
              active={form.via === "whatsapp"}
              onClick={() => onChange("via", "whatsapp")}
            />
            <Choice
              label="Email"
              value="email"
              active={form.via === "email"}
              onClick={() => onChange("via", "email")}
            />
          </div>
          {errors.contact && (
            <p className="text-xs text-red-600 mt-2">
              {errors.contact}
            </p>
          )}
          {form.via === "whatsapp" && !hasOwner && (
            <p className="text-xs text-red-600 mt-2">
              WhatsApp is unavailable until the owner number is configured.
            </p>
          )}

          {/* Submit */}
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`h-11 flex-1 rounded-2xl text-sm font-medium transition inline-flex items-center justify-center gap-2 ${
                canSubmit
                  ? "bg-gradient-to-r from-[#D6BC8C] via-[#EAD8A6] to-[#D6BC8C] text-zinc-900 hover:brightness-105"
                  : "bg-zinc-300 text-zinc-600 cursor-not-allowed"
              }`}
              aria-label={`Send via ${form.via}`}
              title={`Send via ${form.via}`}
            >
              {form.via === "whatsapp" ? (
                <>
                  <MessageSquare size={16} />
                  Send via WhatsApp
                </>
              ) : (
                <>
                  <Mail size={16} />
                  Send via Email
                </>
              )}
            </button>

            {/* Quick clear */}
            <button
              type="button"
              onClick={() => {
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  subject: "General enquiry",
                  message: "",
                  via: form.via,
                });
                setTouched({});
              }}
              className="h-11 px-4 rounded-2xl border border-zinc-200 bg-white/70 hover:bg-white text-sm"
            >
              Clear
            </button>
          </div>

          {/* Direct links (optional helpers) */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span>Or use:</span>
            <a
              href={waURL || "#"}
              onClick={(e) => (!waURL ? e.preventDefault() : null)}
              className={`underline underline-offset-4 ${
                waURL ? "text-[#1f7a52]" : "text-zinc-400 cursor-not-allowed"
              }`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp link
            </a>
            <a href={emailURL} className="underline underline-offset-4">
              Email link
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}

/* ---------- small atoms ---------- */

function Label(props) {
  return (
    <label
      {...props}
      className="text-xs uppercase tracking-[0.16em] text-zinc-500"
    />
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required,
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-2xl border bg-white/80 px-3 h-11 text-sm outline-none ${
          error ? "border-red-300 focus:border-red-400" : "border-zinc-200 focus:border-zinc-300"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function Choice({ label, value, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 px-4 rounded-xl text-sm border transition ${
        active
          ? "bg-zinc-900 text-white border-zinc-900"
          : "bg-white/70 text-zinc-700 border-zinc-200 hover:bg-white"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
