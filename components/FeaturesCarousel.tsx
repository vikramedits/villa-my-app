"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import Autoplay from "embla-carousel-auto-scroll";
import { ReactNode } from "react";

type FeatureItem = {
  icon: ReactNode;
  title: string;
};

type FeaturesCarouselProps = {
  features: FeatureItem[];
};

export default function FeaturesCarousel({
  features,
}: FeaturesCarouselProps) {
  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        // plugins={[
        //   Autoplay({
        //     speed: 0.8,              
        //     stopOnInteraction: false,
        //     stopOnMouseEnter: true,
        //   }),
        // ]}
        className="w-full overflow-hidden"
      >
        {/* Padding creates 2.5 / 4.5 card illusion */}
        <CarouselContent
          className="
            -ml-4
            pl-[20%]        /* mobile → 2.5 cards */
            sm:pl-[16%]     /* tablet */
            md:pl-[11%]     /* desktop → 4.5 cards */
          "
        >
          {features.map((item, index) => (
            <CarouselItem
              key={index}
              className="
                pl-4
                basis-1/2
                sm:basis-1/3
                md:basis-1/4
              "
            >
              <Card className="h-full text-center transition-transform duration-300 hover:scale-[1.04] will-change-transform">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-sm font-medium">{item.title}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
