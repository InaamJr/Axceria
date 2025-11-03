import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostBySlug, posts } from "../Data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!post) {
    return (
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
            <h1 className="text-3xl font-semibold">Post not found</h1>
            <p className="mt-2 text-zinc-600">The article you’re looking for doesn’t exist.</p>
            <button
            onClick={() => navigate("/blog")}
            className="mt-6 inline-flex rounded-xl bg-zinc-900 text-white px-4 py-2 hover:bg-black"
            >
            Back to Journal
            </button>
        </div>
    );
  }

  return (
    <article className="min-h-screen text-zinc-900">
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[480px] overflow-hidden -mt-[92px]">
            <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(250,248,245,0.2), rgba(0,0,0,0.35)), url('${post.hero}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF8F5]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FAF8F5]/95" />
            <div className="relative z-10 h-full mx-auto max-w-5xl px-6 flex items-end pb-10">
                <div>
                    <div className="inline-block bg-white/80 backdrop-blur-md rounded-full px-3 py-1 text-[11px] uppercase tracking-wider text-zinc-700 border border-white/60">
                    {post.category}
                    </div>
                    <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
                    {post.title}
                    </h1>
                    <p className="mt-2 text-sm text-zinc-600">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                    </p>
                </div>
            </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
            <Prose>
            {post.content.map((block, i) => {
                if (block.type === "h2") {
                return <h2 key={i}>{block.text}</h2>;
                }
                if (block.type === "p") {
                return <p key={i}>{block.text}</p>;
                }
                if (block.type === "blockquote") {
                return <blockquote key={i}>{block.text}</blockquote>;
                }
                if (block.type === "ul") {
                return (
                    <ul key={i}>
                    {block.items.map((li, idx) => <li key={idx}>{li}</li>)}
                    </ul>
                );
                }
                if (block.type === "ol") {
                return (
                    <ol key={i}>
                    {block.items.map((li, idx) => <li key={idx}>{li}</li>)}
                    </ol>
                );
                }
                return null;
            })}
            </Prose>

            {/* Back / More */}
            <div className="mt-32 flex items-center justify-between">
                <Link to="/blog" className="text-sm text-zinc-600 hover:text-zinc-800">
                    ← Back to Journal
                </Link>
                <Link
                    to={`/blog/${getNextSlug(posts, post.slug)}`}
                    className="text-sm text-[#A88450] hover:text-[#916E38]"
                >
                    Next Post →
                </Link>
            </div>
      </section>
    </article>
  );
}

/* ---------- helpers ---------- */

function getNextSlug(all, current) {
  const i = all.findIndex((p) => p.slug === current);
  if (i < 0) return all[0]?.slug || "blog";
  const next = (i + 1) % all.length;
  return all[next].slug;
}

/* ---------- minimal prose styles (luxury, light) ---------- */
function Prose({ children }) {
  return (
    <div className="prose max-w-none">
        <style>{`
            .prose h2 { font-size: 1.4rem; margin-top: 2.2rem; margin-bottom: 0.8rem; }
            .prose p { color: #3f3f46; line-height: 1.8; margin: 0.9rem 0; }
            .prose blockquote {
            margin: 1.2rem 0; padding: 0.9rem 1rem;
            background: rgba(214,188,140,0.12);
            border-left: 3px solid #D6BC8C; color: #1f2937; border-radius: 0.5rem;
            }
            .prose ul, .prose ol { margin: 0.9rem 0 0.9rem 1.2rem; color: #3f3f46; }
            .prose li { margin: 0.25rem 0; }
            .prose a { color: #A88450; text-decoration: underline; text-underline-offset: 3px; }
        `}</style>
        {children}
    </div>
  );
}
