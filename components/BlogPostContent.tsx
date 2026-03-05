"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPost } from "@/app/data/blog-data";

type Props = { post: BlogPost };

export default function BlogPostContent({ post }: Props) {
  const router = useRouter();

  const goBack = () => router.back(); // scroll restore handled in blog.tsx

  return (
    <div className="relative">
      <div className="container-fluid lg:max-w-4xl lg:mx-auto p-8 my-6 lg:my-10 pb-20">
        {/* ============== Heading =============== */}
        <div className="mb-12 flex items-center gap-4 border-b-2 border-black pb-6 px-2">
          <span className="w-1/5 bg-black text-white text-3xl lg:text-5xl font-serif font-bold px-4 h-16 flex items-center justify-center rounded-lg">
            {`#${post.sn}`}
          </span>

          <h1 className="w-4/5 text-xl lg:text-5xl font-extrabold text-black leading-tight tracking-wider">
            {post.title}
          </h1>
        </div>

        <div className="space-y-6 pb-5">
          {post.content.map((para, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="mt-2">
                <ArrowRight size={18} />
              </span>
              <p className="text-gray-700 text-lg leading-relaxed">{para}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Back Button Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-black shadow-xl p-6 flex justify-center items-center rounded-t-2xl border-t-4 border-gray-800">
        <button
          onClick={goBack}
          className="flex items-center gap-4 bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft size={20} />
          <span className="text-lg">Back</span>
        </button>
      </div>
    </div>
  );
}
