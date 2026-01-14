import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import FeaturesCarousel from "./FeaturesCarousel";

const features = [
  { icon: "🥂", title: "Personalised Celebrations" },
  { icon: "🧑‍💼", title: "Caretaker Onsite" },
  { icon: "👨‍🍳", title: "In-house Chef" },
  { icon: "🚙", title: "Local Experiences" },
  { icon: "🏊", title: "Private Pool" },
  { icon: "🤵", title: "Butler Service" },
  { icon: "🎲", title: "Games & Recreation" },
  { icon: "🏊", title: "Private Pool" },
  { icon: "🤵", title: "Butler Service" },
  { icon: "🎲", title: "Games & Recreation" },
];

export default function VillaExperienceStandard() {
  return (
    <section className="bg-gray-100">
      <div className="container-fluid pt-5 md:pt-10">
        {/* Heading */}
        <div className="mb-3 md:mb-6">
          <h2 className="text-lg md:text-2xl font-medium tracking-wide text-primaryBlue">
            The Villa Standard
          </h2>
          <p className="text-xs md:text-base mt-1 tracking-wider">
            Signature experiences crafted to make every stay effortless &
            memorable
          </p>
        </div>
        <FeaturesCarousel features={features} />

        {/* Image Grid (BOTTOM) */}
        <div className="mt-3 md:mt-6 flex md:grid md:grid-cols-3 gap-2 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory">
          {/* Left Tall Image */}
          <div className="shrink-0 w-72 md:w-auto relative h-105 rounded-sm overflow-hidden snap-start">
            <Image
              src="/homenew/standard/standard-1.jpeg"
              alt="Villa Pool"
              fill
              className="object-cover"
            />
          </div>

          {/* Middle Two Images */}
          <div className="shrink-0 w-72 md:w-auto grid grid-rows-2 gap-2 snap-start">
            <div className="relative h-50 rounded-sm overflow-hidden">
              <Image
                src="/homenew/standard/standard-2.jpeg"
                alt="Dining"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-50 rounded-sm overflow-hidden">
              <Image
                src="/homenew/standard/standard-5.jpeg"
                alt="Bedroom"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Wide Image */}
          <div className="shrink-0 w-72 md:w-auto relative h-105 rounded-sm overflow-hidden snap-start">
            <Image
              src="/homenew/standard/standard-10.jpeg"
              alt="Celebration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
