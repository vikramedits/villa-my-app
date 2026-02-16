"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import Link from "next/link";
import StarRating from "./StarRating";

/* =======================
   REVIEWS DATA
======================= */
const REVIEWS = [
  {
    id: 1,
    text: "Our stay at this private villa was absolutely wonderful. The place was very clean, peaceful, and beautifully maintained. It felt like a perfect escape from daily routine. The rooms were spacious, the surroundings were calm, and the privacy made the vacation even more special. The staff/host was very supportive and always available when needed. Truly a memorable vacation and I would love to visit again. Highly recommended! 🌿✨.",
    name: "RONY MODI",
    meta: ["Family stay", "Verified", "Gujarat"],
    rating: 5.0,
  },
  {
    id: 2,
    text: "This villa feels luxurious with spacious rooms ,natural scenery all around. Additionally it's the epitome of lavishness ,elegant design even I loved the services as they properly maintained it. Overall the location is absolutely full of serene. From my personal experience, it's a premium villa that's comfortable , well-designed and worth it!😇",
    name: "Karishma Kunwar",
    meta: ["Friends", "Premium", "Rajasthan"],
    rating: 4.9,
  },
  {
    id: 3,
    text: "Why should we book a villa from the very far diatance from lake pichola or any good location. Because we need to get the private services. But Staff was 50% helpful. They say yes, we help you but when we need help they slept at that time. We 12 people can give only 2.5 stars. Staff was not changing the bed sheets in every half day as we already said them to change the bed sheets. Another thing., villa is constructed very great. We give 5 out of 5 stars to contractor or a builder. Practically great constructed. 👌",
    name: "Dhaval Patel",
    meta: ["Business", "Verified", "Gujarat"],
    rating: 4.8,
  },
  {
    id: 4,
    text: "Amazing villa, just loved every bit of it. The interiors are too good. The staff & the chef were too good. The food was truly excellent ♥️👌🏻 A must visit for everyone ♥️",
    name: "Nancy D",
    meta: ["Friends", "Repeat guest", "Gujarat"],
    rating: 5,
  },
  {
    id: 5,
    text: "Best property for family, batchelors and friends. entire property cleaning in very good.pool and garden are also net and clean.polite and responsive staff.zomato and Swiggy both available at this place. Great party enjoy without in distubunse.power backup also available in this place. Over all worth money for this place.. Go for it without any dout.",
    name: "Vishal Patel",
    meta: ["Couples", "verified", "Gujarat"],
    rating: 4.9,
  },
  {
    id: 6,
    text: "Had an amazing time staying at The Pushpa Heritage! It’s a beautiful 7BHK fully furnished villa with everything you need for a comfortable and fun stay. The garden is lovely, the swimming pool is clean and relaxing, and there’s enough parking space too. The rooms are spacious and nicely maintained. It really felt like a home away from home. We went with family and everyone had a great time. Whether it was chilling by the pool, spending time in the garden, or just relaxing indoors – everything was perfect. I’d definitely recommend this place to anyone looking for a peaceful and enjoyable villa stay. Would love to come back again!",
    name: "Mahendra Singh",
    meta: ["Friends", "Verified", "Mumbai"],
    rating: 5.0,
  },
];

/* =======================
   REVIEW CARD
======================= */
function ReviewCard({ review }: any) {
  return (
    <div className=" w-5/6 sm:w-4/5 md:w-full h-96 shrink-0 rounded-lg bg-white/70 backdrop-blur-xl border border-white/40 p-6 flex flex-col shadow-xs mb-2 ">
      <div className="text-6xl leading-none text-black/30 font-serif mb-1">
        “
      </div>

      <div className="flex-1 text-sm text-gray-700 shadow-inner rounded-lg px-2 py-2 leading-relaxed italic overflow-y-auto pr-1">
        {review.text}
      </div>

      <div className="mt-4  px-2 py-3 bg-purple-100 rounded-lg">
        <div className="">
          <p className="text-sm font-medium text-gray-900">{review.name}</p>
          <p className="text-xs text-gray-500">{review.meta.join(" → ")}</p>
        </div>

        <div className="my-3 h-px bg-black/10 w-full" />

        <StarRating rating={review.rating} />
      </div>
    </div>
  );
}

/* =======================
   MAIN SECTION
======================= */
export default function LuxuryReviewsSection() {
  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* ============ Background  =============== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-105 md:w-full h-105 bg-indigo-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -right-40 w-105 md:w-full h-105 bg-purple-500/10 rounded-full blur-[140px]" />
      </div>

      {/* =========== Content ============ */}
      <div className="container-fluid relative">
        <div className="mb-10 md:mb-16">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              {/* Google Icon */}
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white">
                <span className="text-sm font-bold text-blue-500 border-2 border-blue-500 rounded-full px-1.5">G</span>
              </div>

              {/* Google Reviews + LIVE */}
              <p className="flex items-center gap-2 text-sm md:text-base tracking-widest text-black/60 uppercase">
                Google Reviews
                {/* LIVE badge */}
                <span className="relative flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-red-400 animate-live">
                    LIVE
                  </span>
                </span>
              </p>
            </div>
            <Link
              href={""}
              className="text-black bg-white py-2 px-4 rounded-full text-sm md:text-base font-medium uppercase tracking-wide"
            >
              View All
            </Link>
          </div>

          <p className="mt-3 text-xl md:text-4xl font-light text-gray-600">
            What our guests remember
          </p>
        </div>

        {/* ============== MOBILE — Horizontal Scroll ======================= */}
        <div className="md:hidden overflow-x-auto w-full">
          <div className="flex gap-2">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* ================ DESKTOP — Swiper ==================== */}
        <div className="hidden md:block relative z-20 overflow-hidden">
          <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={5}
            spaceBetween={24}
            grabCursor
            className="overflow-visible!"
          >
            {REVIEWS.map((review) => (
              <SwiperSlide
                key={review.id}
                className="flex justify-center w-full"
              >
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
