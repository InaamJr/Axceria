/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        axc: {
          paper:  "#FAF7F2",   // soft ivory
          ink:    "#1F2937",   // luxe slate text
          veil:   "#8F9BA6",   // muted slate
          gold:   "#D6BC8C",   // soft gold
          blush:  "#F2D6C1",   // warm pastel
          haze:   "#EAE5DD",   // subtle borders
        },
      },
      fontFamily: {
        logo: ["MonteCarlo", "cursive"],
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        pulseDot: {
          "0%,100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.15)", opacity: "1" },
        },
      },
      animation: { pulseDot: "pulseDot 1.1s ease-in-out infinite" },
    }
  },
  plugins: [],
};
