"use client";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CalendarCheck } from "lucide-react";
// import { useEffect, useState } from "react";

export default function Hero() {
  //   const text = "Choose Your Package In Just a Few Steps";
  //   const [displayText, setDisplayText] = useState("");
  //   const [index, setIndex] = useState(0);
  //   const [isDeleting, setIsDeleting] = useState(false);

  //   useEffect(() => {
  //     const typingSpeed = isDeleting ? 0 : 40;
  //     const pauseAfterComplete = 1600;

  //     const timeout = setTimeout(() => {
  //       if (!isDeleting && index < text.length) {
  //         setDisplayText(text.slice(0, index + 1));
  //         setIndex(index + 1);
  //       } else if (!isDeleting && index === text.length) {
  //         setTimeout(() => setIsDeleting(true), pauseAfterComplete);
  //       } else if (isDeleting && index > 0) {
  //         setDisplayText(text.slice(0, index - 1));
  //         setIndex(index - 1);
  //       } else if (isDeleting && index === 0) {
  //         setIsDeleting(false);
  //       }
  //     }, typingSpeed);

  //     return () => clearTimeout(timeout);
  //   }, [index, isDeleting, text]);
  return (
    <section className="items-center">
      <div className=" mx-auto shadow-md overflow-hidden bg-white">
        <div className="relative h-[45vh] md:h-[55vh]">
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
            <div className="flex-1 flex items-center justify-center">
              <h1
                className="text-2xl md:text-4xl font-bold text-white leading-tight
               opacity-0 translate-y-6 animate-fadeUp"
              >
                Choose Your Package In Just a Few Steps
              </h1>
            </div>

            <div className="pb-8 flex justify-center mt-2">
              <Link
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
