"use client";

import Image from "next/image";
import { amenitiesCategories } from "../data/amenities-data";

export default function AmenitiesPage() {
  return (
    <section className="lg:pb-12 bg-gray-50">
      <div className="container-fluid">
        {/* =============== Heading ==================== */}

        <div className="text-center my-5 lg:my-10">
          <p className="text-2xl md:text-4xl font-semibold text-gray-700 tracking-wide pb-1 lg:pb-2">
            Amenities
          </p>

          <p className="text-sm md:text-lg text-gray-500">
            Discover comfort, luxury, and premium facilities designed to make
            your stay unforgettable at The Pushpa Heritage.
          </p>
          <div className="w-20 h-0.5 bg-green-800 mx-auto mt-3"></div>
        </div>

        {amenitiesCategories.map((category) => (
          <div key={category.id} className="mb-16 ">
            <p className="text-2xl font-semibold mb-6 border-l-4 border-black pl-4">
              {category.name}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full z-20">
                    {item.title}
                  </div>
                  <div className="grid grid-cols-3 gap-1 h-44 overflow-hidden">
                    {item.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-full h-full overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5">
                    <p className="font-semibold text-lg mb-2 line-clamp-2">
                      {item.title}
                    </p>

                    {/* ========= Rating =========   */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-black">
                        {item.rating.toFixed(1)}
                      </span>
                      <span className="text-yellow-500 text-base">★★★★★</span>
                      <span className="text-gray-500 text-xs">
                        Luxury Rated
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
