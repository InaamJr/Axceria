import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const BoxContext = createContext(null);
export const useBox = () => useContext(BoxContext);

// Replace with your real WhatsApp owner number (E.164, no '+')
const OWNER_E164 = "+94771425684";

const STORAGE_KEY = "axc:giftbox:v1";

export function BoxProvider({ children }) {
  const [items, setItems] = useState([]);
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const [owner, setOwner] = useState(OWNER_E164);

  // restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { items: i = [], note: n = "" } = JSON.parse(raw);
        setItems(i);
        setNote(n);
      }
    } catch {}
  }, []);
  // persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, note }));
  }, [items, note]);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );

  function addItem(product, variant = null, qty = 1) {
    setItems((prev) => {
      const id = product.id + (variant ? `:${variant.value}` : "");
      const idx = prev.findIndex((p) => p.key === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + qty) };
        return next;
      }
      return [
        ...prev,
        {
          key: id,
          id: product.id,
          title: product.title,
          variant: variant?.label || null,
          price: variant?.price ?? product.price,
          qty,
          thumb: product.thumb,
          category: product.category,
        },
      ];
    });
    setOpen(true);
  }

  function updateQty(key, qty) {
    setItems((prev) =>
      prev
        .map((p) => (p.key === key ? { ...p, qty: Math.max(1, Math.min(99, qty)) } : p))
        .filter((p) => p.qty > 0)
    );
  }

  function removeItem(key) {
    setItems((prev) => prev.filter((p) => p.key !== key));
  }

  function clearBox() {
    setItems([]);
    setNote("");
  }

  function buildWhatsAppLink(customer = {}) {
    if (!owner || owner.replace(/\D/g, "").length < 10) return null;
    const lines = [];
    lines.push("Hi Axceria! I'd like to place a custom gift box 🎁");
    if (customer.name || customer.phone) {
      lines.push("");
      lines.push(
        `Customer: ${customer.name || "—"}${customer.phone ? ` (${customer.phone})` : ""}`
      );
    }
    if (note?.trim()) {
      lines.push(`Notes: ${note.trim()}`);
    }
    if (items.length) {
      lines.push("");
      lines.push("Items:");
      for (const it of items) {
        const variantStr = it.variant ? ` (${it.variant})` : "";
        lines.push(
          `• ${it.title}${variantStr} × ${it.qty} — LKR ${Number(it.price * it.qty).toLocaleString()}`
        );
      }
    }
    lines.push("");
    lines.push(`Subtotal: LKR ${subtotal.toLocaleString()}`);

    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${owner}?text=${text}`;
  }

  const value = {
    items,
    addItem,
    updateQty,
    removeItem,
    clearBox,
    note,
    setNote,
    subtotal,
    open,
    setOpen,
    owner,
    setOwner,
    buildWhatsAppLink,
  };

  return <BoxContext.Provider value={value}>{children}</BoxContext.Provider>;
}
