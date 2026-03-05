"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BLOG_POSTS, FEATURED_ARTICLE } from "@/app/data/blog-data";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BedDouble,
  CalendarCheck,
  ImageIcon,
  Sparkles,
} from "lucide-react";

export default function BlogPage() {
  const [isArticleVisible, setIsArticleVisible] = useState(false);

  const toggleArticleVisibility = () => {
    setIsArticleVisible(!isArticleVisible);
  };

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

  const highlightWords = [
    "7-BHK",
    "the pushpa heritage", // Keep this phrase intact
    "families",
    "friends",
    "small celebrations",
    "birthday parties",
    "anniversaries",
    "reunions",
    "pre-wedding",
  ];

  const highlightText = (text: string) => {
    // Create a regex pattern to match words or phrases from the highlightWords array
    const regex = new RegExp(`(${highlightWords.join("|")})`, "gi");

    // Replace matched words/phrases with highlighted text
    let lastIndex = 0;
    return text.split(regex).map((part, index) => {
      // Check if the current part is one of the highlighted phrases/words
      if (regex.test(part)) {
        return (
          <span key={index} className="text-green-800 font-bold">
            {part}
          </span>
        );
      }
      // Otherwise, return the part as is
      return <span key={index}>{part}</span>;
    });
  };
  return (
    <main id="top" className="container-fluid bg-gray-50 font-sans">
      {/* Featured Article */}
      <section className="w-full bg-[#F8F5F0] py-16 px-2 md:px-16">
        <div className="lg:max-w-6xl bg-white rounded-2xl shadow-xl p-4 md:p-14">
          <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
            Featured Article
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-green-950 mt-3 mb-6 leading-tight">
            {FEATURED_ARTICLE.title}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-3xl leading-relaxed">
            {FEATURED_ARTICLE.snippet}
          </p>
          <button
            onClick={toggleArticleVisibility}
            className=" bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg mt-4 flex items-center gap-2"
          >
            {/* Button text */}
            {isArticleVisible ? "Hide Overview" : "Show Overview"}

            {/* Arrow Icon */}
            {isArticleVisible ? (
              <ArrowUp
                size={18}
                className="transition-transform duration-300 transform"
              />
            ) : (
              <ArrowDown
                size={18}
                className="transition-transform duration-300 transform"
              />
            )}
          </button>

          {isArticleVisible && (
            <ul className="mt-6 list-disc pl-5">
              {FEATURED_ARTICLE.content.map((paragraph, index) => (
                <li
                  key={index}
                  className="text-gray-600 text-base md:text-lg mb-4"
                >
                  {highlightText(paragraph)}{" "}
                  {/* Use the highlightText function here */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pt-6 lg:pt-10 pb-10 lg:pb-16">
        <p className="flex justify-center items-center gap-4 font-serif text-white text-2xl lg:text-3xl font-semibold tracking-wider py-8">
          <span className="text-black">Why Stay With Us</span>
          <ArrowDown
            size={24}
            className="text-black hover:text-white transition-all duration-300 transform hover:translate-y-1"
          />
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
                <div className="absolute bottom-0 left-0 right-0 font-serif bg-opacity-50 bg-black text-white rounded-t-full w-12 mx-auto text-xl px-2 pt-1 text-center">
                  {post.sn}
                </div>
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

      {/* Quick Links */}
      <section className="pt-6 lg:pt-10 mb-8 lg:mb-16 px-6 md:px-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-green-800 pb-2 lg:pb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-2 md:flex md:justify-center md:gap-8 gap-4">
          {[
            {
              title: "Amenities",
              href: "/amenities",
              icon: <Sparkles size={40} />,
              desc: "Explore our facilities",
            },
            {
              title: "Rooms",
              href: "/rooms",
              icon: <BedDouble size={40} />,
              desc: "Luxury stays await",
            },
            {
              title: "Images & Videos",
              href: "/gallery",
              icon: <ImageIcon size={40} />,
              desc: "See our visuals",
            },
            {
              title: "Book Now",
              href: "/booking",
              icon: <CalendarCheck size={40} />,
              desc: "Reserve your spot",
            },
          ].map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex flex-col justify-between items-start bg-white rounded-xl shadow-md hover:shadow-xl p-6 w-full md:w-48 transition hover:-translate-y-1"
            >
              <div className="flex flex-col items-center w-full">
                {/* Icon */}
                <div className="text-green-700 mb-4">{link.icon}</div>
                {/* Title */}
                <span className="font-semibold text-gray-800 mb-1 text-center">
                  {link.title}
                </span>
                {/* Sub-line / Description */}
                <p className="text-gray-500 text-sm text-center">{link.desc}</p>
              </div>
              {/* Visit button at bottom-left */}
              <span className="mt-4 text-green-700 font-medium flex mx-auto items-center gap-1">
                Visit <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
