"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const OWNERS = [
  {
    name: "Shiv Singh Deora",
    role: "Villa Host",
    image: "/images/shiv.jpg",
    message:
      "I personally ensure that every guest enjoys a clean, safe, and unforgettable stay. Your comfort is our priority. We strive to provide a warm, welcoming, and memorable experience for every guest.",
  },
  {
    name: "Vikram Singh Deora",
    role: "Co-Host",
    image: "/images/vikram.jpg",
    message:
      "We make sure every guest feels at home with personalized care and attention to detail for a memorable experience.",
  },
];

export default function OwnersNote() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

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
    <section ref={sectionRef} className=" py-8 md:py-12">
      <div className="container-fluid">
        <div className="pb-4 md:pb-8">
          <p className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950 ">
            Note By Host & Co-Host
          </p>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
            A few words from your hosts to ensure a memorable and hassle-free
            stay.
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 justify-center">
          {OWNERS.map((owner, idx) => (
            <div
              key={idx}
              className={`
              bg-white border rounded-3xl p-6 md:p-10 shadow-lg
              md:flex md:items-center gap-6 transition-all duration-700 ease-out
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Image */}
              <div className="shrink-0 mx-auto md:mx-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primaryBlue">
                  <Image
                    src={owner.image}
                    alt={owner.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-4 md:mt-0 text-center md:text-left flex-1 relative">
                {/* Speech-bubble tail */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rotate-45 md:hidden"></div>

                {/* Message */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {owner.message}
                </p>

                {/* Name & Role */}
                <h3 className="mt-4 text-primaryBlue font-semibold text-base md:text-lg">
                  {owner.name}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">{owner.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
