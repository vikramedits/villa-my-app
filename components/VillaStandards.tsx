import Image from "next/image";
import FeaturesCarousel from "./FeaturesCarousel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SingleImage = {
  type: "single";
  src: string;
  alt: string;
  title: string;
  buttonText: string;
  href: string;
};

type StackImageItem = {
  src: string;
  alt: string;
  title: string;
  buttonText: string;
  href: string;
};

type StackImage = {
  type: "stack";
  images: StackImageItem[];
  height: string;
};

type VillaImage = SingleImage | StackImage;

const features = [
  { icon: "/homenew/icons/games.png", title: "Games & Recreation" },
  { icon: "/homenew/icons/garden.png", title: "Two Big Gardens" },
  { icon: "/homenew/icons/entrance.png", title: "3 Entrance" },
  {
    icon: "/homenew/icons/celebrations.png",
    title: "Personalised Celebrations",
  },
  { icon: "/homenew/icons/caretaker.png", title: "Caretaker Onsite" },
  { icon: "/homenew/icons/chef.png", title: "In-house Chef" },
  { icon: "/homenew/icons/local-experiences.png", title: "Local Experiences" },
  { icon: "/homenew/icons/pool.png", title: "Private Pool" },
  { icon: "/homenew/icons/butler-service.png", title: "Butler Service" },
  { icon: "/homenew/icons/seatings.png", title: "Indoor OutDoor Seating" },
];

const villaImages: VillaImage[] = [
  {
    type: "single", // left
    src: "/homenew/standard/standard-1.jpeg",
    title: "Images & Videos",
    buttonText: "View all",
    alt: "Villa Pool",
    href: "/gallery",
  },
  {
    type: "stack", // middle 2 images
    images: [
      {
        src: "/homenew/standard/standard-2.jpeg",
        title: "Things To Know",
        buttonText: "View all",
        alt: "Dining",
        href: "/blog",
      },
      {
        src: "/homenew/standard/Room-home-image.jpeg",
        title: "Rooms",
        buttonText: "View all",
        alt: "Bedroom",
        href: "/rooms",
      },
    ],
    height: "h-105",
  },
  {
    type: "single", // right
    src: "/homenew/standard/standard-10.jpeg",
    title: "Amenities",
    buttonText: "View all",
    alt: "Celebration",
    href: "/amenities",
  },
];

export default function VillaExperienceStandard() {
  return (
    <section className="bg-gray-100 pb-8 md:pb-10 border-b border-gray-200">
      <div className="container-fluid pt-5 md:pt-10">
        {/* Heading */}
        <div className="py-3 md:py-6 ">
          <p className="text-lg md:text-2xl font-ubuntu font-bold md:font-medium tracking-wide text-gray-950 border-l-4 border-black pl-2">
            Our Prestige
          </p>
          <p className="text-xs md:text-base mt-2 text-gray-600 tracking-wide">
            Signature experiences crafted to make every stay effortless &
            memorable
          </p>
        </div>
        <FeaturesCarousel features={features} />
        <div className="mt-5 md:mt-8 flex md:grid md:grid-cols-3 gap-2 overflow-x-auto md:overflow-x-visible">
          {villaImages.map((item, index) => {
            // =================== Single large images (left/right) ======================
            if (item.type === "single") {
              return (
                <div
                  key={index}
                  className="shrink-0 w-72 md:w-auto relative h-105 rounded-sm overflow-hidden snap-start"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/5 to-transparent"></div>

                  <Link
                    href={item.href}
                    className="group absolute bottom-4 left-4 right-4 flex items-center justify-between text-white "
                  >
                    {/* Title */}
                    <span className="text-lg md:text-xl font-semibold">
                      {item.title}
                    </span>

                    {/* Explore CTA */}
                    <span
                      className="flex items-center gap-2 text-sm font-medium 
                                       translate-x-4 
                                      transition-all duration-300  text-white
                                      group-hover:opacity-100 group-hover:translate-x-0 mr-3"
                    >
                      Explore
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              );
            }

            // Middle stacked images
            if (item.type === "stack") {
              return (
                <div
                  key={index}
                  className={`shrink-0 w-72 md:w-auto ${item.height} grid grid-rows-2 gap-2 snap-start`}
                >
                  {item.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-sm overflow-hidden row-span-1"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/5 to-transparent"></div>

                      <Link
                        href={img.href}
                        className="group absolute bottom-4 left-4 right-4 flex items-center justify-between text-white "
                      >
                        {/* Title */}
                        <span className="text-lg md:text-xl font-semibold">
                          {img.title}
                        </span>

                        {/* Explore CTA */}
                        <span
                          className="flex items-center gap-2 text-sm font-medium 
                                       translate-x-4 
                                      transition-all duration-300  text-white
                                      group-hover:opacity-100 group-hover:translate-x-0 mr-3"
                        >
                          Explore
                          <ArrowRight size={16} />
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
}
