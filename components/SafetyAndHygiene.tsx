"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SAFETY_DATA = [
  {
    title: "Professional Cleaning",
    description:
      "Villa is thoroughly cleaned and sanitized after every checkout.",
    icon: "/homenew/safety/cleaning.jpg",
  },
  {
    title: "Sanitized Rooms",
    description: "All rooms, bathrooms and kitchens are disinfected regularly.",
    icon: "/homenew/safety/sanitized-room.jpeg",
  },
  {
    title: "Secure Property",
    description: "Gated and private property to ensure complete guest safety.",
    icon: "/homenew/safety/secured-property.jpeg",
  },
  {
    title: "24×7 Caretaker",
    description: "On-site caretaker available for assistance anytime.",
    icon: "/homenew/safety/caretaker.jpg",
  },
  {
    title: "Power Backup",
    description:
      "Inverter / generator available upto 4 hours during power cuts.",
    icon: "/homenew/safety/power-backup.jpg",
  },
  {
    title: "First Aid & Fire Safety",
    description: "First aid kit and fire extinguisher available on property.",
    icon: "/homenew/safety/first-aid-new.jpg",
  },
  {
    title: "CCTV Surveillance",
    description: "Areas monitored with CCTV cameras for security.",
    icon: "/homenew/safety/cctv-camera.jpg",
  },
  {
    title: "Night Lighting",
    description:
      "Well-lit pathways and entrances for safe night-time movement.",
    icon: "/homenew/safety/night-lighting.jpg",
  },
];

export default function SafetyAndHygiene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleItems = isMobile
    ? SAFETY_DATA.slice(0, visibleCount)
    : SAFETY_DATA;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ================= Client-only animation fix =================
  useEffect(() => {
    setVisible(true); // Animation sirf browser me chale
  }, []);

  // ================= IntersectionObserver (scroll animation) =================
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true); // animation ON
          observer.disconnect(); // observer ko disconnect kar do, animation ek baar hi chale
        }
      },
      { threshold: 0.2 }, // scroll ka percentage trigger
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-blue-50 py-10 md:py-12">
      <div className="container-fluid">
        {/* ================= Heading ================= */}
        <div className="mb-6 md:mb-10 text-start md:text-left">
          <p className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950 border-l-4 border-black pl-2">
            Safety & Hygiene
          </p>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
            Your comfort, safety and cleanliness are our top priority
          </p>
        </div>

        {/* ================= Cards ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className={`
                         relative overflow-hidden rounded-lg border bg-black
                          h-55 md:h-90
                         transition-all duration-700 ease-out
                         md:hover:shadow-lg
                         ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                       `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>
              <div className="relative z-10 h-full flex flex-col items-center justify-end py-2 md:py-4">
                <div
                  className={`
                               flex items-center gap-2
                               text-white
                               transition-all duration-500
                               ${openIndex === index ? "-translate-y-20" : "translate-y-0"}
                             `}
                >
                  {/* ======== Title ======== */}
                  <p className="text-sm md:text-xl font-semibold text-center">
                    {item.title}
                  </p>

                  {/* ========== Arrow inside white box ========== */}
                  <span
                    className={`flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white text-black rounded-sm transition-transform duration-300
                                ${openIndex === index ? "rotate-180" : ""}`}
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    ⌄
                  </span>
                </div>
                {/* ========== Slide-up Description ========== */}

                <div
                  className={`
                             absolute bottom-0 left-0 w-full
                             bg-black/70 backdrop-blur-md
                             text-white text-xs md:text-sm
                             px-4 py-3
                             transition-all duration-500 ease-in-out
                             ${openIndex === index ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
                             mt-2
                           `}
                >
                  <p className="text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* ================= Load More / Load Less (Mobile Only) ================= */}
        {isMobile && visibleCount < SAFETY_DATA.length && (
          <div className="flex justify-center mt-6 gap-3">
            <button
              className="px-6 py-2 bg-blue-950 text-white rounded-md text-sm hover:bg-blue-900 transition"
              onClick={() => setVisibleCount((prev) => prev + 2)}
            >
              Load More
            </button>
          </div>
        )}

        {isMobile && visibleCount > INITIAL_COUNT && (
          <div className="flex justify-center mt-6 gap-3">
            <button
              className="px-6 py-2 border bg-blue-950 text-white rounded-md text-sm hover:bg-blue-50 transition"
              onClick={() => setVisibleCount(INITIAL_COUNT)}
            >
              Load Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
