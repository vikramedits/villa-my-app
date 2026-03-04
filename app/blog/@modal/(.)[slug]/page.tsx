"use client";

import { BLOG_POSTS } from "@/app/data/blog-data";
import { useRouter } from "next/navigation";
import { use } from "react";

type Props = {
  params: Promise<{ slug: string }>; // Next 15 param type
};

export default function BlogModal({ params }: Props) {
  const router = useRouter();

  // ✅ use() unwraps the promise
  const { slug } = use(params);

  // ✅ find post from local BLOG_POSTS
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return null;

  return (
    <div
  className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  onClick={() => router.back()}
>
  <div
    className="relative bg-white/90 backdrop-blur-lg max-w-3xl w-full rounded-2xl shadow-2xl p-8 md:p-12 animate-fadeIn"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Close Button */}
    <button
      className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-900 font-bold transition"
      onClick={() => router.back()}
    >
      ✕
    </button>

    {/* Title */}
    <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-6 leading-tight">
      {post.title}
    </h2>

    {/* Divider */}
    <div className="w-16 h-1 bg-green-700 mb-8 rounded-full"></div>

    {/* Content */}
    <ul className="space-y-4">
      {post.content.map((point, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-gray-700 leading-relaxed"
        >
          <span className="mt-2 w-2 h-2 bg-green-700 rounded-full"></span>
          <span>{point}</span>
        </li>
      ))}
    </ul>

    {/* Bottom CTA */}
    <div className="mt-10 flex justify-end">
      <button
        onClick={() => router.push("/booking")}
        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
      >
        Book This Stay →
      </button>
    </div>
  </div>
</div>
  );
}