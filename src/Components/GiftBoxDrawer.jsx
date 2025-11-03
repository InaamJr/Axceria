import React, { useMemo, useState } from "react";
import { X, Trash2, MessageSquare } from "lucide-react";
import { useBox } from "../Context/BoxContext";

const NAV_OFFSET_PX = 16; // keep clear of navbar

export default function GiftBoxDrawer() {
  let box = null;
  try { box = useBox(); } catch { box = null; }
  if (!box) return null;

  const {
    items = [],
    updateQty = () => {},
    removeItem = () => {},
    clearBox = () => {},
    note = "",
    setNote = () => {},
    subtotal = 0,
    open = false,
    setOpen = () => {},
    buildWhatsAppLink,
  } = box;

  if (!open) return null;

  const [customer, setCustomer] = useState({ name: "", phone: "" });

  const wa = useMemo(() => {
    try { return typeof buildWhatsAppLink === "function" ? buildWhatsAppLink(customer) : null; }
    catch { return null; }
  }, [customer, buildWhatsAppLink]);

  const disabled = !items.length || !wa;

  function handleClear() {
    clearBox();                      // clears items + note (context)
    setCustomer({ name: "", phone: "" }); // also clear local customer fields
  }

  return (
    <div className="fixed inset-0 z-[300] pointer-events-auto">
      {/* Scrim */}
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/20"
        style={{ backdropFilter: "blur(1px)" }}
      />

      {/* Floating panel */}
      <div
        className="absolute"
        style={{
          top: `min(${NAV_OFFSET_PX}px, 12vh)`,
          right: "1rem",
          bottom: "1rem",
          width: "min(420px, 92vw)",
        }}
      >
        {/* Make the panel a column so footer stays at the bottom */}
        <div className="h-full rounded-3xl border border-black/10 bg-white/80 supports-[backdrop-filter]:backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col">
          <header className="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <h3 className="text-lg font-medium">Your Gift Box</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-9 w-9 grid place-items-center rounded-xl bg-white/80 border border-black/10"
            >
              <X size={18} />
            </button>
          </header>

          {/* Scrollable content */}
          <div className="flex-1 overflow-auto px-4 py-3 space-y-4">
            {/* Items */}
            <div className="space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No items yet. Add products to build your box.
                </p>
              ) : (
                items.map((it) => (
                  <div key={it.key} className="flex gap-3 rounded-xl border border-black/10 bg-white/70 p-2">
                    <img src={it.thumb} alt={it.title} className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">{it.title}</p>
                          <p className="text-xs text-zinc-500">
                            {it.variant ? `${it.variant} · ` : ""}LKR {Number(it.price).toLocaleString()}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(it.key)}
                          className="h-8 w-8 grid place-items-center rounded-lg bg-white/80 border border-black/10"
                          aria-label={`Remove ${it.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <QtyButton onClick={() => updateQty(it.key, it.qty - 1)}>-</QtyButton>
                        <input
                          value={it.qty}
                          onChange={(e) => updateQty(it.key, Number(e.target.value) || 1)}
                          className="h-9 w-12 text-center rounded-lg border border-black/10 bg-white/80"
                        />
                        <QtyButton onClick={() => updateQty(it.key, it.qty + 1)}>+</QtyButton>
                        <div className="ml-auto text-sm text-zinc-700">
                          LKR {Number(it.price * it.qty).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Note */}
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-500">
                Gift Note / Preferences
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white/80 p-3 text-sm"
                placeholder="e.g., Pastel wrap with gold ribbon, include a small card"
              />
            </div>

            {/* Customer */}
            <div className="grid grid-cols-2 gap-3">
              <input
                className="rounded-xl border border-black/10 bg-white/80 p-3 text-sm"
                placeholder="Your name"
                value={customer.name}
                onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
              />
              <input
                className="rounded-xl border border-black/10 bg-white/80 p-3 text-sm"
                placeholder="Phone (for seller)"
                value={customer.phone}
                onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
              />
            </div>
          </div>

          {/* Footer fixed at bottom */}
          <div className="border-t border-black/10 px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Subtotal</span>
              <strong>LKR {Number(subtotal).toLocaleString()}</strong>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                disabled={items.length === 0 && !note && !customer.name && !customer.phone}
                className="h-11 flex-1 rounded-xl border border-black/10 bg-white/70 hover:bg-white text-sm disabled:opacity-50"
                title="Clear all items and fields"
              >
                Clear
              </button>

              <a
                href={wa || "#"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => (!wa || !items.length) && e.preventDefault()}
                className={`h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-xl text-sm transition ${
                  !wa || !items.length
                    ? "bg-emerald-500/40 text-white/80 cursor-not-allowed"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
              >
                <MessageSquare size={16} />
                Send to WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QtyButton({ children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className="h-9 w-9 rounded-lg border border-black/10 bg-white/80 hover:bg-white"
    >
      {children}
    </button>
  );
}
