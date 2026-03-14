"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FcGoogle } from "react-icons/fc";
import { User } from "lucide-react";
import Link from "next/link";
import StarRating from "./StarRating";

/* ======================
   REVIEWS DATA
====================== */
const REVIEWS = [
  {
    id: 1,
    text: "Our stay at this private villa was absolutely wonderful. The place was very clean, peaceful, and beautifully maintained. It felt like a perfect escape from daily routine.",
    name: "Rony Modi",
    meta: ["Family Stay", "Verified", "Gujarat"],
    rating: 5,
  },
  {
    id: 2,
    text: "This villa feels luxurious with spacious rooms and natural scenery all around. The services were excellent and the location is peaceful and relaxing.",
    name: "Karishma Kunwar",
    meta: ["Friends", "Premium", "Rajasthan"],
    rating: 4.9,
  },
  {
    id: 3,
    text: "The villa construction and architecture is amazing. The rooms are spacious and the property feels very premium.",
    name: "Dhaval Patel",
    meta: ["Business", "Verified", "Gujarat"],
    rating: 4.8,
  },
  {
    id: 4,
    text: "Amazing villa, loved every bit of it. The interiors are beautiful and the staff were very helpful. Food was excellent.",
    name: "Nancy D",
    meta: ["Friends", "Repeat Guest", "Gujarat"],
    rating: 5,
  },
  {
    id: 5,
    text: "Best property for family and friends. Pool and garden are very clean. Staff is polite and responsive.",
    name: "Vishal Patel",
    meta: ["Couples", "Verified", "Gujarat"],
    rating: 4.9,
  },
];

const FEATURED_REVIEW = {
  text: "Had an amazing time staying at this beautiful villa. Everything from the spacious rooms to the peaceful surroundings made the stay memorable. The pool, garden and interiors were very well maintained. It truly felt like a private luxury retreat for our family vacation.",
  name: "Mahendra Singh",
  meta: ["Family Stay", "Mumbai"],
  rating: 5,
};

/* ======================
   REVIEW CARD
====================== */
function ReviewCard({ review }: any) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-6 w-full h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-amber-200 transition-all duration-300">
      {/* Top accent */}
      <div className="w-5 h-0.5 bg-amber-600 mb-4 group-hover:w-8 transition-all duration-300" />

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text — flex-1 pushes footer to bottom */}
      <p className="text-sm text-gray-500 leading-7 mt-3 flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
          <User size={14} className="text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{review.name}</p>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-0.5">
            {review.meta.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ======================
   MAIN COMPONENT
====================== */
export default function LuxuryReviewsSection() {
  return (
    <section className="py-16 md:py-28 bg-stone-50 border-y border-stone-200" id="reviews">

      {/*
        Key fix for equal-height Swiper cards:
        .swiper-wrapper { display: flex; align-items: stretch; }
        .swiper-slide   { display: flex; height: auto; }
        Done via Tailwind arbitrary variants on the wrapper div.
      */}

      <div className="max-w-7xl mx-auto px-4">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-stone-200 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest text-stone-500 mb-5 shadow-sm">
              <FcGoogle className="w-4 h-4" />
              Google Reviews
              <span className="flex items-center gap-1.5 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600 font-semibold">Live</span>
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-light text-stone-900 leading-snug tracking-wide">
              What our guests
              <span className="block text-amber-700 font-normal">remember</span>
            </h2>
          </div>

          {/* Score pill */}
          <div className="inline-flex items-center gap-5 bg-white border border-stone-200 rounded-2xl px-7 py-4 shadow-sm self-start">
            <div className="text-center">
              <p className="text-4xl font-light text-stone-900 leading-none tabular-nums">4.9</p>
              <div className="mt-1.5">
                <StarRating rating={4.9} />
              </div>
              <p className="text-[10px] text-stone-400 tracking-widest uppercase mt-1.5">Rating</p>
            </div>
            <div className="w-px h-10 bg-stone-200" />
            <div className="text-center">
              <p className="text-4xl font-light text-stone-900 leading-none">50+</p>
              <p className="text-[10px] text-stone-400 tracking-widest uppercase mt-2">Reviews</p>
            </div>
          </div>
        </div>

        {/* ── Featured review (dark card) ── */}
        <div className="relative mb-12 md:mb-20">
          <span
            className="absolute -top-5 left-0 text-9xl md:text-[10rem] text-stone-200 leading-none select-none pointer-events-none font-light"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <div className="relative bg-stone-900 rounded-2xl md:rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="relative md:flex md:items-center md:gap-12">
              <div className="flex-1">
                <div className="w-7 h-px bg-amber-500 mb-5" />
                <StarRating rating={FEATURED_REVIEW.rating} />
                <p className="text-base md:text-xl text-stone-200 font-light leading-8 md:leading-9 mt-4">
                  &ldquo;{FEATURED_REVIEW.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 md:mt-0 md:shrink-0 md:text-right">
                <div className="flex items-center md:justify-end gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0">
                    <User size={15} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-100">{FEATURED_REVIEW.name}</p>
                    <p className="text-[10px] text-stone-500 tracking-widest uppercase mt-0.5">
                      {FEATURED_REVIEW.meta.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section divider ── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-stone-200" />
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-stone-400 shrink-0">
            More guest stories
          </p>
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        {/* ── Mobile: snap scroll ── */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {REVIEWS.map((review) => (
              <div key={review.id} className="min-w-[82vw] snap-start">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop: Swiper equal-height ──
            Critical classes on wrapper:
            [&_.swiper-slide]:flex        → each slide is flex container
            [&_.swiper-slide]:h-auto      → height determined by content row
            [&_.swiper-wrapper]:items-stretch → all slides stretch to tallest
        ── */}
        <div className="hidden md:block
          [&_.swiper-slide]:flex
          [&_.swiper-slide]:h-auto
          [&_.swiper-wrapper]:items-stretch
          [&_.swiper-button-prev]:!w-9
          [&_.swiper-button-prev]:!h-9
          [&_.swiper-button-prev]:!bg-stone-900
          [&_.swiper-button-prev]:!rounded-full
          [&_.swiper-button-prev]:after:!text-[10px]
          [&_.swiper-button-prev]:after:!font-black
          [&_.swiper-button-prev]:after:!text-white
          [&_.swiper-button-next]:!w-9
          [&_.swiper-button-next]:!h-9
          [&_.swiper-button-next]:!bg-stone-900
          [&_.swiper-button-next]:!rounded-full
          [&_.swiper-button-next]:after:!text-[10px]
          [&_.swiper-button-next]:after:!font-black
          [&_.swiper-button-next]:after:!text-white
          [&_.swiper-button-disabled]:!opacity-20
        ">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4500, disableOnInteraction: true, pauseOnMouseEnter: true }}
            spaceBetween={16}
            breakpoints={{
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── CTA ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 md:mt-16 pt-8 border-t border-stone-200">
          <p className="text-sm text-stone-500 font-light">
            Join{" "}
            <span className="text-stone-800 font-semibold">50+ families</span>{" "}
            who chose The Pushpa Heritage
          </p>
          <Link
            href="#"
            className="group inline-flex items-center gap-2 bg-stone-900 hover:bg-amber-700 text-white px-6 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-300"
          >
            <FcGoogle className="w-4 h-4" />
            View all reviews
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}