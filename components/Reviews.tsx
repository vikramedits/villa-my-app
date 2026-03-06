"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FcGoogle } from "react-icons/fc";
import { Quote, User } from "lucide-react";
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

/* ======================
   FEATURED REVIEW
====================== */

const FEATURED_REVIEW = {
  text: "Had an amazing time staying at this beautiful villa. Everything from the spacious rooms to the peaceful surroundings made the stay memorable. The pool, garden and interiors were very well maintained. It truly felt like a private luxury retreat for our family vacation.",
  name: "Mahendra Singh",
  meta: ["Family Stay", "Mumbai"],
  rating: 5,
};

/* ======================
   SMALL REVIEW CARD
====================== */

function ReviewCard({ review }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 h-full flex flex-col transition hover:-translate-y-1 hover:shadow-xl">
      <StarRating rating={review.rating} />

      <p className="text-sm text-gray-700 leading-relaxed mt-3 flex-1">
        {review.text}
      </p>

      <div className="mt-6 border-t pt-4 flex items-center gap-3">
        <User size={18} className="text-gray-500" />
        <div>
          <p className="text-sm font-medium text-gray-900">{review.name}</p>
          <p className="text-xs text-gray-500">{review.meta.join(" • ")}</p>
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
    <section className="py-14 md:py-28 bg-white border-y border-gray-200" id="reviews">
      <div className="max-w-7xl mx-auto px-4">
        {/* ===== Google Reviews Badge ===== */}

        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3 bg-black text-white px-5 py-2 rounded-full text-sm tracking-widest">
            <FcGoogle className="w-5 h-5" />
            Google Reviews
            <span className="flex items-center gap-1 ml-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs text-red-400">LIVE</span>
            </span>
          </div>
        </div>

        {/* ===== Heading ===== */}

        <h2 className="text-2xl md:text-5xl font-ubuntu font-extralight tracking-wide text-center text-gray-800 mb-8 md:mb-14">
          What our guests remember
        </h2>

        {/* ===== Featured Review ===== */}

        <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-2xl p-10 md:p-14 mb-10 md:mb-20">
          <Quote className="text-gray-300 mb-6" size={36} />

          <StarRating rating={FEATURED_REVIEW.rating} />

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
            {FEATURED_REVIEW.text}
          </p>

          <div className="mt-8 border-t pt-6 flex items-center gap-3">
            <User size={20} className="text-gray-500" />

            <div>
              <p className="font-medium text-gray-900">
                {FEATURED_REVIEW.name}
              </p>

              <p className="text-sm text-gray-500">
                {FEATURED_REVIEW.meta.join(" • ")}
              </p>
            </div>
          </div>
        </div>

        {/* ===== Scroll Indicator ===== */}
        <div className="text-center text-sm text-gray-500 mt-4 mb-6 animate-bounce">
          More guest reviews ↓
        </div>

        {/* ===== Mobile Horizontal Scroll ===== */}

        <div className="md:hidden flex gap-4 overflow-x-auto pb-4">
          {REVIEWS.map((review) => (
            <div key={review.id} className="min-w-[85%]">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* ===== Desktop Slider ===== */}

        <div className="hidden md:block">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 2 },
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

        {/* ===== CTA ===== */}

        <div className="text-center mt-8 md:mt-16">
          <Link
            href="#"
            className="text-sm tracking-widest border-b border-black pb-1 hover:text-green-700 transition"
          >
            VIEW ALL REVIEWS →
          </Link>
        </div>
      </div>
    </section>
  );
}
