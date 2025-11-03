import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "../Data/products";
import { useBox } from "../Context/BoxContext";
import GiftBoxDrawer from "../Components/GiftBoxDrawer";
import { Plus, SlidersHorizontal, ShoppingBag } from "lucide-react";

export default function Products() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const byCat = active === "All" || p.category === active;
      const byText =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      return byCat && byText;
    });
  }, [active, query]);

  return (
    <>
      {/* Luxe slider (simple, minimal) */}
      <HeroSlider />

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-xl border text-sm whitespace-nowrap transition ${
                  active === c
                    ? "bg-black/80 text-white border-black/80"
                    : "bg-white/70 border-black/10 hover:bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="h-11 w-64 max-w-[72vw] rounded-xl border border-black/10 bg-white/70 px-4 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <SlidersHorizontal size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Drawer */}
      <GiftBoxDrawer />
    </>
  );
}

/* ---------- hero slider ---------- */

function HeroSlider() {
  const slides = [
    {
      title: "Build Your Gift Box",
      subtitle: "Curate chains, rings, bracelets, watches & luxe wraps.",
      img:
        "linear-gradient(135deg, rgba(242,214,193,0.25), rgba(250,247,242,0.9)), url('https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1600&auto=format&fit=crop')",
    },
    {
      title: "Necklace",
      subtitle: "Make it personal with a short note inside.",
      img:
        "linear-gradient(135deg, rgba(214,188,140,0.2), rgba(250,247,242,0.9)), url('https://images.unsplash.com/photo-1633934542430-0905ccb5f050?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2050')",
    },
    {
      title: "Minimal Watches",
      subtitle: "Make it personal with a short note inside.",
      img:
        "linear-gradient(135deg, rgba(214,188,140,0.2), rgba(250,247,242,0.9)), url('https://images.unsplash.com/photo-1609587312208-cea54be969e7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670')",
    },
    {
      title: "Pastel Wraps • Gold Ribbons",
      subtitle: "Make it personal with a short note inside.",
      img:
        "linear-gradient(135deg, rgba(214,188,140,0.2), rgba(250,247,242,0.9)), url('https://images.unsplash.com/photo-1637237725947-a0a8787eec2e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670')",
    },
  ];

  // simple crossfade
  const [idx, setIdx] = useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto px-3 sm:px-4 md:px-6 pt-6">
        <div className="relative h-[36vh] sm:h-[44vh] w-full rounded-3xl border border-black/10 overflow-hidden">
          {slides.map((s, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 pointer-events-none"
              initial={false}
              animate={{ opacity: idx === i ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundImage: s.img,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}

          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
            <h1
              className="font-logo text-5xl sm:text-6xl leading-none"
              style={{ letterSpacing: "0.01em" }}
            >
              {slides[idx].title}
            </h1>
            <p className="mt-2 max-w-xl text-zinc-700">{slides[idx].subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- product card ---------- */

function ProductCard({ product }) {
  const { addItem, setOpen } = useBox();
  const [variant, setVariant] = useState(product.variants?.[0] || null);
  const [qty, setQty] = useState(1);

  const displayPrice = variant?.price ?? product.price;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative flex flex-col rounded-3xl border border-zinc-200 bg-white/70 backdrop-blur-xl overflow-hidden shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-shadow"
    >
      {/* product image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.thumb}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

        {/* category tag */}
        <div className="absolute top-3 left-3 bg-white/80 text-[11px] uppercase tracking-wide px-3 py-1 rounded-full text-zinc-700 backdrop-blur-md">
          {product.category}
        </div>
      </div>

      {/* product details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-medium tracking-tight text-zinc-900">
            {product.title}
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            from <span className="text-[15px] font-semibold text-zinc-800">LKR {displayPrice.toLocaleString()}</span>
          </p>
        </div>

        {/* Variants */}
        {product.variants && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {product.variants.map((v) => {
              const active = variant?.value === v.value;
              return (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`min-h-10 px-3 py-1.5 rounded-xl text-[13px] font-medium leading-tight transition
                    whitespace-normal break-words line-clamp-2
                    ${active
                      ? "bg-zinc-900 text-white"
                      : "bg-white/70 border border-zinc-200 hover:bg-zinc-50"
                    }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Quantity + Add */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-zinc-200 bg-white/80">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-10 w-10 font-light text-lg hover:text-zinc-700"
            >
              −
            </button>
            <input
              className="h-10 w-12 text-center bg-transparent text-zinc-800 font-medium"
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))
              }
            />
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="h-10 w-10 font-light text-lg hover:text-zinc-700"
            >
              +
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              addItem(product, variant, qty);
              setOpen(true);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-to-r from-[#D6BC8C] via-[#EAD8A6] to-[#D6BC8C] text-zinc-900 font-medium text-[13px] tracking-wide shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] hover:brightness-105 transition-all"
          >
            <ShoppingBag size={15} />
            Add to Box
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

