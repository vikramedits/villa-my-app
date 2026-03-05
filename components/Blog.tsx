"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BLOG_POSTS, FEATURED_ARTICLE } from "@/app/data/blog-data";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

export default function BlogPage() {
  // Restore scroll
  useEffect(() => {
    // Check if we came back from a slug page
    const slug = sessionStorage.getItem("blogScrollSlug");
    if (slug) {
      const el = document.getElementById(`post-${slug}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      sessionStorage.removeItem("blogScrollSlug");
    } else {
      // If no slug, restore general scroll position
      const savedPos = sessionStorage.getItem("blogScrollPosition");
      if (savedPos) {
        window.scrollTo({ top: parseInt(savedPos), behavior: "auto" });
        sessionStorage.removeItem("blogScrollPosition");
      }
    }
  }, []);

  const saveScrollPosition = () =>
    sessionStorage.setItem("blogScrollPosition", window.scrollY.toString());

  return (
    <main
      id="top"
      className="container-fluid bg-gray-50 font-sans py-16 md:pt-20"
    >
      {/* Featured Article */}
      <section className="w-full bg-[#F8F5F0] py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-14">
          <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
            Featured Article
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-green-950 mt-3 mb-6 leading-tight">
            {FEATURED_ARTICLE.title}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-3xl leading-relaxed">
            {FEATURED_ARTICLE.snippet}
          </p>
          <Link
            href={`/blog/${FEATURED_ARTICLE.slug}`}
            onClick={saveScrollPosition}
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Full Overview →
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pt-6 lg:pt-10 pb-10 lg:pb-16">
        <p className="flex justify-center items-center gap-2 font-medium text-gray-600 text-lg lg:text-xl my-6">
          Why Stay With Us <ArrowDown />
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.slug}
              id={`post-${post.slug}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 text-sm">{post.snippet}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  onClick={
                    () => sessionStorage.setItem("blogScrollSlug", post.slug) // ✅ save slug
                  }
                  className="mt-auto text-green-700 font-medium hover:underline flex items-center gap-2"
                >
                  Read More <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scroll To Top */}
      <button
        onClick={() =>
          document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
        }
        className="flex gap-2 items-center fixed bottom-6 left-8 z-50 bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded-full shadow-lg transition hover:-translate-y-1"
      >
        Top <ArrowUp size={18} />
      </button>
    </main>
  );
}
