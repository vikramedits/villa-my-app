"use client";

import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function MobileBookNowCTA() {
  return (
    <>
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <Link
        href="/booking"
        className="group inline-flex items-center gap-2
          bg-green-800 text-white px-8 py-3 rounded-full font-medium
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

  {/* Mobile Call Button */}
  <Link
    href="tel:9587380255"
    className="flex md:hidden items-center gap-2 
    bg-green-600 text-white p-4 rounded-full 
    shadow-lg active:scale-95 transition-all duration-200"
  >
    <Phone size={20} />
  </Link>

  {/* Desktop WhatsApp Button */}
  <Link
    href="https://wa.me/919587380255"
    target="_blank"
    className="hidden md:flex items-center gap-2 
    bg-green-500 text-white px-4 py-3 rounded-full 
    font-semibold shadow-lg hover:scale-105 transition"
  >
    <FaWhatsapp size={20} />
    WhatsApp
  </Link>

</div>
    </>
  );
}
