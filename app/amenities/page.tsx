"use client";

import Image from "next/image";
import { amenitiesCategories } from "../data/amenities-data";

export default function AmenitiesPage() {
  return (
    <div className="w-full px-4 md:px-12 py-12 bg-gray-50">
      {/* Page Heading */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Our Luxury Amenities
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Discover comfort, luxury, and premium facilities designed to make your
          stay unforgettable at The Pushpa Heritage.
        </p>
      </div>

      {/* Categories */}
      {amenitiesCategories.map((category) => (
        <div key={category.id} className="mb-16">
          {/* Category Title */}
          <h2 className="text-2xl font-semibold mb-6 border-l-4 border-black pl-4">
            {category.name}
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                {/* Top-left Badge */}
                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full z-20">
                  {item.title}
                </div>

                {/* Images Section */}
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

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-black">
                      {item.rating.toFixed(1)}
                    </span>
                    <span className="text-yellow-500 text-base">
                      ★★★★★
                    </span>
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
  );
}
