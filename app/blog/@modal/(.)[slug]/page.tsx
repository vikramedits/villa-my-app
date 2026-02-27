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
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={() => router.back()}
    >
      <div
        className="bg-white max-w-2xl w-full p-8 rounded-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => router.back()}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>

        <ul className="list-disc pl-6 space-y-2">
          {post.content.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}