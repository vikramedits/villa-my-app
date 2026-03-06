"use client";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function Hero() {
  return (
    <section className="items-center">
      <div className=" mx-auto shadow-md overflow-hidden bg-white">
        <div className="relative h-[55vh] lg:h-[70vh]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/homenew/video-one.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/5"></div>

          <div className="relative z-10 h-full flex flex-col justify-between text-center px-4 ">
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-2xl md:text-4xl font-bold text-green-700 leading-tight
               opacity-0 translate-y-6 animate-fadeUp tracking-wider font-ubuntu">Hello!</p>
              <p
                className="text-2xl md:text-4xl font-bold font-ubuntu text-white leading-tight tracking-wider
               opacity-0 translate-y-6 animate-fadeUp"
              >
                Book Your Stay in Minutes.
              </p>
            </div>

            <div
              className="
                           pb-8 mt-2
                           lg:pb-0 lg:mt-0
                           lg:absolute lg:top-6 lg:left-18
                           lg:text-left
                         "
            >
              <Link
                href="/check-booking"
                className="group inline-flex items-center gap-2
               bg-white text-gray-950
               px-8 py-3 rounded-full font-medium
               transition-all duration-300 ease-out font-barlow
               hover:bg-gray-950 hover:text-white border border-black/50
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
