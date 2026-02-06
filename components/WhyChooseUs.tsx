"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FEATURES = [
  {
    title: "Prime Location",
    desc: "Close to lakes, temples and major attractions while staying peaceful.",
    icon: "/homenew/whyChooseUs/prime-location.jpg",
  },
  {
    title: "Private & Peaceful",
    desc: "Enjoy complete privacy with a calm and serene atmosphere.",
    icon: "/homenew/whyChooseUs/privacy.jpg",
  },
  {
    title: "Luxury Amenities",
    desc: "Modern interiors, pool access and fully equipped spaces.",
    icon: "/homenew/whyChooseUs/luxury-amenities.jpg",
  },
  {
    title: "Safe & Hygienic",
    desc: "Regular sanitization, clean linen and safety measures ensured.",
    icon: "/homenew/whyChooseUs/safe.jpg",
  },
  {
    title: "Family Friendly",
    desc: "Ideal for families, couples and group stays of all ages.",
    icon: "/homenew/whyChooseUs/family-love.jpg",
  },
  {
    title: "Personalized Care",
    desc: "Dedicated support to make your stay comfortable and memorable.",
    icon: "/homenew/whyChooseUs/care.jpg",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const INITIAL_COUNT = 4;

  // Load more state for mobile
  const [visibleCount, setVisibleCount] = useState(4);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const visibleItems = isMobile ? FEATURES.slice(0, visibleCount) : FEATURES;

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-12">
      <div className="container-fluid">
        {/* ================= Heading ================= */}
        <div className="mb-6 md:mb-10">
          <p className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950 border-l-4 border-black pl-2">
            Why Choose Our Villa
          </p>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
            Comfort, privacy and a memorable stay experience
          </p>
        </div>

        {/* ================= Cards ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-row bg-white rounded-lg overflow-hidden border shadow-sm transition-all duration-700 ease-out ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms`, height: "120px" }}
            >
              {/* Left Image - 30% */}
              <div className="w-[30%] h-full flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>

              {/* Right Content - 70% */}
              <div className="w-[70%] p-4 flex flex-col justify-center">
                <h3 className="text-sm md:text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= Load More / Load Less (Mobile Only) ================= */}
        {isMobile && (
          <div className="flex justify-center mt-4 gap-3">
            {visibleCount < FEATURES.length && (
              <button
                className="px-6 py-2 bg-blue-950 text-white rounded-md text-sm
           hover:bg-blue-900 active:scale-95
           transition-all duration-300"
                onClick={() => setVisibleCount((prev) => prev + 2)}
              >
                Load More
              </button>
            )}

            {visibleCount > INITIAL_COUNT && (
              <button
                className="px-6 py-2 border border-blue-950 text-blue-950
           rounded-md text-sm hover:bg-blue-50
           active:scale-95 transition-all duration-300"
                onClick={() => {
                  setVisibleCount(INITIAL_COUNT);
                  sectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                Load Less
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
