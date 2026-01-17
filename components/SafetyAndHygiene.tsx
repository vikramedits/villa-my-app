"use client";

import Image from "next/image";

const SAFETY_DATA = [
  {
    title: "Professional Cleaning",
    description:
      "Villa is thoroughly cleaned and sanitized after every checkout.",
    icon: "/icons/safety/cleaning.svg",
  },
  {
    title: "Sanitized Rooms",
    description: "All rooms, bathrooms and kitchens are disinfected regularly.",
    icon: "/icons/safety/sanitized.svg",
  },
  {
    title: "Secure Property",
    description: "Gated and private property to ensure complete guest safety.",
    icon: "/icons/safety/security.svg",
  },
  {
    title: "24×7 Caretaker",
    description: "On-site caretaker available for assistance anytime.",
    icon: "/icons/safety/support.svg",
  },
  {
    title: "Power Backup",
    description: "Inverter / generator available during power cuts.",
    icon: "/icons/safety/power.svg",
  },
  {
    title: "First Aid & Fire Safety",
    description: "First aid kit and fire extinguisher available on property.",
    icon: "/icons/safety/first-aid.svg",
  },
];

export default function SafetyAndHygiene() {
  return (
    <section className="bg-blue-50">
      <div className="container-fluid ">
        <div className="py-3 md:pt-6 pb-12">
          {/* ================= Heading ================= */}
          <div className="mb-10 md:mb-14">
            <h2 className="text-lg md:text-2xl font-medium tracking-wide text-primaryBlue">
              Safety & Hygiene
            </h2>
            <p className="text-xs md:text-base mt-1 tracking-wider">
              Your comfort, safety and cleanliness are our top priority
            </p>
          </div>

          {/* ================= Cards ================= */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {SAFETY_DATA.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border bg-white p-5 md:p-6 transition hover:shadow-lg"
              >
                {/* -------- Icon -------- */}
                <div className="relative h-10 w-10 md:h-12 md:w-12 mb-4">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* -------- Content -------- */}
                <h4 className="text-sm md:text-base font-semibold text-gray-900">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
