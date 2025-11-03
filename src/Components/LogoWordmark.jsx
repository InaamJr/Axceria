import React from "react";
import clsx from "clsx";

/**
 * Axceria wordmark in cursive (MonteCarlo).
 * Props:
 *  - size: tailwind text size (e.g., "text-4xl")
 *  - className: extra classes
 */
export default function LogoWordmark({ size = "text-3xl", className }) {
  return (
    <span
      className={clsx(
        "font-logo tracking-wide select-none",
        "bg-gradient-to-r from-axc.gold via-axc.goldsoft to-axc.gold",
        "bg-[length:200%_100%] bg-clip-text text-transparent animate-shine",
        size,
        className
      )}
    >
      Axceria
    </span>
  );
}
