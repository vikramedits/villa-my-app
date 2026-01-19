"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FEATURES = [
  {
    title: "Prime Location",
    desc: "Close to lakes, temples and major attractions while staying peaceful.",
    icon: "/icons/location.svg",
  },
  {
    title: "Private & Peaceful",
    desc: "Enjoy complete privacy with a calm and serene atmosphere.",
    icon: "/icons/privacy.svg",
  },
  {
    title: "Luxury Amenities",
    desc: "Modern interiors, pool access and fully equipped spaces.",
    icon: "/icons/amenities.svg",
  },
  {
    title: "Safe & Hygienic",
    desc: "Regular sanitization, clean linen and safety measures ensured.",
    icon: "/icons/safety.svg",
  },
  {
    title: "Family Friendly",
    desc: "Ideal for families, couples and group stays of all ages.",
    icon: "/icons/family.svg",
  },
  {
    title: "Personalized Care",
    desc: "Dedicated support to make your stay comfortable and memorable.",
    icon: "/icons/support.svg",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className=" py-8 md:py-12">
      <div className="container-fluid">
        {/* ================= Heading ================= */}
        <div className="mb-6 md:mb-10">
          <h2 className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950">
            Why Choose Our Villa
          </h2>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
            Comfort, privacy and a memorable stay experience
          </p>
        </div>

        {/* ================= Cards ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {FEATURES.map((item, index) => (
            <div
              key={index}
              className={`
                bg-white border rounded-2xl p-5 md:p-6
                transition-all duration-700 ease-out
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                />
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-base font-semibold text-gray-900 text-center">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-600 text-center mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
