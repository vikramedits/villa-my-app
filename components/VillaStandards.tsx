import Image from "next/image";
import FeaturesCarousel from "./FeaturesCarousel";
import Link from "next/link";

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
        title: "Guests Reviews",
        buttonText: "View all",
        alt: "Dining",
        href: "/",
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
          <p className="text-lg md:text-2xl font-bold md:font-medium tracking-wide text-gray-950 border-l-4 border-black pl-2">
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
            // Single large images (left/right)
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
                  <Link
                    href={item.href}
                    className="
                                 absolute bottom-0 left-0 w-full
                                 text-white
                                 px-5 pb-4 pt-10
                                 bg-linear-to-t from-black/80 via-black/40 to-transparent
                               "
                  >
                    {/* Title layer */}
                    <span className="block text-lg md:text-xl font-semibold leading-tight">
                      {item.title}
                    </span>

                    {/* Micro CTA */}
                    <span className="mt-1 flex items-center gap-2 text-sm font-medium opacity-80">
                      <span>{item.buttonText}</span>
                      <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                        →
                      </span>
                    </span>

                    {/* Bottom accent line */}
                    <span className="mt-3 block h-px w-10 bg-white/40" />
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
                      <Link
                        href={img.href}
                        className="
                                 absolute bottom-0 left-0 w-full
                                 text-white
                                 px-5 pb-4 pt-10
                                 bg-linear-to-t from-black/80 via-black/40 to-transparent
                               "
                      >
                        {/* Title layer */}
                        <span className="block text-lg md:text-xl font-semibold leading-tight">
                          {img.title}
                        </span>

                        {/* Micro CTA */}
                        <span className="mt-1 flex items-center gap-2 text-sm font-medium opacity-80">
                          <span>{img.buttonText}</span>
                          <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                            →
                          </span>
                        </span>

                        {/* Bottom accent line */}
                        <span className="mt-3 block h-px w-10 bg-white/40" />
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
