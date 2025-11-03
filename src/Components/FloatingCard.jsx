import { motion } from "framer-motion";

export default function FloatingCard({
  className = "",
  title,
  caption,
  imageSrc,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className={[
        // base: absolute floating card, mobile-friendly size
        "absolute rounded-3xl border border-black/10 bg-white/80 backdrop-blur-xl",
        "shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden",
        "w-[200px] sm:w-[220px] md:w-[260px]",
        className,
      ].join(" ")}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h4 className="text-[15px] md:text-base font-semibold">{title}</h4>
        <p className="mt-1 text-[12px] md:text-sm text-zinc-600">{caption}</p>
      </div>
    </motion.div>
  );
}
