"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import { ReactNode } from "react";

type FeatureItem = {
  icon: string; //  image path
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
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {features.map((item, index) => (
            <CarouselItem
              key={index}
              className=" basis-[40%] /* mobile → 2.5 cards */ sm:basis-1/3  /* tablet → 3 cards */ md:basis-[22.22%] /* desktop → 4.5 cards */ " >
              <Card className="h-full text-center hover:shadow-md transition">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-sm font-medium">{item.title}</p>
                </CardContent>

                {/* Bottom Text Background */}
                <div className="absolute bottom-0 left-0 w-full bg-blue-50 py-2 flex justify-center">
                  <p className="text-sm font-medium text-center truncate px-2">
                    {item.title}
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
