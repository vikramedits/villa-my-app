// File: app/blog/page.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

// ---- Blog Data ----
interface BlogPost {
  title: string;
  snippet: string;
  content: string;
  image: string;
  link: string;
}

// ---- Featured Article ----
const FEATURED_ARTICLE: BlogPost = {
  title: "Best 7-BHK Private Pool Villa in Udaipur for Families & Celebrations",
  snippet:
    "Planning a group getaway? Discover why private villas like The Pushpa Heritage are better than hotels for large groups.",
  content:
    "Experience luxury and privacy at The Pushpa Heritage. With a private pool, terrace, and seven bedrooms, it’s perfect for family getaways or celebrations. Enjoy sunset views over Badi Lake, modern amenities, and professional staff ensuring comfort and security throughout your stay.",
  image: "/villa/hero-pool-drone.jpg",
  link: "/blog/private-7-bhk-villa-udaipur",
};

// ---- Other Blog Posts ----
const BLOG_POSTS: BlogPost[] = [
  {
    title: "How to Host a Birthday Party at The Pushpa Heritage",
    snippet: "DJ nights, poolside fun, terrace celebrations.",
    content:
      "Celebrate birthdays in style at our villa. Enjoy poolside DJ nights, terrace dining, and customized birthday decor. Our staff can help arrange catering, music, and fun activities for all ages.",
    image: "/homenew/gallery-webp/balcony-1.webp",
    link: "/blog/host-birthday-party",
  },
  {
    title: "Top Things to Do Near Badi Lake",
    snippet: "Sunsets, hill views, and nearby attractions.",
    content:
      "Explore Badi Lake and surroundings: sunset walks, hilltop photography, boating, and nearby temples. Perfect for family outings or romantic evenings. Our villa concierge can arrange guided tours and activities.",
    image: "/homenew/gallery-webp/room-11.webp",
    link: "/blog/badi-lake-things-to-do",
  },
  {
    title: "Why Private Villas Are Better Than Hotels",
    snippet: "Privacy, comfort, and luxury amenities for families.",
    content:
      "Private villas offer unmatched privacy and space compared to hotels. Enjoy personalized services, private pools, exclusive terraces, and fully equipped kitchens. Perfect for large families and celebrations where comfort and exclusivity matter.",
    image: "/homenew/gallery-webp/room-10.webp",
    link: "/blog/private-villa-vs-hotels",
  },
];

// ---- Main Component ----
export default function BlogPage() {
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main id="top" className="bg-gray-50 min-h-screen font-sans">
      {/* Featured Article */}
      <section className="relative w-full h-125 md:h-150">
        <Image
          src={FEATURED_ARTICLE.image}
          alt={FEATURED_ARTICLE.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center p-8 md:p-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {FEATURED_ARTICLE.title}
          </h1>
          <p className="text-white text-lg md:text-xl mb-4">
            {FEATURED_ARTICLE.snippet}
          </p>
          <button
            onClick={() => setOpenPost(FEATURED_ARTICLE)}
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-md transition"
            aria-label={`Read full story: ${FEATURED_ARTICLE.title}`}
          >
            Read Full Story →
          </button>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container-fluid bg-gray-100 max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            ...BLOG_POSTS,
            {
              title: "Poolside BBQ & Party Tips",
              snippet: "Make the most of your villa pool parties.",
              content:
                "Learn how to host the perfect poolside BBQ at The Pushpa Heritage...",
              image: "/homenew/gallery-webp/pool-1.webp",
              link: "/blog/poolside-bbq-party",
            },
            {
              title: "Luxury Villa Interior Tour",
              snippet: "Discover the elegance inside The Pushpa Heritage.",
              content:
                "Take a detailed virtual tour of our 7-BHK villa interiors...",
              image: "/homenew/gallery-webp/room-4.webp",
              link: "/blog/luxury-villa-interior-tour",
            },
            {
              title: "Best Sunset Spots Near Badi Lake",
              snippet: "Romantic and scenic spots for photography.",
              content:
                "Explore the most breathtaking sunset viewpoints around Badi Lake...",
              image: "/homenew/gallery-webp/pool-2.webp",
              link: "/blog/best-sunset-spots-badi-lake",
            },
            {
              title: "Family Getaway Itinerary",
              snippet: "Make the most of your villa stay in 3 days.",
              content:
                "We suggest a 3-day itinerary for families staying at The Pushpa Heritage...",
              image: "/homenew/gallery-webp/garden-1.webp",
              link: "/blog/family-getaway-itinerary",
            },
            {
              title: "Wedding & Celebration Packages",
              snippet: "Host memorable events at The Pushpa Heritage.",
              content:
                "Plan your wedding, anniversary, or special celebration in our villa...",
              image: "/homenew/gallery-webp/room-3.webp",
              link: "/blog/wedding-celebration-packages",
            },
            {
              title: "Private Chef Experience",
              snippet: "Gourmet meals prepared just for you.",
              content:
                "Book a private chef to enjoy gourmet meals prepared at the villa...",
              image: "/homenew/gallery-webp/room-4.webp",
              link: "/blog/private-chef-experience",
            },
            {
              title: "Villa Safety & Hygiene Standards",
              snippet: "Ensuring a safe and clean stay for guests.",
              content:
                "We prioritize hygiene and safety with daily cleaning, sanitized rooms...",
              image: "/homenew/gallery-webp/room-5.webp",
              link: "/blog/villa-safety-hygiene-standards",
            },
            {
              title: "Nearby Adventure & Activities",
              snippet: "Boating, trekking, and local attractions.",
              content:
                "Discover adventure activities near The Pushpa Heritage...",
              image: "/homenew/gallery-webp/balcony-2.webp",
              link: "/blog/nearby-adventure-activities",
            },
          ].map((post) => (
            <div
              key={post.title}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col"
            >
              <div className="relative h-60 md:h-64 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4">{post.snippet}</p>
                </div>
                <button
                  onClick={() => setOpenPost(post)}
                  className="mt-auto text-green-700 font-semibold hover:underline"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {openPost && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setOpenPost(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-2xl"
              onClick={() => setOpenPost(null)}
              aria-label="Close modal"
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
            <p className="text-gray-700">{openPost.content}</p>
          </div>
        </div>
      )}
      {/* Sidebar + Quick Booking */}
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

      {/* Read More Modal */}
      {openPost && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setOpenPost(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-2xl"
              onClick={() => setOpenPost(null)}
              aria-label="Close modal"
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
            <p className="text-gray-700">{openPost.content}</p>
          </div>
        </div>
      )}

      {/* Scroll to Top Button - Always Visible */}
      <button
        onClick={() => {
          // Scroll top using both documentElement and body
          document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
          document.body.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="fixed bottom-8 left-8 `z-9999` bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg transition transform hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        ↑ Top
      </button>
    </main>
  );
}
