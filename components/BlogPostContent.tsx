"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPost } from "@/app/data/blog-data";

type Props = { post: BlogPost };

export default function BlogPostContent({ post }: Props) {
  const router = useRouter();

  const goBack = () => router.back(); // scroll restore handled in blog.tsx

  return (
    <div className="mx-4 lg:max-w-4xl p-8 my-10 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-green-900 pb-3 border-b-4 border-black">
          {post.title}
        </h1>
      </div>

      <div className="space-y-6">
        {post.content.map((para, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="mt-2">
              <ArrowRight size={18} />
            </span>
            <p className="text-gray-700 text-lg leading-relaxed">{para}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button
          onClick={goBack}
          className="bg-green-700 hover:bg-green-800 flex items-center gap-2 text-sm lg:text-lg text-white font-semibold px-4 py-3 rounded-lg"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>
    </div>
  );
}