import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { posts } from "../Data/posts";

export default function Blog() {
  return (
    <div className="min-h-screen text-zinc-900">
      {/* Hero */}
      <section className="relative overflow-hidden -mt-[92px] h-[70vh] md:h-[70vh]">
        {/* Background: Deeper, Warmer Gold/Cream Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFB] via-[#F8F5EE] to-[#EAE0CD] opacity-90" />
        
        {/* Optional: Subtle Texture Overlay for Depth */}
        <div className="absolute inset-0 z-0 opacity-10" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C9288' fill-opacity='0.15' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")` }} 
        />

        <div className="relative z-10 mx-auto mt-20 max-w-6xl px-8 pt-[12rem] pb-[8rem] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-6xl font-[MonteCarlo] tracking-widest text-[#3A332C]" 
          >
            <span className="inline-block relative">
              The Axceria Journal
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
            Stories of gifting, design, and the quiet art of timeless accessories.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="relative z-10 mt-16 mx-auto max-w-6xl px-6 py-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="group rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-zinc-200 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
          >
            <Link to={`/blog/${post.slug}`} className="relative overflow-hidden aspect-[4/3] block">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="absolute top-4 left-4 bg-white/80 text-[11px] uppercase tracking-wider px-3 py-1 rounded-full text-zinc-700 backdrop-blur-md">
                {post.category}
              </div>
            </Link>

            <div className="flex flex-col flex-1 p-6">
              <h2 className="text-lg font-semibold leading-tight group-hover:text-zinc-900 transition">
                {post.title}
              </h2>
              <p className="text-sm text-zinc-600 mt-3 flex-1 line-clamp-3">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-[13px] font-medium text-[#A88450] hover:text-[#916E38] transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
