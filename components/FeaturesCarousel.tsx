import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import { ReactNode } from "react";

type FeatureItem = {
  icon: ReactNode;
  title: string;
};

type FeaturesCarouselProps = {
  features: FeatureItem[];
};

export default function FeaturesCarousel({ features }: FeaturesCarouselProps) {
  return (
    <div className="relative">
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
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
