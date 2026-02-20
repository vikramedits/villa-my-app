"use client";

import { CalendarCheck } from "lucide-react";
import Link from "next/link";

export default function MobileBookNowCTA() {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <Link
        href="/booking"
        className="group inline-flex items-center gap-2
          bg-green-950 text-white px-8 py-3 rounded-full font-medium
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
  );
}
