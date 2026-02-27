// File: app/blog/page.tsx
"use client";

import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { CalendarCheck, ImageIcon, BedDouble, Sparkles } from "lucide-react";
import { BLOG_POSTS, FEATURED_ARTICLE } from "@/app/data/blog-data";


const QUICK_LINKS = [
  {
    title: "Book Now",
    description: "Reserve your stay at The Pushpa Heritage Villa.",
    href: "/booking",
    icon: CalendarCheck,
  },
  {
    title: "Images & Videos",
    description: "Explore all villa photos & Videos.",
    href: "/gallery",
    icon: ImageIcon,
  },
  {
    title: "Rooms",
    description: "Discover our spacious master bedrooms.",
    href: "/rooms",
    icon: BedDouble,
  },
  {
    title: "Amenities",
    description: "View all luxury facilities available.",
    href: "/amenities",
    icon: Sparkles,
  },
];

export default function BlogPage() {
  return (
    <main id="top" className="bg-gray-50 min-h-screen font-sans">
      {/* ==================== Featured Article - Top ====================== */}
      <section className="relative w-full l h-96 md:h-110">
        <Image
          src={FEATURED_ARTICLE.image}
          alt={FEATURED_ARTICLE.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#F8F5F0] bg-opacity-30 flex flex-col justify-center   px-8 md:px-16">
          <h1 className="text-3xl md:text-5xl font-light text-green-950 mb-4">
            {FEATURED_ARTICLE.title}
          </h1>
          <p className="text-gray-500 text-lg md:text-xl mb-4">
            {FEATURED_ARTICLE.snippet}
          </p>
        <Link href={FEATURED_ARTICLE.slug} scroll={false}>
            <button className="...">
              Full Overview <ArrowRight />
            </button>
          </Link>
        </div>
      </section>

      {/* ============================ Blog Grid ============================== */}
      <section className="container-fluid mx-auto py-6  ">
        <h2 className="text-center text-2xl lg:text-3xl pb-3 lg:pb-6 text-gray-600 flex justify-center gap-1  items-center lg:pt-16">
          {" "}
          <span>Why Stay With Us</span> <ArrowDown size={28} />
        </h2>
        <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.title}
              className=" bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className=" object-cover rounded-t-xl"
                />

                {/* ========== Badge overlay =========== */}
                <p className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white text-green-900 font-medium px-2 py-1 rounded-t-full w-12 text-center ">
                  {post.sn}
                </p>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-medium mb-2">{post.title}</h2>

                <p className="text-gray-600 mb-4 text-sm">{post.snippet}</p>

                <Link href={post.slug} scroll={false}>
                  <button className="...">More Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =============================== Modal =============================== */}

      {/* ==================== Ouick Links ========================== */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 my-10 lg:my-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Quick Links</h2>
          <div className="w-16 h-1 bg-green-700 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:flex md:justify-center gap-6">
          {QUICK_LINKS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 w-full md:w-60"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <Icon className="w-8 h-8 text-green-700 mb-4 group-hover:scale-110 transition" />

                  {/* Title */}
                  <h3 className="font-bold text-gray-700 text-lg mb-2 group-hover:text-green-700 transition">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm grow">
                    {item.description}
                  </p>

                  {/* Go Arrow */}
                  <span className="flex gap-2 items-center mt-4 text-green-700 font-bold text-sm group-hover:translate-x-1 transition ">
                    Go <ArrowRight size={20} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {/* ===================== Scroll to Top Button ====================== */}
      <button
        onClick={() => {
          document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
          document.body.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="flex justify-center gap-1 fixed bottom-8 left-8 `z-9999` bg-green-700 text-white border border-transparent
             
             md:hover:bg-white md:hover:text-green-800 md:hover:border-green-600 
             md:hover:scale-95 md:hover:-translate-y-1
             
             active:scale-90
             
             ease-in-out duration-100 p-4 rounded-full shadow-lg transition transform"
        aria-label="Scroll to top"
      >
        Top <ArrowUp size={24} />
      </button>
    </main>
  );
}
