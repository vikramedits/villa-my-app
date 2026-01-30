"use client";

import { useState, useEffect } from "react";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";

export default function MobileBookNowCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-opacity duration-500 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="pb-8 flex justify-center mt-2">
        <Link
          href="/booking"
          className="group inline-flex items-center gap-2
                     bg-blue-950 text-white border
                     px-8 py-3 rounded-full font-medium
                     transition-all duration-300 ease-out
                     hover:bg-white hover:text-blue-950
                     animate-ctaGlow"
        >
          <CalendarCheck
            size={18}
            className="transition-transform duration-300 group-hover:rotate-6"
          />
          <span className="animate-textPulse">Book Now</span>
        </Link>
      </div>
    </div>
  );
}
