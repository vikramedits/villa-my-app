// File: app/blog/page.tsx
"use client";

import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---- Blog Data ----
interface BlogPost {
  title: string;
  snippet: string;
  content: string[];
  image: string;
  link: string;
  sn: string;
}

// ---- Featured Article ----
const FEATURED_ARTICLE: BlogPost = {
  title: "Best 7-BHK Private Pool Villa in Udaipur for Families & Celebrations",
  snippet:
    "Planning a group getaway? Discover why private villas like The Pushpa Heritage are better than hotels for large groups.",
  content: [
    "Experience luxury and privacy at The Pushpa Heritage. With a private pool, terrace, 2 Big Gardens and seven bedrooms, it’s perfect for family getaways or celebrations. Enjoy sunset views over Badi Lake, modern amenities, and professional staff ensuring comfort and security throughout your stay.",
  ],
  image: "/villa/hero-pool-drone.jpg",
  link: "/blog/private-7-bhk-villa-udaipur",
  sn: "",
};

const BLOG_POSTS: BlogPost[] = [
  {
    title: "Poolside BBQ & Parties",
    snippet: "Make the most of your villa pool parties.",
    content: [
      "Private pool area with comfortable dinnig seating and garden surroundings.",
      "Fast service with veg & non-veg options prepared fresh.",
      "Bluetooth music system for party vibes available.",
      "Evening lighting with fairy lights and pool glow effects.",
      "Floating snacks & mocktails for Instagram-worthy moments.",
      "On-call staff support ensuring safety and smooth celebrations.",
    ],
    image: "/homenew/gallery-webp/pool-1.webp",
    link: "/blog/poolside-bbq-party",
    sn: "1",
  },
  {
    title: "How to Host a Birthday Party at The Pushpa Heritage",
    snippet: "DJ nights, poolside fun, terrace celebrations.",
    content: [
      "Host a private poolside celebration with music, floating decorations, and ambient lighting for an unforgettable birthday evening.",

      "Transform the terrace into a stylish dining space with fairy lights, candle-lit tables, and a customized birthday backdrop.",

      "Arrange a live DJ or curated playlist to match your vibe — from relaxed sunset tunes to energetic dance sessions.",

      "Personalize the decor with theme-based setups, balloon arches, floral arrangements, and a beautifully designed cake table.",

      "Enjoy spacious indoor lounges for games, conversations, and comfortable seating for guests of all ages.",

      "Capture every special moment with stunning villa backdrops — perfect for photos, reels, and memories that last forever.",
    ],

    image: "/homenew/gallery-webp/balcony-1.webp",
    link: "/blog/host-birthday-party",
    sn: "2",
  },
  {
    title: "Top Things to Do Near Badi Lake",
    snippet: "Sunsets, hill views, and nearby attractions.",
    content: [
      "Explore Badi Lake with sunset walks, photography spots, boating, and nearby temples.",
    ],

    image: "/homenew/gallery-webp/room-11.webp",
    link: "/blog/badi-lake-things-to-do",
    sn: "3",
  },
  {
    title: "Why Private Villas Are Better Than Hotels",
    snippet: "Privacy, comfort, and luxury amenities for families.",
    content: [
      "Private villas offer unmatched privacy, private pools, spacious rooms and personalized service.",
    ],

    image: "/homenew/gallery-webp/room-10.webp",
    link: "/blog/private-villa-vs-hotels",
    sn: "4",
  },
  {
    title: "Luxury Villa Interior Tour",
    snippet: "Discover the elegance inside The Pushpa Heritage.",
    content: [
      "Take a virtual tour of our luxury 7-BHK villa interiors with modern design.",
    ],

    image: "/homenew/gallery-webp/room-4.webp",
    link: "/blog/luxury-villa-interior-tour",
    sn: "5",
  },
  {
    title: "Best Sunset Spots Near Badi Lake",
    snippet: "Romantic and scenic photography locations.",
    content: [
      "Explore the most breathtaking sunset viewpoints around Badi Lake.",
    ],

    image: "/homenew/gallery-webp/pool-2.webp",
    link: "/blog/best-sunset-spots-badi-lake",
    sn: "6",
  },
  {
    title: "Family Getaway Itinerary",
    snippet: "Perfect 3-day villa stay plan.",
    content: [
      "A complete 3-day itinerary for families staying at The Pushpa Heritage.",
    ],

    image: "/homenew/gallery-webp/garden-1.webp",
    link: "/blog/family-getaway-itinerary",
    sn: "7",
  },
  {
    title: "Wedding & Celebration Packages",
    snippet: "Host memorable events at our villa.",
    content: [
      "Plan weddings, anniversaries and special celebrations with customized decor and services.",
    ],

    image: "/homenew/gallery-webp/room-3.webp",
    link: "/blog/wedding-celebration-packages",
    sn: "8",
  },
  {
    title: "Private Chef Experience",
    snippet: "Gourmet meals prepared just for you.",
    content: [
      "Enjoy personalized gourmet meals prepared by our in-house private chef.",
    ],

    image: "/homenew/gallery-webp/room-4.webp",
    link: "/blog/private-chef-experience",
    sn: "9",
  },
  {
    title: "Villa Safety & Hygiene Standards",
    snippet: "Ensuring a safe and clean stay.",
    content: [
      "Daily cleaning, sanitized rooms, and strict hygiene standards for guest safety.",
    ],

    image: "/homenew/gallery-webp/room-5.webp",
    link: "/blog/villa-safety-hygiene-standards",
    sn: "10",
  },
  {
    title: "Nearby Adventure & Activities",
    snippet: "Boating, trekking, and local attractions.",
    content: [
      "Discover adventure activities and local attractions near The Pushpa Heritage.",
    ],

    image: "/homenew/gallery-webp/balcony-2.webp",
    link: "/blog/nearby-adventure-activities",
    sn: "11",
  },
];

export default function BlogPage() {
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);

  return (
    <main id="top" className="bg-gray-50 min-h-screen font-sans">
      {/* ==================== Featured Article - Top ====================== */}
      <section className="relative w-full l h-96 md:h-150">
        <Image
          src={FEATURED_ARTICLE.image}
          alt={FEATURED_ARTICLE.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#F8F5F0] bg-opacity-30 flex flex-col justify-center lg:justify-start  px-8 md:px-16">
          <h1 className="text-3xl md:text-5xl font-light text-green-950 mb-4">
            {FEATURED_ARTICLE.title}
          </h1>
          <p className="text-gray-500 text-lg md:text-xl mb-4">
            {FEATURED_ARTICLE.snippet}
          </p>
          <button
            onClick={() => setOpenPost(FEATURED_ARTICLE)}
            className="flex gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-3 rounded-sm transition w-1/2 "
            aria-label={`Read full story: ${FEATURED_ARTICLE.title}`}
          >
            Full Overview <ArrowRight />
          </button>
        </div>
      </section>

      {/* ============================ Blog Grid ============================== */}
      <section className="container-fluid mx-auto py-6 lg:py-16 ">
        <h2 className="text-center text-2xl lg:text-3xl pb-3 lg:pb-6 text-gray-600 flex justify-center gap-1  items-center">
          {" "}
          <span>Why Stay With Us</span> <ArrowDown size={28} />
        </h2>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
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

                <button
                  onClick={() => setOpenPost(post)}
                  className="flex items-center gap-2 mt-auto text-green-700 bg-orange-100 w-1/2 px-2 py-1 rounded-full font-medium
                   hover:text-white shadow hover:scale-90 transition ease-in-out duration-100"
                >
                  More Details <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =============================== Modal =============================== */}
      <AnimatePresence>
        {openPost && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpenPost(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-3xl w-full px-4 pb-6 pt-14 lg:px-8 lg:py-14 relative shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ willChange: "opacity" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-5 z-50 bg-gray-200 rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-300 text-lg"
                onClick={() => setOpenPost(null)}
                aria-label="Close modal"
              >
                ×
              </button>

              <div className="mb-6 p-4 lg:p-8 bg-green-50 rounded-lg border border-green-100">
                <h2 className="text-lg lg:text-2xl font-semibold text-green-900">
                  {openPost.title}
                </h2>
              </div>

              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {openPost.content.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ==================== Sidebar + Quick Booking ========================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 mb-16">
        <aside className="md:w-1/3 flex flex-col gap-6 sticky top-24">
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
                    className="text-gray-700 hover:text-green-700 transition"
                    aria-label={`Open post: ${post.title}`}
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

      {/* ===================== Scroll to Top Button ====================== */}
      <button
        onClick={() => {
          document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
          document.body.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="flex justify-center gap-1 fixed bottom-8 left-8 `z-9999` bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg transition transform hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        Top <ArrowUp size={24} />
      </button>
    </main>
  );
}
