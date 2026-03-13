"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPost } from "@/app/data/blog-data";

type Props = { post: BlogPost };

export default function BlogPostContent({ post }: Props) {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <div className="relative min-h-screen bg-black">
      {/* Subtle green top accent line */}
      <div className="w-full h-1 bg-linear-to-r from-transparent via-green-500 to-transparent" />

      <div className="container-fluid lg:max-w-4xl lg:mx-auto p-6 lg:p-12 my-4 lg:my-8 pb-32">

        {/* ============== Heading =============== */}
        <div className="mb-12 flex items-center gap-5 border-b border-green-700/50 pb-8">
          {/* Serial Number Badge */}
          <div className="relative shrink-0">
            <span className="w-16 h-16 lg:w-20 lg:h-20 bg-green-500 text-black text-2xl lg:text-3xl font-serif font-black flex items-center justify-center rounded-xl tracking-tight shadow-lg shadow-green-500/20">
              {`#${post.sn}`}
            </span>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <span className="text-green-500 text-xs font-semibold uppercase tracking-[0.2em]">
              Blog Post
            </span>
            <h1 className="text-xl lg:text-4xl font-extrabold text-white leading-tight tracking-wide">
              {post.title}
            </h1>
          </div>
        </div>

        {/* ============== Content =============== */}
        <div className="space-y-5 pb-6">
          {post.content.map((para, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 bg-white/10 hover:bg-white/10 border border-white/5 hover:border-green-700/40 rounded-xl px-5 py-4 transition-all duration-300"
            >
              {/* Arrow icon */}
              <span className="mt-1 shrink-0 text-green-500 group-hover:translate-x-0.5 transition-transform duration-200">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>

              {/* Paragraph */}
              <p className="text-gray-300 group-hover:text-gray-100 text-base lg:text-lg leading-relaxed transition-colors duration-200">
                {para}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative bottom rule */}
        <div className="mt-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-green-500 opacity-60" />
          <div className="flex-1 h-px bg-white/10" />
        </div>
      </div>

      {/* ====== Sticky Back Button Navbar ====== */}
      <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-green-700/30 shadow-2xl shadow-black p-5 flex justify-center items-center rounded-t-2xl">
        {/* Subtle glow line on top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-green-500/60" />

        <button
          onClick={goBack}
          className="group flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20 hover:shadow-green-400/30"
        >
          <ArrowLeft
            size={18}
            strokeWidth={2.5}
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          />
          <span className="text-base tracking-wide">Back</span>
        </button>
      </div>
    </div>
  );
}