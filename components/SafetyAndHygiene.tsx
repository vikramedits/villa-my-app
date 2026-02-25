"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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
    description: "On-site caretaker available anytime.",
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
    description: "Well-lit pathways and entrances for safe night movement.",
    icon: "/homenew/safety/night-lighting.jpg",
  },
];

export default function SafetyAndHygiene() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [radius, setRadius] = useState(260);

  // Responsive radius handler
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        setRadius(140);
      } else {
        setRadius(260);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <section className="relative bg-linear-to-b from-gray-300 to-white py-20 overflow-visible">
      <div className="container-fluid mx-auto px-4">
        {/* ============= Heading ============== */}
        <div className="mb-16 text-start">
          <p className="text-2xl md:text-3xl font-bold border-l-4 border-black inline-block pl-3">
            Safety & Hygiene
          </p>
          <p className="text-gray-600 mt-3">
            Your comfort, safety and cleanliness are our top priority
          </p>
        </div>
        {/* ============= Circular Layout ==================== */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          {/* Left: Circular Layout */}
          <div className="relative w-full md:flex-1 flex items-center justify-center h-96 md:h-[750px]">
            {/* Center Image */}
            <div className="absolute w-52 h-52 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl z-0">
              <Image
                src="/homenew/standard/Room-home-image.jpeg"
                alt="Villa"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Cards */}
            {SAFETY_DATA.map((item, index) => {
              const angle =
                (index / SAFETY_DATA.length) * (2 * Math.PI) - Math.PI / 2;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              return (
                <div
                  key={index}
                  className="absolute transition-transform duration-300 z-20"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-28 h-28 md:w-44 md:h-44 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-3 md:p-4 cursor-pointer hover:scale-105 transition"
                      onClick={() => setOpenIndex(index)}
                    >
                      <div className="relative w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-3">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <p className="text-[10px] md:text-sm font-semibold text-center">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Info Box */}
          <div className="w-full md:flex-1">
            {openIndex !== null && (
              <div className="w-full bg-black text-white p-6 rounded-xl shadow-2xl animate-fadeIn h-40 md:h-auto overflow-y-auto">
                <p className="font-bold text-lg md:text-xl mb-2">
                  {SAFETY_DATA[openIndex].title}
                </p>
                <p className="text-sm md:text-base">
                  {SAFETY_DATA[openIndex].description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
