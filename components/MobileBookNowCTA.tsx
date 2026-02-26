"use client";

import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";

export default function MobileBookNowCTA() {
  return (
    <>
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <Link
        href="/booking"
        className="group inline-flex items-center gap-2
          bg-green-900 text-white px-8 py-3 rounded-full font-medium
          shadow-lg transition-all duration-200 ease-out
          hover:bg-white hover:text-green-950 hover:border border-green-950
          animate-slideUp"
      >
        <CalendarCheck
          size={18}
          className="transition-transform duration-300 group-hover:rotate-6"
        />
        <span className="animate-pulse">Book Now</span>
      </Link>
    </div>

     {/* Bottom Right Call Now CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="tel:9587380255"
          className="flex items-center gap-2
            bg-black border border-gray-400 text-white p-4 rounded-full font-semibold
            shadow-lg active:scale-95 transition-all duration-200 "
        >
          <Phone size={18} />
         
        </Link>
      </div>
    </>
  );
}
