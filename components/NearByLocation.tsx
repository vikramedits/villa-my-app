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
      name: "Badi Lake",
      image: "/images/nearby/badi-lake.jpg",
      distance: "2 km",
      time: "5 min drive",
      href:""
    },
    {
      name: "Bahubali Hills",
      image: "/images/nearby/bahubali-hills.jpg",
      distance: "2 km",
      time: "5 min drive",
      href:""
    },
    {
      name: "Fateh Sagar Lake",
      image: "/images/nearby/fateh-sagar.jpg",
      distance: "5 km",
      time: "12 min drive",
      href:""
    },
    {
      name: "Lake Pichola",
      image: "/images/nearby/pichola.jpg",
      distance: "8 km",
      time: "20 min drive",
      href:""
    },
     {
      name: "Lake Govardhan",
      image: "/images/nearby/pichola.jpg",
      distance: "18 km",
      time: "20 min drive",
      href:""
    },
  ],
  spiritual: [
    {
      name: "Neemach Mata Temple",
      image: "/images/nearby/neemach-mata.jpg",
      distance: "6 km",
      time: "15 min drive",
      href:""
    },
    {
      name: "Karni Mata Temple",
      image: "/images/nearby/karni-mata.jpg",
      distance: "9 km",
      time: "22 min drive",
      href:""
    },
    {
      name: "Maha-Kaleshwar Temple",
      image: "/images/nearby/karni-mata.jpg",
      distance: "9 km",
      time: "22 min drive",
      href:""
    },
    {
      name: "Jagdish Temple",
      image: "/images/nearby/karni-mata.jpg",
      distance: "9 km",
      time: "22 min drive",
      href:""
    },
    {
      name: "Bohra Ganesh Ji Temple",
      image: "/images/nearby/karni-mata.jpg",
      distance: "9 km",
      time: "22 min drive",
      href:""
    },
  ],
  attractions: [
    {
      name: "Pratap Gaurav Kendra",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "4 km",
      time: "10 min drive",
      href:""
    },
    {
      name: "Biological Park",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "6 km",
      time: "10 min drive",
      href:""
    },
    {
      name: "Sajjangarh Fort",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "6 km",
      time: "10 min drive",
      href:""
    },
    {
      name: "City Palace",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "8 km",
      time: "10 min drive",
      href:""
    },
     {
      name: "Fulon Ki Ghati",
      image: "/images/nearby/pratap-gaurav.jpg",
      distance: "10 km",
      time: "15 min drive",
      href:""
    },
  ],
};

export default function NearByLocations() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof DATA>("lakes");

  return (
    <section className="container-fluid">
      <div className="py-3 md:py-6">

        {/* ================= Heading ================= */}
        <div className="mb-6">
          <h2 className="text-lg md:text-2xl font-medium tracking-wide text-primaryBlue">
            Nearby Attractions
          </h2>
          <p className="text-xs md:text-base mt-1 tracking-wider">
            Explore beautiful places near our villa
          </p>
        </div>

        {/* ================= Tabs ================= */}
        <div className="flex justify-center gap-3 mb-8 overflow-x-auto">
          {[
            { key: "lakes", label: "Lakes & Nature" },
            { key: "spiritual", label: "Spiritual" },
            { key: "attractions", label: "Attractions" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(tab.key as keyof typeof DATA)
              }
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
          slidesPerView={1.2}          // mobile
          spaceBetween={16}
          breakpoints={{
            1024: {
              slidesPerView: 4.5,      // desktop
            },
          }}
          className="overflow-visible"
        >
          {DATA[activeTab].map((place, index) => (
            <SwiperSlide key={index}>
              <Link href={place.href} className="h-full rounded-2xl border bg-white overflow-hidden hover:shadow-xl transition">

                {/* ---------- Image ---------- */}
                <div className="relative h-40 w-full">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* ---------- Content ---------- */}
                <div className="p-5">
                  <h4 className="font-semibold text-lg text-primaryBlue">
                    {place.name}
                  </h4>

                  <div className="flex gap-4 text-sm text-gray-600 mt-3">
                    <span>📏 {place.distance}</span>
                    <span>⏱️ {place.time}</span>
                  </div>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    className="inline-block mt-4 text-green-700 font-medium"
                  >
                    Get Directions →
                  </a>
                </div>

              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
