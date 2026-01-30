"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

/* ===== SWIPER (DESKTOP) ===== */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

/* ===== TYPES ===== */
type FeatureItem = {
  icon: string;
  title: string;
};

type FeaturesCarouselProps = {
  features: FeatureItem[];
};

export default function FeaturesCarousel({ features }: FeaturesCarouselProps) {
  return (
    <div className="container-fluid">

      {/* ================= MOBILE / TABLET ================= */}
      <div className="md:hidden overflow-x-auto">
        <div className="flex gap-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="shrink-0 w-40" // 2.2 cards
            >
              <Card className="relative h-42 text-center shadow-sm">
                <CardContent className="p-4 flex items-center justify-center h-full">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={64}
                    height={64}
                  />
                </CardContent>

                <div className="absolute bottom-0 left-0 w-full bg-blue-50 py-2">
                  <p className="text-sm font-medium text-center truncate px-2">
                    {item.title}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP (SWIPER) ================= */}
      <div className="hidden md:block">
        <Swiper
          modules={[Navigation, Mousewheel]}
          slidesPerView={5.5}
          spaceBetween={16}
          navigation
          grabCursor
          mousewheel={{ forceToAxis: true }}
          speed={600}
          className="pb-2"
        >
          {features.map((item, index) => (
            <SwiperSlide key={index}>
              <Card
                className="group relative h-45 text-center
                transition-all duration-300 ease-out
                hover:shadow-lg hover:-translate-y-0.5"
              >
                <CardContent className="p-4 flex items-center justify-center h-full">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={72}
                    height={72}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </CardContent>

                <div className="absolute bottom-0 left-0 w-full bg-blue-50 py-2">
                  <p className="text-sm font-medium text-center truncate px-2">
                    {item.title}
                  </p>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
}
