"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BLOG_POSTS,
  FEATURED_ARTICLE,
  type BlogPost,
} from "@/app/data/blog-data";
import { ArrowUp } from "lucide-react";
import { useEffect } from "react";



export default function BlogPage() {
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);

  useEffect(() => {
  const savedPosition = sessionStorage.getItem("blogScrollPosition");

  if (savedPosition) {
    window.scrollTo({
      top: parseInt(savedPosition),
      behavior: "auto",
    });

    sessionStorage.removeItem("blogScrollPosition");
  }
}, []);

  return (
    <main id="top" className="bg-gray-50 font-sans pt-16 md:pt-20">
      {/* Featured Article */}
      <section className="relative w-full h-[70vh] md:h-[85vh]">
        <Image
          src={FEATURED_ARTICLE.image}
          alt={FEATURED_ARTICLE.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-[#F8F5F0]/40 flex flex-col justify-center p-6 md:p-16">
          <h1 className="text-3xl md:text-5xl font-bold text-green-950 mb-4">
            {FEATURED_ARTICLE.title}
          </h1>

          <p className="text-gray-700 text-base md:text-xl mb-6 max-w-2xl">
            {FEATURED_ARTICLE.snippet}
          </p>

          <button
            onClick={() => setOpenPost(FEATURED_ARTICLE)}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-md transition w-full md:w-1/2"
          >
            Full Overview →
          </button>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.title}
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
  onClick={() => {
    sessionStorage.setItem("blogScrollPosition", window.scrollY.toString());
  }}
  className="mt-auto text-green-700 font-medium hover:underline"
>
  Discover More →
</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {openPost && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setOpenPost(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full p-6 md:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              onClick={() => setOpenPost(null)}
            >
              &times;
            </button>

            <div className="relative h-64 w-full mb-6">
              <Image
                src={openPost.image}
                alt={openPost.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">{openPost.title}</h2>

            {openPost.content.map((para, i) => (
              <p key={i} className="text-gray-700 mt-2">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar + Quick Booking */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 mb-16">
        <aside className="md:w-1/3 flex flex-col gap-6 md:sticky md:top-24">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-bold text-xl mb-4">Quick Booking</h3>
            <p className="text-gray-700 mb-4">Starting From ₹25,000/night</p>

            <button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md mb-3 transition">
              Book Now
            </button>

            <button className="w-full border border-green-700 text-green-700 hover:bg-green-50 font-semibold py-3 rounded-md transition">
              WhatsApp / Call
            </button>

            <div className="relative h-40 w-full mt-4">
              <Image
                src="/villa/quick-booking-thumb.jpg"
                alt="Villa"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-bold text-xl mb-4">Popular Posts</h3>

            <ul className="flex flex-col gap-3">
              {[FEATURED_ARTICLE, ...BLOG_POSTS].map((post) => (
                <li key={post.title}>
                  <button
                    onClick={() => setOpenPost(post)}
                    className="text-gray-700 hover:text-green-700 transition text-left"
                  >
                    {post.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="md:w-2/3"></div>
      </section>

      {/* Scroll To Top */}
      <button
        onClick={() => {
          const topElement = document.getElementById("top");
          if (topElement) {
            topElement.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="flex gap-2 items-center fixed bottom-6 left-8 z-50 bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded-full shadow-lg transition hover:-translate-y-1"
      >
        Top <ArrowUp size={18}/>
      </button>
    </main>
  );
}
