"use client";

import Image from "next/image";
import Link from "next/link";

const REVIEWS = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  image: "/images/review-placeholder.jpg", // replace later
  text: "Amazing stay! The villa was clean, peaceful and perfectly located near major attractions. Highly recommended.",
}));

export default function ReviewsSection() {
  return (
    <section className="bg-red-50 py-8 md:py-12">
      <div className="container-fluid">
        {/* ================= Heading ================= */}
        <div className=" mb-8 md:mb-10">
          <h2 className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950">
            Guest Reviews
          </h2>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
            What our guests say about their stay
          </p>
        </div>

        {/* ================= Reviews Grid ================= */}
        <div className="overflow-x-auto md:overflow-visible">
          <div className="grid grid-rows-2 grid-flow-col auto-cols-[75%] gap-4 pb-4 md:grid-flow-row md:grid-cols-5 md:grid-rows-2 md:auto-cols-auto">
            {REVIEWS.map((review, index) => {
              // Check if this is the last card (10th)
              const isLastCard = index === REVIEWS.length - 1;

              return (
                <div
                  key={review.id}
                  className={`
                    relative border rounded-2xl overflow-hidden transition-all duration-300
                    ${
                      isLastCard
                        ? "bg-black/50 flex items-center justify-center"
                        : "bg-white hover:shadow-lg"
                    }
                  `}
                  style={{ minHeight: isLastCard ? "160px" : undefined }}
                >
                  {!isLastCard ? (
                    <>
                      {/* -------- Top Image -------- */}
                      <div className="relative h-32 w-full">
                        <Image
                          src={review.image}
                          alt="Guest Review"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 70vw, 20vw"
                        />
                      </div>

                      {/* -------- Review Text -------- */}
                      <div className="px-4 pt-6 pb-10 text-xs md:text-sm text-gray-600 leading-relaxed text-center">
                        {review.text}
                      </div>

                      {/* -------- Umbrella Badge -------- */}
                      <div className="absolute left-1/2 top-30 -translate-x-1/2">
                        <div className="w-12 h-6 bg-primaryBlue rounded-t-full flex items-end justify-center">
                          <span className="text-white text-xs font-medium pb-1">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    // -------- LAST CARD TEXT ONLY --------
                    <Link
                      href="/reviews" // yaha link daale
                      className="relative block w-full h-48 md:h-64 overflow-hidden rounded-xl"
                    >
                      {/* Background Image */}
                      <img
                        src="/images/review-bg.jpg" // yaha apni image ka path daale
                        alt="Reviews Background"
                        className="w-full h-full object-cover"
                      />

                      {/* Black Overlay */}
                      <div className="absolute inset-0 bg-black/50"></div>

                      {/* Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h3 className="text-white font-semibold text-lg md:text-xl">
                          50+ Reviews
                        </h3>
                        <p className="text-white/80 text-xs md:text-sm mt-2">
                          Check All
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* -------- CENTER VIEW ALL LINK -------- */}
        <div className="flex justify-center mt-6">
          <Link
            href="/reviews"
            className=" inline-flex items-center gap-2 border-b-4 bg-white border-primaryBlue  text-primaryBlue px-3 md:px-6 py-2 md:py-3 rounded-xl text-sm font-medium hover:bg-black/80 transition    "
          >
            View All Reviews
            <span className="text-sm md:text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
