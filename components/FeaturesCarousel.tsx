"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type FeatureItem = {
  icon: string; //  image path
  title: string;
};

type FeaturesCarouselProps = {
  features: FeatureItem[];
};

export default function FeaturesCarousel({ features }: FeaturesCarouselProps) {
  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="w-full overflow-hidden"
      >
        {/* Padding creates 2.5 / 4.5 card illusion */}
        <CarouselContent className="-ml-4 pl-0 pr-[20%] sm:pr-[16%] md:pr-[11%]">
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
                  <div className="relative w-10 h-10">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      sizes="40px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>

                  <p className="text-sm font-medium text-center">
                    {item.title}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
