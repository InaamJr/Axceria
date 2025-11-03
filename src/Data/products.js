// Minimal seed data. Replace images and expand as needed.
export const CATEGORIES = ["All", "Chains", "Rings", "Bracelets", "Watches", "Gifts"];

export const PRODUCTS = [
  {
    id: "chain-figaro-50",
    title: "Figaro Chain",
    price: 14990,
    category: "Chains",
    thumb: "https://images.unsplash.com/photo-1613498510372-8901cad084a2?q=80&w=1337&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    variants: [
      { label: "45 cm", value: "45", price: 13990 },
      { label: "50 cm", value: "50", price: 14990 },
      { label: "55 cm", value: "55", price: 15990 },
    ],
  },
  {
    id: "ring-signet-min",
    title: "Minimal Signet Ring",
    price: 8990,
    category: "Rings",
    thumb: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=800&auto=format&fit=crop",
    variants: [
      { label: "Size 7", value: "7", price: 8990 },
      { label: "Size 8", value: "8", price: 8990 },
      { label: "Size 9", value: "9", price: 8990 },
    ],
  },
  {
    id: "bracelet-rope",
    title: "Rope Bracelet",
    price: 6450,
    category: "Bracelets",
    thumb: "https://images.unsplash.com/photo-1742402512005-d34fcefe939d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    variants: [
      { label: "Small", value: "S", price: 6450 },
      { label: "Medium", value: "M", price: 6450 },
      { label: "Large", value: "L", price: 6450 },
    ],
  },
  {
    id: "watch-minimal",
    title: "Minimal Watch",
    price: 23990,
    category: "Watches",
    thumb: "https://images.unsplash.com/photo-1595923533867-ff8a01335ff9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "gift-wrap",
    title: "Premium Gift Wrap",
    price: 990,
    category: "Gifts",
    thumb: "https://images.unsplash.com/photo-1575075835950-99efb232e2eb?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    variants: [
      { label: "Pastel + Gold", value: "pastel-gold", price: 990 },
      { label: "Ivory + Champagne ", value: "ivory-champ", price: 1250 },
    ],
  },
];
