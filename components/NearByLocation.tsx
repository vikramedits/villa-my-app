"use client";

import { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
type Place = {
  name: string;
  image: string;
  distance: string;
  time: string;
  href: string;
  desc?: string;
};

type DataType = {
  lakes: Place[];
  spiritual: Place[];
  attractions: Place[];
};

/* ================= DATA ================= */
const DATA: DataType = {
  lakes: [
    {
      name: "Fateh Sagar Lake",
      image: "/homenew/lake/fatehsagar-new.jpg",
      distance: "5 km",
      time: "12 min drive",
      href: "",
      desc: "Fateh Sagar Lake is a scenic lake in Udaipur, surrounded by hills and known for boating and beautiful sunsets.",
    },
    {
      name: "Lake Govardhan",
      image: "/homenew/lake/govardhan.jpg",
      distance: "18 km",
      time: "20 min drive",
      href: "",
      desc: "Fateh Sagar Lake is a scenic lake in Udaipur, surrounded by hills and known for boating and beautiful sunsets.",
    },
     {
      name: "Lake Pichola",
      image: "/homenew/lake/pichola-new.jpg",
      distance: "8 km",
      time: "20 min drive",
      href: "",
      desc: "Fateh Sagar Lake is a scenic lake in Udaipur, surrounded by hills and known for boating and beautiful sunsets.",
    },
    {
      name: "Ambrai Ghat",
      image: "/homenew/lake/ambrai-ghat.jpg",
      distance: "8 km",
      time: "15 min drive",
      href: "",
      desc: "Fateh Sagar Lake is a scenic lake in Udaipur, surrounded by hills and known for boating and beautiful sunsets.",
    },
    {
      name: "Badi Lake",
      image: "/homenew/lake/badi-lake-new.jpg",
      distance: "2 km",
      time: "5 min drive",
      href: "",
      desc: "Fateh Sagar Lake is a scenic lake in Udaipur, surrounded by hills and known for boating and beautiful sunsets.",
    },
    {
      name: "Bahubali Hills",
      image: "/homenew/lake/bahubali-hills-new.jpg",
      distance: "2 km",
      time: "5 min drive",
      href: "",
      desc: "Fateh Sagar Lake is a scenic lake in Udaipur, surrounded by hills and known for boating and beautiful sunsets.",
    },
  ],
  spiritual: [
     {
      name: "Jagdish Temple",
      image: "/homenew/spiritual/jagdish-temple.png",
      distance: "9 km",
      time: "22 min drive",
      href: "",
      desc: "",
    },
    {
      name: "Jag Mandir Palace",
      image: "/homenew/spiritual/jag-mandir.jpg",
      distance: "9 km",
      time: "22 min drive",
      href: "",
      desc: "",
    },
    {
      name: "Karni Mata Temple",
      image: "/homenew/spiritual/karni.mata.jpg",
      distance: "9 km",
      time: "22 min drive",
      href: "",
      desc: "",
    },
    {
      name: "Bohra Ganesh Ji Temple",
      image: "/homenew/spiritual/bohara-ganesh-ji.png",
      distance: "9 km",
      time: "22 min drive",
      href: "",
      desc: "",
    },
    {
      name: "Neemach Mata Temple",
      image: "/homenew/spiritual/neemach-mata-mandir.png",
      distance: "6 km",
      time: "15 min drive",
      href: "",
      desc: "",
    },
    {
      name: "Maha-Kaleshwar Temple",
      image: "/homenew/spiritual/mahakaleshwar.png",
      distance: "9 km",
      time: "22 min drive",
      href: "",
      desc: "",
    },
  ],
  attractions: [
    {
      name: "Sajjangarh Fort",
      image: "/homenew/must-visit/palace.jpg",
      distance: "6 km",
      time: "10 min drive",
      href: "",
      desc: "",
    },
    {
      name: "City Palace",
      image: "/homenew/must-visit/city-palace.jpg",
      distance: "8 km",
      time: "10 min drive",
      href: "",
      desc: "",
    },
    {
      name: "Pratap Gaurav Kendra",
      image: "/homenew/must-visit/pratap.png",
      distance: "4 km",
      time: "10 min drive",
      href: "",
      desc: "",
    },
    {
      name: "Biological Park",
      image: "/homenew/must-visit/park.jpg",
      distance: "6 km",
      time: "10 min drive",
      href: "",
      desc: "",
    },
    {
      name: "Fulon Ki Ghati",
      image: "/homenew/must-visit/fulon-ki-ghati.jpg",
      distance: "10 km",
      time: "15 min drive",
      href: "",
      desc: "",
    },
  ],
};

/* =============== Hook: detect mobile =============== */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function NearByLocations() {
  const [activeTab, setActiveTab] = useState<keyof DataType>("lakes");
  const isMobile = useIsMobile();

  const renderCard = (place: Place, index: number) => (
    <Link
      key={index}
      href={place.href}
      className="
                group block h-full overflow-hidden rounded-lg shadow-md
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                mb-3
              "
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-lg"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4">
        <h4 className="text-[15px] font-medium text-black leading-snug tracking-[0.01em]">
          {place.name}
        </h4>

        {place.desc && (
          <p className="mt-1 text-sm text-gray-500 leading-snug line-clamp-2">
            {place.desc}
          </p>
        )}

        <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
          <span>{place.distance}</span>
          <span className="text-gray-400">•</span>
          <span>{place.time}</span>
        </div>

        <div className="mt-3 text-sm font-medium text-gray-800 flex items-center gap-1">
          <span className="opacity-80">Get directions</span>
          <span className="opacity-40 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div
      className="relative bg-[url('/homenew/bg/cloud.bg.jpg')]
               bg-cover bg-center bg-no-repeat"
    >
      <section className="container-fluid">
        <div className="py-8 md:py-10">
          {/* Heading */}
          <div className="mb-4 md:mb-6">
            <p className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950 border-l-4 border-black pl-2">
              Nearby Locations
            </p>
            <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
              Explore beautiful places near our villa
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 md:gap-3 mb-5 md:mb-8 overflow-x-auto">
            {(["lakes", "spiritual", "attractions"] as (keyof DataType)[]).map(
              (key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2 rounded-sm whitespace-nowrap text-sm font-medium border transition
                ${
                  activeTab === key
                    ? "bg-primaryBlue text-white border-primaryBlue"
                    : "bg-white text-black hover:border-primaryBlue"
                }`}
                >
                  {key === "lakes"
                    ? "Lakes & Drive"
                    : key === "spiritual"
                      ? "Spiritual"
                      : "Must Visit"}
                </button>
              ),
            )}
          </div>

          {/* ================= Desktop Swiper ================= */}
          {!isMobile && (
            <Swiper
              modules={[Navigation]}
              slidesPerView={1.2}
              spaceBetween={8}
              navigation // 👈 THIS IS IMPORTANT
              breakpoints={{
                1024: {
                  slidesPerView: 4.5,
                },
              }}
              className="overflow-visible"
            >
              {DATA[activeTab].map((place: Place, index: number) => (
                <SwiperSlide key={index}>
                  {renderCard(place, index)}
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* ================= Mobile Overflow Scroll ================= */}
          {isMobile && (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {DATA[activeTab].map((place, index) => (
                <div key={index} className="min-w-[80%]">
                  {renderCard(place, index)}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
