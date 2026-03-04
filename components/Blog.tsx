"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BLOG_POSTS,
  FEATURED_ARTICLE,
  type BlogPost,
} from "@/app/data/blog-data";
import { ArrowBigDown, ArrowDown, ArrowUp } from "lucide-react";
import { useEffect } from "react";
import { BedDouble, ImageIcon, Sparkles, CalendarCheck } from "lucide-react";



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
    <main id="top" className="container-fluid bg-gray-50 font-sans pt-16 md:pt-20">
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

          <button
            onClick={() => setOpenPost(FEATURED_ARTICLE)}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            Full Overview →
          </button>

        </div>
      </section>

      {/* Blog Grid */}
      <section className="pt-6 lg:pt-10 pb-10 lg:pb-16">
        <p className="flex justify-center items-center gap-2 font-medium text-gray-600 text-lg lg:text-xl mb-6">Why Stay With US <ArrowDown/></p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
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
                  Read More →
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


      <section className="max-w-6xl mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-950 mb-10">
          Quick Links
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* Rooms */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div>
              <BedDouble className="text-green-700 mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-2">Rooms</h3>
              <p className="text-gray-600 text-sm">
                Explore our luxurious 7-BHK rooms.
              </p>
            </div>

            <Link
              href="/rooms"
              className="mt-6 text-green-700 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Visit →
            </Link>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div>
              <Sparkles className="text-green-700 mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-2">Amenities</h3>
              <p className="text-gray-600 text-sm">
                Private pool, garden & luxury services.
              </p>
            </div>

            <Link
              href="/amenities"
              className="mt-6 text-green-700 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Visit →
            </Link>
          </div>

          {/* Images & Videos */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div>
              <ImageIcon className="text-green-700 mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-2">Images & Videos</h3>
              <p className="text-gray-600 text-sm">
                Take a virtual tour of the villa.
              </p>
            </div>

            <Link
              href="/gallery"
              className="mt-6 text-green-700 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Visit →
            </Link>
          </div>

          {/* Book Now */}
          <div className="bg-green-700 text-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:bg-green-800 transition-all duration-300 hover:-translate-y-1">
            <div>
              <CalendarCheck className="mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-2">Book Now</h3>
              <p className="text-sm opacity-90">
                Reserve your stay instantly.
              </p>
            </div>

            <Link
              href="/booking"
              className="mt-6 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Visit →
            </Link>
          </div>

        </div>
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
        Top <ArrowUp size={18} />
      </button>
    </main>
  );
}
