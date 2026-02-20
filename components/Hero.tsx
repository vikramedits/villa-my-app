"use client";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CalendarCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="items-center">
      <div className=" mx-auto shadow-md overflow-hidden bg-white">
        <div className="relative h-[55vh] md:h-[55vh]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/homenew/video-home.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 h-full flex flex-col justify-between text-center px-4">
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-2xl md:text-4xl font-bold text-white leading-tight
               opacity-0 translate-y-6 animate-fadeUp tracking-wider">Hello!</p>
              <p
                className="text-2xl md:text-4xl font-bold text-white leading-tight tracking-wider
               opacity-0 translate-y-6 animate-fadeUp"
              >
               Book Your Stay in Minutes.
              </p>
            </div>

            <div className="pb-8 mt-2">
              {/* <Link
                aria-label="Book your villa now"
                href="/booking"
                className="group inline-flex items-center gap-2
               bg-white text-blue-950
               px-8 py-3 rounded-full font-medium
               transition-all duration-300 ease-out
               hover:bg-blue-900 hover:text-white
               animate-ctaGlow"
              >
                <CalendarCheck
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-6"
                />

                <span className="animate-textPulse">Book Now</span>
              </Link> */}
              <Link
                href="/check-booking"
                className="group inline-flex items-center gap-2
               bg-white text-gray-950
               px-8 py-3 rounded-full font-medium
               transition-all duration-300 ease-out
               hover:bg-gray-950 hover:text-white
               "
              >
                Your Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
