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
    <section className="relative bg-linear-to-b from-gray-50 to-white py-20 overflow-visible">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold border-l-4 border-black inline-block pl-3">
            Safety & Hygiene
          </h2>
          <p className="text-gray-600 mt-3">
            Your comfort, safety and cleanliness are our top priority
          </p>
        </div>

        {/* Circular Layout */}
        <div className="relative flex items-center justify-center h-[500px] md:h-[750px]">
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

          {/* Circular Items */}
          {SAFETY_DATA.map((item, index) => {
            const angle =
              (index / SAFETY_DATA.length) * (2 * Math.PI) - Math.PI / 2;

            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={index}
                className="absolute transition-transform duration-300 z-20"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Card */}
                  <div className="w-28 h-28 md:w-44 md:h-44 bg-white shadow-lg hover:shadow-2xl rounded-xl flex flex-col items-center justify-center text-center p-3 md:p-4 transition duration-300 hover:scale-105">
                    <div className="relative w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-3">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <p className="text-[10px] md:text-sm font-semibold leading-tight">
                      {item.title}
                    </p>

                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className={`absolute bottom-2 text-xs transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </button>
                  </div>

                  {/* Description Overlay */}
                  {openIndex === index && (
                    <div className="absolute top-full mt-3 w-48 md:w-64 bg-black text-white p-4 rounded-xl shadow-2xl z-[100] animate-fadeIn">
                      <p className="text-xs md:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
