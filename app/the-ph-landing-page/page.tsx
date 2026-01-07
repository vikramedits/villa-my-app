"use client";
import React, { useState } from "react";
import { User, Users, Calendar, Phone } from "lucide-react"; // lucide icons
import { CreditCard, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Autoplay } from "swiper/modules";
import { swiperTabsData } from "../data/swiperTabsData";
import CheckAvailability from "@/components/AvailabilityCalender";

export default function LandingPage() {
  const tabs = ["Luxury", "Bedrooms", "Garden", "Pool"] as const;
  type Tab = (typeof tabs)[number]; // "Luxury" | "Bedrooms" | "Garden" | "Pool"

  const [activeTab, setActiveTab] = useState<Tab>("Luxury");

  const activeData = swiperTabsData[activeTab];
  const data = [
    {
      image: "/homenew/Villa-landing-1.jpeg",
      alt: "Bedrooms-the-ph",
      title: "All Packages",
    },
    {
      image: "/homenew/Villa-landing-pool.jpeg",
      alt: "Pool & Gardens-the-ph",
      title: "Guest Reviews",
    },
  ];
  type FormState = {
    members: string;
    adults: string;
    kids: string;
    checkIn: string;
    checkOut: string;
    contact: string;
  };

  type FieldName = keyof FormState;

  type FormField = {
    label: string;
    name: FieldName;
    type: string;
    placeholder?: string;
    min?: number;
    icon: React.ReactNode;
  };

  const formFields: FormField[] = [
    {
      label: "Total Members",
      name: "members",
      type: "number",
      min: 1,
      placeholder: "1",
      icon: <Users size={16} />,
    },
    {
      label: "Adults",
      name: "adults",
      type: "number",
      min: 1,
      placeholder: "1",
      icon: <User size={16} />,
    },
    {
      label: "Kids",
      name: "kids",
      type: "number",
      min: 0,
      placeholder: "0",
      icon: <User size={16} />,
    },
    {
      label: "Check-In Date",
      name: "checkIn",
      type: "date",
      icon: <Calendar size={16} />,
    },
    {
      label: "Check-Out Date",
      name: "checkOut",
      type: "date",
      icon: <Calendar size={16} />,
    },
    {
      label: "Contact Number",
      name: "contact",
      type: "tel",
      placeholder: "+91-XXXXXXXXXX",
      icon: <Phone size={16} />,
    },
  ];

  const [form, setForm] = useState<FormState>({
    members: "",
    adults: "",
    kids: "",
    checkIn: "",
    checkOut: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Booking submitted!");
  };

  return (
    <div>
      <div className="relative w-full h-screen ">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute  w-full h-full object-cover"
          src="/homenew/video-home.mp4"
        ></video>

        {/* Overlay with subtle dark gradient for readability */}
        <div className="absolute w-full h-full bg-linear-to-b from-black/20 to-black/0 pointer-events-none"></div>

        {/* Content */}
        <div className="lg:flex flex-row md:px-8 pt-4 md:pt-12 pb-12 md:pb-16">
          {/* Left (40%) */}
          <div className="relative z-10 flex flex-col gap-8 lg:w-2/5 w-full h-full">
            <div className="w-full">
              <h2 className="text-center text-white font-bold text-lg md:text-2xl mb-1">
                Explore Our Villa
              </h2>
              <p className="text-center text-white font-normal text-sm md:text-lg mb-5">
                {" "}
                Click on a category to view our luxurious spaces
              </p>
              <div className="flex gap-2 md:gap-4 justify-center mb-6 border-b border-white rounded-b-2xl pb-2 md:pb-4 shadow-md w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium md:font-semibold md:transition-colors md:duration-200 md:cursor-pointer
                             ${
                               activeTab === tab
                                 ? "bg-green-900 text-white"
                                 : "bg-white text-green-900 border border-green-900 hover:bg-green-900 hover:text-white"
                             }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <Swiper
                key={activeTab}
                modules={[EffectCoverflow, Autoplay]}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                loop={true}
                autoplay={{
                  delay: 2500, // har 2.5 sec me slide change
                  disableOnInteraction: false,
                }}
                speed={600} // normal transition speed
                spaceBetween={-30}
                className="py-12"
              >
                {activeData.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center items-center"
                    style={{ width: "250px" }}
                  >
                    <div className="relative w-full h-64 rounded-xl overflow-hidden transform transition-transform duration-500">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={250}
                        height={250}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-green-950 font-semibold rounded-md text-sm md:text-base">
                        {item.title || "Luxury Villa"}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Google map */}
              <div className="mx-4 md:mx-0 h-52 my-12 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.697050650034!2d73.6370628751925!3d24.634124278077746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967fb0076c5d3ab%3A0xf44c8b62236c645!2sThe%20pushpa%20heritage!5e0!3m2!1sen!2sin!4v1767786562328!5m2!1sen!2sin"
                  width="100%" // React me percentage is fine
                  height="100%"
                  style={{ border: 0 }} // Inline style object
                  allowFullScreen={false} // boolean
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right - Booking Form */}
          <div className="md:w-3/5">
            <div className="relative z-20 w-11/12 max-w-5xl mx-auto bg-white rounded-2xl p-6 shadow-xl border-b-8 border-green-950">
              <div className=" items-center gap-4 mb-6 text-green-900 font-semibold text-lg">
                <div className="flex items-center gap-1">
                  <CreditCard size={20} />
                  <span>Pay 20% advance to confirm your luxurious stay</span>
                </div>

                <div className="flex items-center gap-1">
                  <Tag size={20} />
                  <span>₹1500 / per person only</span>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap gap-4 justify-between text-gray-800 items-center"
              >
                {formFields.map((field) => (
                  <div
                    key={field.name}
                    className="flex-1 flex flex-col relative"
                  >
                    <label className="text-sm font-medium mb-1 flex items-center gap-1">
                      {field.icon} {field.label}
                    </label>

                    <input
                      type={field.type}
                      name={field.name}
                      min={field.min}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="p-3 border-b-2 border-green-900 rounded-none focus:outline-none focus:ring-0 focus:border-green-600 font-medium"
                    />
                  </div>
                ))}

                {/* Submit Button */}
                <div className="flex-1 flex items-end mt-6">
                  <button
                    type="submit"
                    className="w-full bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Book Now
                  </button>
                </div>

                <div className=" flex gap-4 items-center bg-green-950 p-6 rounded-lg shadow-md ">
                  {data.map((item, index) => (
                    <Link
                      key={index}
                      href="/"
                      className="group relative overflow-hidden rounded-lg border-b-4 border-white "
                    >
                      <Image
                        width={320}
                        height={220}
                        alt={item.alt}
                        src={item.image}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Bottom Center Title */}
                      <p
                        className="
                                 absolute bottom-3 left-1/2 -translate-x-1/2
                                 px-3 py-2 text-base font-semibold rounded-md
                                 bg-white text-green-950
                                 transition-all duration-300
                                 group-hover:bg-green-900 group-hover:text-white
                                 whitespace-nowrap
                               "
                      >
                        {item.title || "Luxury Villa"}
                      </p>
                    </Link>
                  ))}
                  <CheckAvailability />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
