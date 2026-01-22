"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SAFETY_DATA = [
  {
    title: "Professional Cleaning",
    description:
      "Villa is thoroughly cleaned and sanitized after every checkout.",
    icon: "/icons/safety/cleaning.svg",
  },
  {
    title: "Sanitized Rooms",
    description: "All rooms, bathrooms and kitchens are disinfected regularly.",
    icon: "/icons/safety/sanitized.svg",
  },
  {
    title: "Secure Property",
    description: "Gated and private property to ensure complete guest safety.",
    icon: "/icons/safety/security.svg",
  },
  {
    title: "24×7 Caretaker",
    description: "On-site caretaker available for assistance anytime.",
    icon: "/icons/safety/support.svg",
  },
  {
    title: "Power Backup",
    description: "Inverter / generator available during power cuts.",
    icon: "/icons/safety/power.svg",
  },
  {
    title: "First Aid & Fire Safety",
    description: "First aid kit and fire extinguisher available on property.",
    icon: "/icons/safety/first-aid.svg",
  },
];

export default function SafetyAndHygiene() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // IntersectionObserver for scroll-triggered animation
 useEffect(() => {
  if (!sectionRef.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true); // animation ON
        observer.disconnect(); // observer ko disconnect kar do, animation ek baar hi chale
      }
    },
    { threshold: 0.2 } // scroll ka percentage trigger
  );

  observer.observe(sectionRef.current);

  return () => observer.disconnect();
}, []);


  return (
    <section ref={sectionRef} className="bg-blue-50 py-10 md:py-12">
      <div className="container-fluid">
        {/* ================= Heading ================= */}
        <div className="mb-6 md:mb-10 text-center md:text-left">
          <h2 className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950">
            Safety & Hygiene
          </h2>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
            Your comfort, safety and cleanliness are our top priority
          </p>
        </div>

        {/* ================= Cards ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {SAFETY_DATA.map((item, index) => (
            <div
              key={index}
              className={`
                rounded-2xl border bg-white p-5 md:p-6 transition-all duration-700 ease-out
                hover:shadow-lg
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{
                transitionDelay: `${index * 100}ms`, 
              }}
            >
              {/* Icon */}
              <div className="relative h-12 w-12 md:h-14 md:w-14 mb-4 mx-auto">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h4 className="text-sm md:text-base font-semibold text-gray-900 text-center">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
