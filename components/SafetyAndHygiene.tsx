"use client";

import { ArrowLeftToLine, ArrowUpToLine } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { itemAxisPredicate } from "recharts/types/state/selectors/axisSelectors";

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
  const [showTap, setShowTap] = useState(false);

  const handleCardClick = (index: number) => {
    setOpenIndex(index);
    setShowTap(true); // Pehli card select ke baad Tap dikhana
  };
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
          <p className="text-lg md:text-2xl font-ubuntu font-bold md:font-medium tracking-wide text-gray-950 border-l-4 border-black pl-2">
            Safety & Hygiene
          </p>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide font-ubuntu">
            Your comfort, safety and cleanliness are our top priority
          </p>
        </div>
        {/* ============= Circular Layout ==================== */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          {/* Left: Circular Layout */}
          <div className="relative w-full md:flex-1 flex items-center justify-center h-96 md:h-187.5">
            {/* Center Image */}
            <div
              className="absolute w-52 h-52 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl z-0 cursor-pointer animate-float"
              onClick={() => {
                setOpenIndex(null);
                setShowTap(true);
                setShowTap((prev) => !prev); // first click pe Tap overlay dikhana
              }}
            >
              <Image
                src="/homenew/standard/Room-home-image.jpeg"
                alt="Villa"
                fill
                className="object-cover transition-transform duration-300 ease-in-out  hover:scale-110"
                priority
              />

              {/* Tap overlay */}
              {showTap && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p
                    className="text-white font-medium text-center text-sm md:text-lg bg-black bg-opacity-30 px-3 border border-green-500 py-1 rounded-full
                  "
                  >
                    Tap
                  </p>
                </div>
              )}
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
                      className="w-28 h-28 md:w-44 md:h-44 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-3 md:p-4 cursor-pointer
                    border  hover:border-green-700 hover:scale-110 duration-200 transition"
                      onClick={() => handleCardClick(index)}
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
            <div className="w-full bg-black text-white p-6 rounded-xl shadow-2xl animate-fadeIn h-40 md:h-auto overflow-y-auto">
              {openIndex === null ? (
                <>
                  <ArrowUpToLine className="block lg:hidden mx-auto mb-4 w-8 h-8" />
                  <ArrowLeftToLine className="hidden lg:block mx-auto mb-4 w-10 h-10" />
                  <p className="text-sm md:text-base text-center uppercase">
                    Please click a <span className="text-green-500">card</span>{" "}
                    to see the{" "}
                    <span className="text-green-500">information</span> !
                  </p>
                </>
              ) : (
                <div className="flex items-center gap-8 lg:gap-8">
                  <div className="w-20 h-8 md:w-12 md:h-12 ">
                    <Image
                      width={64}
                      height={64}
                      src={SAFETY_DATA[openIndex].icon}
                      alt="icon"
                      className=" object-cover aspect-square rounded-sm"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-lg md:text-xl mb-2">
                      {SAFETY_DATA[openIndex].title}
                    </p>
                    <p className="text-sm md:text-base">
                      {SAFETY_DATA[openIndex].description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
