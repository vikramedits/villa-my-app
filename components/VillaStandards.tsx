import Image from "next/image";
import FeaturesCarousel from "./FeaturesCarousel";
import Link from "next/link";

type SingleImage = {
  type: "single";
  src: string;
  alt: string;
  title: string;
  buttonText: string;
};

type StackImageItem = {
  src: string;
  alt: string;
  title: string;
  buttonText: string;
};

type StackImage = {
  type: "stack";
  images: StackImageItem[];
  height: string;
};

type VillaImage = SingleImage | StackImage;


const features = [
  { icon: "", title: "Personalised Celebrations" },
  { icon: "", title: "Caretaker Onsite" },
  { icon: "", title: "In-house Chef" },
  { icon: "", title: "Local Experiences" },
  { icon: "", title: "Private Pool" },
  { icon: "", title: "Butler Service" },
  { icon: "", title: "Games & Recreation" },
  { icon: "", title: "Private Pool" },
  { icon: "", title: "Butler Service" },
  { icon: "", title: "Games & Recreation" },
];

const villaImages: VillaImage[] = [
  {
    type: "single", // left
    src: "/homenew/standard/standard-1.jpeg",
    title: "Images & Videos",
    buttonText: "View all",
    alt: "Villa Pool",
  },
  {
    type: "stack", // middle 2 images
    images: [
      {
        src: "/homenew/standard/standard-2.jpeg",
        title: "Guests Reviews",
        buttonText: "View all",
        alt: "Dining",
      },
      {
        src: "/homenew/standard/standard-5.jpeg",
        title: "Rooms",
        buttonText: "View all",
        alt: "Bedroom",
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
  },
];

export default function VillaExperienceStandard() {
  return (
    <section className="bg-gray-100 pb-5 md:pb-10">
      <div className="container-fluid pt-5 md:pt-10">
        {/* Heading */}
        <div className="py-3 md:py-6 ">
          <h2 className="text-lg md:text-2xl font-medium tracking-wide text-primaryBlue">
            The Villa Standard
          </h2>
          <p className="text-xs md:text-base mt-1 tracking-wider">
            Signature experiences crafted to make every stay effortless &
            memorable
          </p>
        </div>
        <FeaturesCarousel features={features} />
        <div className="mt-3 md:mt-6 flex md:grid md:grid-cols-3 gap-2 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory">
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
                    href="/villa/gallery"
                    className="absolute bottom-0 left-0 w-full bg-black/50 text-white flex flex-col items-center justify-center py-3 px-4"
                  >
                    <span className="text-lg font-semibold">{item.title}</span>
                    <span className="mt-2 bg-white text-black font-medium px-4 py-1 rounded cursor-pointer inline-block transform transition-transform duration-300 hover:scale-110">
                      {item.buttonText} <span className="ml-1">→</span>
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
                      <Link
                        href="/villa/gallery"
                        className="absolute bottom-0 left-0 w-full bg-black/50 text-white flex flex-col items-center justify-center py-3 px-4"
                      >
                        <span className="text-lg font-semibold">
                          {img.title}
                        </span>
                        <span className="mt-2 bg-white text-black font-medium px-4 py-1 rounded cursor-pointer inline-block transform transition-transform duration-300 hover:scale-110">
                          {img.buttonText} <span className="ml-1">→</span>
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
