"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import "swiper/css";
import Link from "next/link";

/* ================= DATA ================= */
const DATA = {
  lakes: [
    {
      name: "Fateh Sagar Lake",
      image: "/homenew/lake/fatehsagar.jpg",
      distance: "5 km",
      time: "12 min drive",
      href: "",
    },
    {
      name: "Lake Pichola",
      image: "/homenew/lake/pichola.jpg",
      distance: "8 km",
      time: "20 min drive",
      href: "",
    },
    {
      name: "Lake Govardhan",
      image: "/homenew/lake/govardhan-sagar.jpg",
      distance: "18 km",
      time: "20 min drive",
      href: "",
    },
    {
      name: "Badi Lake",
      image: "/homenew/lake/badi-lake.jpg",
      distance: "2 km",
      time: "5 min drive",
      href: "",
    },
    {
      name: "Bahubali Hills",
      image: "/homenew/lake/bahubali-hills.jpg",
      distance: "2 km",
      time: "5 min drive",
      href: "",
    },
  ],
  spiritual: [
    {
      name: "Neemach Mata Temple",
      image: "/images/nearby/neemach-mata.jpg",
      distance: "6 km",
      time: "15 min drive",
      href: "",
    },
    {
      name: "Karni Mata Temple",
      image: "/images/nearby/karni-mata.jpg",
      distance: "9 km",
      time: "22 min drive",
      href: "",
    },
    {
      name: "Maha-Kaleshwar Temple",
      image: "/images/nearby/karni-mata.jpg",
      distance: "9 km",
      time: "22 min drive",
      href: "",
    },
    {
      name: "Jagdish Temple",
      image: "/images/nearby/karni-mata.jpg",
      distance: "9 km",
      time: "22 min drive",
      href: "",
    },
    {
      name: "Bohra Ganesh Ji Temple",
      image: "/images/nearby/karni-mata.jpg",
      distance: "9 km",
      time: "22 min drive",
      href: "",
    },
  ],
  attractions: [
    {
      name: "Pratap Gaurav Kendra",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "4 km",
      time: "10 min drive",
      href: "",
    },
    {
      name: "Biological Park",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "6 km",
      time: "10 min drive",
      href: "",
    },
    {
      name: "Sajjangarh Fort",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "6 km",
      time: "10 min drive",
      href: "",
    },
    {
      name: "City Palace",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "8 km",
      time: "10 min drive",
      href: "",
    },
    {
      name: "Fulon Ki Ghati",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "10 km",
      time: "15 min drive",
      href: "",
    },
  ],
};

export default function NearByLocations() {
  const [activeTab, setActiveTab] = useState<keyof typeof DATA>("lakes");

  return (
    <section className="container-fluid">
      <div className="py-8 md:py-6">
        {/* ================= Heading ================= */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950">
            Nearby Locations
          </h2>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
            Explore beautiful places near our villa
          </p>
        </div>

        {/* ================= Tabs ================= */}
        <div className="flex justify-center gap-2 md:gap-3 mb-5 md:mb-8 overflow-x-auto ">
          {[
            { key: "lakes", label: "Lakes & Nature" },
            { key: "spiritual", label: "Spiritual" },
            { key: "attractions", label: "Attractions" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as keyof typeof DATA)}
              className={`px-5 py-2 rounded-sm whitespace-nowrap text-sm font-medium border transition
                ${
                  activeTab === tab.key
                    ? "bg-primaryBlue text-white border-primaryBlue"
                    : "bg-white text-black hover:border-primaryBlue"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= Swiper ================= */}
        <Swiper
          slidesPerView={1.2} // mobile
          spaceBetween={8}
          breakpoints={{
            1024: {
              slidesPerView: 4.5, // desktop
            },
          }}
          className="overflow-visible"
        >
          {DATA[activeTab].map((place, index) => (
            <SwiperSlide key={index}>
              <Link
                href={place.href}
                className="block h-full rounded-sm bg-white overflow-hidden
             shadow-md hover:shadow-xl transition-shadow duration-300 mb-2 md:mb-4"
              >
                {/* ---------- Image ---------- */}
                <div className="relative h-64 w-full">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* ---------- Content ---------- */}
                <div className="px-2 py-2 md:px-4 md:py-4">
                  <h4 className="font-semibold text-lg text-primaryBlue">
                    {place.name}
                  </h4>

                  <div className="flex gap-4 text-sm text-gray-600 mt-1">
                    <span>📏 {place.distance}</span>
                    <span>⏱️ {place.time}</span>
                  </div>
                </div>

                <p className="pr-4 pb-4 text-right text-green-700 font-medium">
                  Get Directions →
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
